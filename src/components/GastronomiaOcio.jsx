import React, { useState } from 'react';
import { Utensils, Award, MapPin, Sparkles, Wine, Coffee, Compass, ExternalLink } from 'lucide-react';
import { GASTRONOMY_EXPERIENCES, getFallbackImage } from '../data/valdemoroData';

export default function GastronomiaOcio() {
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const filterOptions = [
    { id: 'todos', label: 'Todas las experiencias' },
    { id: 'alta-cocina', label: 'Estrella Michelin' },
    { id: 'tapas', label: 'Rutas de Tapas' },
    { id: 'dulces', label: 'Repostería Típica' },
    { id: 'vinos', label: 'Vinos D.O. y Aceite' }
  ];

  const filteredItems = GASTRONOMY_EXPERIENCES.filter(item => {
    if (selectedFilter === 'todos') return true;
    return item.type === selectedFilter;
  });

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--badge-bg)] text-[var(--accent-main)] text-xs font-bold uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Identidad Culinaria Castellana</span>
          </div>
          <h2 className="font-editorial font-extrabold text-4xl sm:text-6xl text-[var(--text-main)] uppercase tracking-tight leading-none mb-4">
            Gastronomía y Enoturismo
          </h2>
          <p className="font-body text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Desde la alta cocina con estrella Michelin en Restaurante Chirón hasta el tapeo tradicional bajo los soportales castellanos, la repostería artesana de tejas de almendra y los vinos de la D.O. Madrid.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none" role="tablist">
          {filterOptions.map((opt) => {
            const isSelected = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                role="tab"
                aria-selected={isSelected}
                className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                  isSelected
                    ? 'bg-[var(--accent-main)] text-white shadow-sm'
                    : 'bg-[var(--surface-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Highlighted Banner: Restaurante Chirón (Estrella Michelin) */}
        {(selectedFilter === 'todos' || selectedFilter === 'alta-cocina') && (
          <div className="mb-14 bg-gradient-to-br from-[#14141C] to-[#0A0A0E] text-white rounded-sm overflow-hidden border border-[var(--accent-gold)]/40 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
                <img
                  src="/images/valdemoro/chiron.jpg"
                  alt="Restaurante Chirón en Valdemoro"
                  className="w-full h-full object-cover"
                  width="800"
                  height="600"
                  loading="lazy"
                  onError={(e) => { 
                    e.currentTarget.src = getFallbackImage('Restaurante Chiron'); 
                    e.currentTarget.onerror = null; 
                  }}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <span className="px-3 py-1 rounded-xs bg-[var(--accent-gold)] text-black text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Award className="w-3.5 h-3.5" /> 1 Estrella Michelin
                  </span>
                  <span className="px-3 py-0.5 rounded-xs bg-black/80 text-white text-[10px] font-bold uppercase">
                    2 Soles Repsol
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold block mb-2">
                    Referente Culinario Internacional en Valdemoro
                  </span>
                  <h3 className="font-editorial font-extrabold text-3xl sm:text-5xl uppercase leading-none mb-2 text-white">
                    Restaurante Chirón
                  </h3>
                  <p className="text-xs text-neutral-400 font-semibold mb-4">
                    Chef Iván Muñoz y sumiller Raúl Muñoz • Calle Alarcón, 27
                  </p>
                  <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed mb-6">
                    Punta de lanza de la gastronomía madrileña. Una cocina con raíces ribereñas entre los ríos Jarama y Tajuña que rinde tributo a las recetas castellanas históricas con una depuración vanguardista sublime.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="p-3 bg-white/5 rounded-xs border border-white/10">
                      <span className="text-[11px] text-[var(--accent-gold)] font-bold block">Menú Degustación</span>
                      <span className="text-xs text-neutral-300">Sabores de la vega del Jarama</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xs border border-white/10">
                      <span className="text-[11px] text-[var(--accent-gold)] font-bold block">Bodega de Autor</span>
                      <span className="text-xs text-neutral-300">Selección Vinos de Madrid</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xs border border-white/10">
                      <span className="text-[11px] text-[var(--accent-gold)] font-bold block">Aceite Propio</span>
                      <span className="text-xs text-neutral-300">Almazara familiar comarcal</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-neutral-400">
                    Reserva previa imprescindible • Horarios y menús en su web oficial
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Restaurante+Chiron+Valdemoro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-sm bg-[var(--accent-gold)] hover:bg-[#E5A53F] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[44px]"
                  >
                    <span>Ver ubicación en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gastronomic Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems
            .filter(item => item.id !== 'chiron' || selectedFilter === 'alta-cocina')
            .map((item) => (
              <article
                key={item.id}
                className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[var(--accent-main)] transition-all duration-300 shadow-sm"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-subtle)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width="600"
                    height="338"
                    loading="lazy"
                    onError={(e) => { 
                      e.currentTarget.src = getFallbackImage(item.title); 
                      e.currentTarget.onerror = null; 
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xs bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.zone}
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-[var(--accent-gold)] text-black text-[10px] font-bold">
                      {item.priceRange}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-[var(--text-main)] uppercase leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--accent-gold)] uppercase tracking-wider mb-3">
                      {item.subtitle}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="bg-[var(--surface-subtle)] p-3.5 rounded-xs border border-[var(--border-main)] mb-4">
                      <span className="text-[11px] font-bold text-[var(--text-main)] block mb-1.5 uppercase tracking-wider">
                        Especialidades destacadas:
                      </span>
                      <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                        {item.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-main)] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5 truncate max-w-[240px]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-main)] shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery || (item.title + ', Valdemoro, Madrid'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-main)] hover:underline font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 p-1 min-h-[44px]"
                    >
                      <span>Mapa</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </article>
            ))}
        </div>

      </div>
    </div>
  );
}
