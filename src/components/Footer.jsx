import React from 'react';
import { Compass, MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/valdemoroData';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[var(--surface-main)] border-t border-[var(--border-main)] pt-16 pb-12 text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[var(--border-main)]">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-[var(--accent-main)] flex items-center justify-center text-white font-editorial font-extrabold text-lg">
                V
              </div>
              <span className="font-editorial font-extrabold text-2xl text-[var(--text-main)] tracking-tight">
                VALDEMORO
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed mb-4">
              Portal editorial de promoción turística y cultural de la Villa de Valdemoro (Madrid). Patrimonio barroco, arte goyesco y espacios naturales protegidos.
            </p>
            <span className="text-[11px] font-bold text-[var(--accent-gold)] uppercase tracking-wider block">
              Comunidad de Madrid • España
            </span>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-editorial font-bold text-lg text-[var(--text-main)] uppercase tracking-wider mb-4">
              Exploración del Destino
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-[var(--accent-main)] transition-colors py-1"
                >
                  Portada e Imprescindibles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('patrimonio')}
                  className="hover:text-[var(--accent-main)] transition-colors py-1"
                >
                  Catálogo de Patrimonio y Cultura
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mapa-radar')}
                  className="hover:text-[var(--accent-main)] transition-colors py-1"
                >
                  Mapa Radar GTA VI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gastronomia')}
                  className="hover:text-[var(--accent-main)] transition-colors py-1"
                >
                  Gastronomía y Enoturismo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planificador')}
                  className="hover:text-[var(--accent-main)] transition-colors py-1"
                >
                  Planificador de Rutas
                </button>
              </li>
            </ul>
          </div>

          {/* Official Tourism Contact */}
          <div>
            <h4 className="font-editorial font-bold text-lg text-[var(--text-main)] uppercase tracking-wider mb-4">
              Oficina de Turismo
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[var(--text-main)] font-medium">
                {PRACTICAL_INFO.tourismOffice.address}
              </p>
              <p>
                Teléfono: <a href="tel:918018245" className="hover:underline font-bold text-[var(--text-main)]">91 801 82 45</a>
              </p>
              <p>
                Email: <a href="mailto:bzturismo@valdemoro.es" className="hover:underline text-[var(--accent-main)]">bzturismo@valdemoro.es</a>
              </p>
              <p className="text-[11px] text-[var(--accent-gold)] font-medium pt-1">
                {PRACTICAL_INFO.tourismOffice.hours}
              </p>
            </div>
          </div>

          {/* Fuentes Oficiales */}
          <div>
            <h4 className="font-editorial font-bold text-lg text-[var(--text-main)] uppercase tracking-wider mb-4">
              Fuentes Oficiales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.valdemoro.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 py-1"
                >
                  <span>Ayuntamiento de Valdemoro</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-main)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://turismomadrid.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 py-1"
                >
                  <span>Turismo Comunidad de Madrid</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-main)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://fundaciongoyaenaragon.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 py-1"
                >
                  <span>Fundación Goya en Aragón</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-main)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crtm.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 py-1"
                >
                  <span>Consorcio de Transportes (CRTM)</span>
                  <ExternalLink className="w-3 h-3 text-[var(--accent-main)]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} Descubre Valdemoro. Portal oficial de información y difusión turística.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Destino Turístico Seguro y Accesible</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
