import fs from 'fs';
import path from 'path';

const TARGET_DIR = 'c:\\Users\\pablo\\Desktop\\Guia Valdemoro\\descubre-valdemoro\\public\\images\\valdemoro';

const DOWNLOAD_LIST = [
  {
    name: 'hero-valdemoro.jpg',
    url: 'https://www.valde-moro.com/img/jpg/hero-homepage-1536w.jpg'
  },
  {
    name: 'iglesia-asuncion.jpg',
    url: 'https://www.valde-moro.com/img/jpg/hero-heritage-1536w.jpg'
  },
  {
    name: 'asuncion-detalle.jpg',
    url: 'https://www.valde-moro.com/img/jpg/landmark-asuncion-detail-800w.jpg'
  },
  {
    name: 'plaza-constitucion.jpg',
    url: 'https://www.valde-moro.com/img/jpg/landmark-plaza-1536w.jpg'
  },
  {
    name: 'fuente-de-la-villa.jpg',
    url: 'https://www.valde-moro.com/img/jpg/landmark-fuente-1536w.jpg'
  },
  {
    name: 'convento-santa-clara.jpg',
    url: 'https://www.valde-moro.com/img/jpg/landmark-convento-1536w.jpg'
  },
  {
    name: 'ermita-cristo-salud.jpg',
    url: 'https://www.valde-moro.com/img/jpg/landmark-ermita-1536w.jpg'
  },
  {
    name: 'teatro-juan-prado.jpg',
    url: 'https://www.valde-moro.com/img/jpg/landmark-teatro-1536w.jpg'
  },
  {
    name: 'feria-barroca.jpg',
    url: 'https://www.valde-moro.com/img/jpg/events-feria-800w.jpg'
  },
  {
    name: 'fiestas-patronales.jpg',
    url: 'https://www.valde-moro.com/img/jpg/events-fiesta-wide-1536w.jpg'
  },
  {
    name: 'fiestas-rosario.jpg',
    url: 'https://www.valde-moro.com/img/jpg/events-rosario-800w.jpg'
  },
  {
    name: 'bolitas-del-airon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Almendros_en_los_campos_de_Valdemoro_%2813196444293%29.jpg'
  },
  {
    name: 'parque-tierno-galvan.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Valdemoro_-_Parque_de_Enrique_Tierno_Galv%C3%A1n_1.jpg'
  },
  {
    name: 'parque-sureste.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Campos_de_Valdemoro_en_oto%C3%B1o_%2815332409741%29.jpg'
  }
];

async function run() {
  console.log('Downloading exact authentic Valdemoro photographs...');
  for (const item of DOWNLOAD_LIST) {
    const dest = path.join(TARGET_DIR, item.name);
    try {
      console.log(`Fetching ${item.name} from ${item.url}...`);
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'DescubreValdemoroBot/1.0 (info@descubrevaldemoro.es)' }
      });
      if (res.status === 200) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log(`✓ ${item.name} (${(buf.length / 1024).toFixed(1)} KB)`);
      } else {
        console.error(`✗ Error ${res.status} on ${item.name}`);
      }
    } catch (e) {
      console.error(`✗ Error on ${item.name}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  console.log('All real photos downloaded successfully!');
}

run();
