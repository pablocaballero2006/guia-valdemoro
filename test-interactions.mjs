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
    } catch (e) {}
    await wait(300);
  }
  throw new Error('Chrome endpoint unavailable');
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

async function runInteractionTests() {
  const profileDir = path.join(os.tmpdir(), `chrome_test_${Date.now()}`);

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
    const client = new CDPClient(wsUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await wait(1500);

    console.log('Testing interactive features and new tourist capabilities...');

    // 1. Test clicking "Añadir a mi ruta" on home
    const routeTest = await client.send('Runtime.evaluate', {
      expression: `(async () => {
        const addBtn = document.querySelector('button[aria-label*="Añadir"]');
        if (!addBtn) return { success: false, reason: 'Add button not found' };
        addBtn.click();
        await new Promise(r => setTimeout(r, 200));
        const saved = JSON.parse(localStorage.getItem('valdemoro_route') || '[]');
        return { success: saved.length > 0, count: saved.length, firstItem: saved[0]?.title };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('1. Add to custom route:', routeTest.result.value);

    // 2. Test opening modal and closing with Escape
    const modalTest = await client.send('Runtime.evaluate', {
      expression: `(async () => {
        const detailBtn = document.querySelector('button:has(svg.lucide-arrow-up-right)');
        if (!detailBtn) return { success: false, reason: 'Detail button not found' };
        detailBtn.click();
        await new Promise(r => setTimeout(r, 300));
        const modalBefore = document.querySelector('[role="dialog"]');
        const modalFound = !!modalBefore;
        
        // Dispatch Escape key
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await new Promise(r => setTimeout(r, 300));
        const modalAfter = document.querySelector('[role="dialog"]');

        return {
          opened: modalFound,
          closedOnEscape: !modalAfter,
          success: modalFound && !modalAfter
        };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('2. Detail Modal open & Escape close:', modalTest.result.value);

    // 3. Test Rutas Recomendadas (New Feature: Intelligent Itinerary Generator)
    const presetTest = await client.send('Runtime.evaluate', {
      expression: `(async () => {
        const presetBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('cargar esta ruta'));
        if (!presetBtn) return { success: false, reason: 'Preset button not found' };
        presetBtn.click();
        await new Promise(r => setTimeout(r, 400));

        const saved = JSON.parse(localStorage.getItem('valdemoro_route') || '[]');
        const inPlanner = !!document.querySelector('h2')?.innerText.toLowerCase().includes('planifica tu visita');

        return {
          success: saved.length >= 3 && inPlanner,
          loadedCount: saved.length,
          navigatedToPlanner: inPlanner
        };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('3. Intelligent Itinerary Generator (New Feature):', presetTest.result.value);

    // 4. Test Google Maps GPS navigation button in Planner (New Feature)
    const gmapsTest = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const gmapsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('google maps'));
        return {
          buttonExists: !!gmapsBtn,
          success: !!gmapsBtn
        };
      })()`,
      returnByValue: true
    });
    console.log('4. Google Maps Turn-by-Turn GPS Navigation Tool:', gmapsTest.result.value);

    // 5. Test Catalog with Duration and Free entry filters
    const catalogTest = await client.send('Runtime.evaluate', {
      expression: `(async () => {
        const navBtn = Array.from(document.querySelectorAll('nav button')).find(b => b.innerText.includes('Patrimonio'));
        navBtn.click();
        await new Promise(r => setTimeout(r, 300));

        // Click "Rápida (≤ 30 min)"
        const quickBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Rápida'));
        if (quickBtn) quickBtn.click();
        await new Promise(r => setTimeout(r, 200));

        const cardsAfterQuick = document.querySelectorAll('article').length;

        // Click "Entrada Gratuita"
        const freeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Entrada Gratuita'));
        if (freeBtn) freeBtn.click();
        await new Promise(r => setTimeout(r, 200));

        const cardsAfterFree = document.querySelectorAll('article').length;

        return {
          success: cardsAfterQuick > 0 && cardsAfterFree > 0,
          cardsAfterQuick,
          cardsAfterFree
        };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('5. Catalog Advanced Filters (Duration & Free entry):', catalogTest.result.value);

    client.close();
  } catch (err) {
    console.error('Interaction test error:', err);
  } finally {
    chromeProc.kill();
  }
}

runInteractionTests();
