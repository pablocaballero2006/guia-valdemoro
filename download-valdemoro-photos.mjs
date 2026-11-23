import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = path.join(__dirname, 'public', 'images', 'valdemoro');

// Asegurar que el directorio existe
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const LANDMARKS = [
  {
    searchTerm: 'Iglesia de Nuestra Señora de la Asunción (Valdemoro)',
    fileName: 'iglesia-asuncion.jpg'
  },
  {
    searchTerm: 'Plaza de la Constitución (Valdemoro)',
    fileName: 'plaza-constitucion.jpg'
  },
  {
    searchTerm: 'Torre del Reloj (Valdemoro)',
    fileName: 'torre-reloj.jpg'
  },
  {
    searchTerm: 'Fuente de la Villa (Valdemoro)',
    fileName: 'fuente-de-la-villa.jpg'
  },
  {
    searchTerm: 'Convento de Santa Clara (Valdemoro)',
    fileName: 'convento-santa-clara.jpg'
  },
  {
    searchTerm: 'Ermita del Cristo de la Salud (Valdemoro)',
    fileName: 'ermita-cristo-salud.jpg'
  },
  {
    searchTerm: 'Bolitas del Airón',
    fileName: 'bolitas-del-airon.jpg'
  },
  {
    searchTerm: 'Teatro Municipal Juan Prado',
    fileName: 'teatro-juan-prado.jpg'
  }
];

const USER_AGENT = 'DescubreValdemoroBot/2.0 (https://github.com/pablocaballero2006/guia-valdemoro; info@descubrevaldemoro.es) Education Project';

async function getImageUrl(searchTerm) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&iiprop=url&origin=*`;

  try {
    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': USER_AGENT }
    });
    const data = await response.json();
    
    if (data.query && data.query.pages) {
      const pageId = Object.keys(data.query.pages)[0];
      const page = data.query.pages[pageId];
      if (page.imageinfo && page.imageinfo[0]) {
        return page.imageinfo[0].url;
      }
    }
  } catch (error) {
    console.error(`Error buscando "${searchTerm}":`, error.message);
  }
  return null;
}

async function downloadImage(url, fileName) {
  if (!url) return false;
  
  const filePath = path.join(TARGET_DIR, fileName);
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT }
    });
    
    if (response.ok) {
      const arrayBuffer = await response.ok ? await response.arrayBuffer() : null;
      if (arrayBuffer) {
        fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
        console.log(`✓ Descargado: ${fileName}`);
        return true;
      }
    }
  } catch (error) {
    console.error(`Error descargando ${fileName}:`, error.message);
  }
  return false;
}

async function main() {
  console.log('Iniciando descarga de fotografías reales de Valdemoro desde Wikimedia Commons...');
  
  for (const landmark of LANDMARKS) {
    console.log(`Buscando imagen para: ${landmark.searchTerm}...`);
    const url = await getImageUrl(landmark.searchTerm);
    if (url) {
      await downloadImage(url, landmark.fileName);
    } else {
      console.warn(`✗ No se encontró imagen para: ${landmark.searchTerm}`);
    }
    // Retraso para ser respetuoso con la API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Proceso de descarga finalizado.');
}

main();
