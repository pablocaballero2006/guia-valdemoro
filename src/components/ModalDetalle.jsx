import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  BookOpen,
  Info,
  Layers
} from 'lucide-react';
import { getFallbackImage } from '../data/valdemoroData';

export default function ModalDetalle({ place, onClose, onToggleRoute, isPlaceInRoute }) {
  const [activeTab, setActiveTab] = useState('historia'); // 'historia' | 'curiosidad'

  // Close modal when Escape key is pressed (R-32)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!place) return null;

  const inRoute = isPlaceInRoute(place.id);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.coords || place.mapsQuery || (place.title + ', Valdemoro, Madrid'))}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click to dismiss */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[var(--surface-main)] border border-[var(--border-main)] rounded-sm shadow-2xl flex flex-col my-auto">
        
        {/* Header Image with Badges */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-black">
          <img 
            src={place.image} 
            alt={place.title}
            className="w-full h-full object-cover"
            width="1000"
            height="562"
            onError={(e) => { 
              e.currentTarget.src = getFallbackImage(place.title); 
              e.currentTarget.onerror = null; 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-main)] via-transparent to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-[var(--accent-main)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Cerrar ficha de detalle"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xs bg-[var(--accent-main)] text-white text-xs font-bold uppercase tracking-wider">
              {place.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-xs bg-black/80 text-[var(--accent-gold)] text-xs font-bold uppercase">
              {place.rating}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                Duración: {place.duration}
              </span>
              <span>•</span>
              <span>{place.entry}</span>
              {place.accessible && (
                <>
                  <span>•</span>
                  <span className="text-emerald-500 font-bold">Accesible</span>
                </>
              )}
            </div>

            <h2 
              id="modal-title"
              className="font-editorial font-extrabold text-3xl sm:text-5xl text-[var(--text-main)] uppercase leading-tight mb-3"
            >
              {place.title}
            </h2>

            <p className="font-body text-base text-[var(--accent-gold)] font-medium mb-4">
              {place.shortSubtitle}
            </p>

            <p className="font-body text-sm sm:text-base text-[var(--text-main)] leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Tab Selector: Historia vs Curiosidad Local */}
          <div className="flex rounded-xs bg-[var(--surface-subtle)] p-1 border border-[var(--border-main)] gap-1">
            <button
              onClick={() => setActiveTab('historia')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 min-h-[44px] ${
                activeTab === 'historia'
                  ? 'bg-[var(--accent-main)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Historia Documentada</span>
            </button>

            <button
              onClick={() => setActiveTab('curiosidad')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 min-h-[44px] ${
                activeTab === 'curiosidad'
                  ? 'bg-[var(--accent-gold)] text-black shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Curiosidad Local</span>
            </button>
          </div>

          {/* Tab 1: Historia Documentada */}
          {activeTab === 'historia' && (
            <div className="bg-[var(--surface-subtle)] border border-[var(--border-main)] rounded-sm p-5 animate-fade-in">
              <h3 className="font-editorial font-bold text-lg text-[var(--text-main)] uppercase tracking-wide mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-main)]" />
                <span>Hitos históricos y artísticos contrastados</span>
              </h3>
              {place.historyDetails && place.historyDetails.length > 0 ? (
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed list-disc list-inside">
                  {place.historyDetails.map((detail, idx) => (
                    <li key={idx} className="pl-1">
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
                  Punto de interés de Valdemoro catalogado en el inventario municipal de patrimonio y espacios públicos.
                </p>
              )}
              {place.officialSource && (
                <div className="mt-4 pt-3 border-t border-[var(--border-strong)] text-[11px] text-[var(--text-subtle)] flex items-center gap-1.5 font-medium">
                  <span>Fuente documental oficial:</span>
                  <strong className="text-[var(--text-main)]">{place.officialSource}</strong>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Curiosidad Local */}
          {activeTab === 'curiosidad' && (
            <div className="bg-[var(--surface-subtle)] border-l-4 border-l-[var(--accent-gold)] border border-[var(--border-main)] rounded-sm p-5 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>¿Sabías esto de Valdemoro?</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-main)] font-body leading-relaxed">
                {place.curiosidadLocal || 'Enclave con arraigo en la identidad y tradición valdemoreña, visitado tanto por vecinos como por viajeros de la Comunidad de Madrid.'}
              </p>
            </div>
          )}

          {/* Featured Artwork (Goya en Valdemoro) */}
          {place.artworkImage && (
            <div className="border border-[var(--accent-gold)]/40 rounded-sm p-4 bg-black/40 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <img
                src={place.artworkImage}
                alt="Lienzo original de Francisco de Goya en Valdemoro"
                className="w-full sm:w-36 h-52 sm:h-48 object-cover rounded-xs border border-[var(--accent-gold)]/50 shrink-0"
                width="144"
                height="192"
                onError={(e) => { 
                  e.currentTarget.src = getFallbackImage('Lienzo de Goya'); 
                  e.currentTarget.onerror = null; 
                }}
              />
              <div className="text-xs">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--accent-gold)] block mb-1">
                  Obra Original en el Templo
                </span>
                <h4 className="font-editorial font-bold text-xl uppercase text-white mb-1">
                  Aparición de la Virgen a San Julián
                </h4>
                <p className="text-neutral-300 mb-2 leading-relaxed">
                  Óleo sobre lienzo pintado por Francisco de Goya (1786-1787) para el retablo mayor de la Asunción de Valdemoro. Encargado y financiado por el conde de Lerena.
                </p>
                <span className="text-[10px] text-neutral-400 block">
                  Ubicación: Retablo mayor (calle lateral derecha). Fotografía de dominio público.
                </span>
              </div>
            </div>
          )}

          {/* Secondary Landmark Photo */}
          {place.secondaryImage && (
            <div className="border border-[var(--border-main)] rounded-sm p-4 bg-[var(--surface-subtle)] flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <img
                src={place.secondaryImage}
                alt={place.secondaryImageTitle || place.title}
                className="w-full sm:w-36 h-48 sm:h-40 object-cover rounded-xs border border-[var(--border-main)] shrink-0"
                width="144"
                height="160"
                onError={(e) => { 
                  e.currentTarget.src = getFallbackImage(place.secondaryImageTitle || place.title); 
                  e.currentTarget.onerror = null; 
                }}
              />
              <div className="text-xs">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--accent-main)] block mb-1">
                  Enclave Destacado del Conjunto
                </span>
                <h4 className="font-editorial font-bold text-xl uppercase text-[var(--text-main)] mb-1">
                  {place.secondaryImageTitle}
                </h4>
                <p className="text-[var(--text-muted)] mb-2 leading-relaxed">
                  {place.secondaryImageDesc}
                </p>
              </div>
            </div>
          )}

          {/* Practical Tags */}
          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 text-xs rounded-xs bg-[var(--badge-bg)] text-[var(--text-main)] font-semibold border border-[var(--border-main)]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Address and Location */}
          <div className="flex items-start gap-3 p-4 bg-[var(--surface-subtle)] rounded-sm border border-[var(--border-main)]">
            <MapPin className="w-5 h-5 text-[var(--accent-main)] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-[var(--text-main)] block mb-0.5">Ubicación exacta:</span>
              <span className="text-[var(--text-muted)]">{place.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-[var(--border-main)]">
            
            {/* Toggle Add to Route */}
            <button
              onClick={() => onToggleRoute(place)}
              className={`flex-1 px-5 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                inRoute
                  ? 'bg-[var(--accent-gold)] text-black hover:opacity-90'
                  : 'bg-[var(--accent-main)] text-white hover:bg-[var(--accent-hover)]'
              }`}
            >
              {inRoute ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Guardado en mi ruta (Pulsar para retirar)</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Añadir a mi ruta personalizada</span>
                </>
              )}
            </button>

            {/* Google Maps link */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface-main)] hover:bg-[var(--surface-subtle)] text-[var(--text-main)] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Cómo llegar en Google Maps</span>
              <ExternalLink className="w-4 h-4 text-[var(--accent-main)]" />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}
