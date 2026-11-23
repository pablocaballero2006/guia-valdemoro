import { spawn } from 'child_process';
import path from 'path';
import os from 'os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:4173/';
const PORT = 9222;

async function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      if (list && list.length > 0 && list[0].webSocketDebuggerUrl) {
        return list[0].webSocketDebuggerUrl;
      }
    } catch (e) {
      // waiting for Chrome
    }
    await wait(300);
  }
  throw new Error('Could not connect to Chrome debugging endpoint');
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { res, rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(msg.error);
          else res(msg.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((res, rej) => {
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runAudit() {
  const profileDir = path.join(os.tmpdir(), `chrome_audit_${Date.now()}`);

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    URL
  ]);

  try {
    const wsUrl = await getDebuggerUrl();
    console.log('Connected to Chrome DevTools Protocol at:', wsUrl);

    const client = new CDPClient(wsUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Runtime.enable');

    // Wait for initial network and page load
    await wait(2000);

    const viewports = [
      { name: 'Mobile (390px)', width: 390, height: 844, mobile: true },
      { name: 'Tablet (768px)', width: 768, height: 1024, mobile: false },
      { name: 'Desktop (1440px)', width: 1440, height: 900, mobile: false }
    ];

    const results = [];

    for (const vp of viewports) {
      console.log(`\n========================================`);
      console.log(`Testing Viewport: ${vp.name}`);
      console.log(`========================================`);
      
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      await wait(600);

      // Check horizontal overflow
      const overflowEval = await client.send('Runtime.evaluate', {
        expression: `({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          bodyScrollWidth: document.body.scrollWidth
        })`,
        returnByValue: true
      });

      const overflow = overflowEval.result.value;
      console.log(`- Horizontal Scroll Check: ScrollWidth=${overflow.scrollWidth}px, InnerWidth=${overflow.innerWidth}px -> ${overflow.hasOverflow ? 'FAIL (Horizontal overflow detected!)' : 'PASS (Zero horizontal overflow)'}`);

      // Theme toggle test (Dark -> Light -> Dark)
      const themeTest = await client.send('Runtime.evaluate', {
        expression: `(async () => {
          const isDarkInitial = document.documentElement.classList.contains('dark');
          const toggleBtn = document.querySelector('button[title*="Modo"], button[aria-label*="modo"]');
          if (!toggleBtn) return { success: false, reason: 'Toggle button not found' };
          
          toggleBtn.click();
          await new Promise(r => setTimeout(r, 200));
          const isDarkSwitched = document.documentElement.classList.contains('dark');
          
          toggleBtn.click();
          await new Promise(r => setTimeout(r, 200));
          const isDarkRestored = document.documentElement.classList.contains('dark');

          return {
            success: (isDarkInitial !== isDarkSwitched) && (isDarkRestored === isDarkInitial),
            initial: isDarkInitial ? 'dark' : 'light',
            switched: isDarkSwitched ? 'dark' : 'light',
            restored: isDarkRestored ? 'dark' : 'light'
          };
        })()`,
        awaitPromise: true,
        returnByValue: true
      });

      console.log(`- Dual Theme Toggle Test:`, themeTest.result.value);

      // Contrast check on headings and body
      const contrastCheck = await client.send('Runtime.evaluate', {
        expression: `(() => {
          const h1 = document.querySelector('h1');
          const bodyBg = getComputedStyle(document.body).backgroundColor;
          const bodyColor = getComputedStyle(document.body).color;
          return {
            h1Found: !!h1,
            bodyBg,
            bodyColor,
            isDark: document.documentElement.classList.contains('dark')
          };
        })()`,
        returnByValue: true
      });

      console.log(`- Typography & Surface Contrast:`, contrastCheck.result.value);

      // Navigation test
      const navTest = await client.send('Runtime.evaluate', {
        expression: `(() => {
          const buttons = Array.from(document.querySelectorAll('nav button, header button'));
          return buttons.map(b => b.innerText.trim()).filter(Boolean);
        })()`,
        returnByValue: true
      });

      console.log(`- Navigation Links:`, navTest.result.value);

      results.push({
        viewport: vp.name,
        overflow: overflow.hasOverflow ? 'FAIL' : 'PASS',
        scrollWidth: overflow.scrollWidth,
        innerWidth: overflow.innerWidth,
        themeToggle: themeTest.result.value.success ? 'PASS' : 'FAIL',
        themeInitial: themeTest.result.value.initial
      });
    }

    console.log('\n========================================');
    console.log('AUDIT SUMMARY REPORT');
    console.log('========================================');
    console.table(results);

    client.close();
  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    chromeProc.kill();
  }
}

runAudit();
