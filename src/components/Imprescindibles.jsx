import React from 'react';
import { ArrowUpRight, Clock, Plus, Check, Award, MapPin } from 'lucide-react';
import { PLACES } from '../data/valdemoroData';

export default function Imprescindibles({ onSelectPlace, onToggleRoute, isPlaceInRoute }) {
  // Curated key places for the editorial home magazine layout
  const heroPlace = PLACES.find(p => p.id === 'iglesia-asuncion');
  const secondaryPlaces = PLACES.filter(p => ['plaza-constitucion', 'convento-santa-clara', 'bolitas-del-airon'].includes(p.id));

  return (
    <section className="py-16 sm:py-24 bg-[var(--surface-main)] border-y border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--border-main)] pb-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--accent-main)] block mb-2">
              Selección Editorial
            </span>
            <h2 className="font-editorial font-extrabold text-4xl sm:text-5xl text-[var(--text-main)] uppercase tracking-tight">
              Los Cuatro Imprescindibles
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[var(--text-muted)] max-w-md mt-4 md:mt-0">
            Hitos patrimoniales y naturales que justifican una escapada cultural inolvidable al sur de la Comunidad de Madrid.
          </p>
        </div>

        {/* Asymmetric Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Large Feature: Iglesia de la Asunción */}
          {heroPlace && (
            <article className="lg:col-span-7 bg-[var(--surface-card)] border border-[var(--border-main)] rounded-sm overflow-hidden shadow-sm hover:border-[var(--accent-main)] transition-all duration-300 group flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={heroPlace.image} 
                  alt={heroPlace.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="1200"
                  height="750"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://placehold.co/1200x750?text=Valdemoro+Patrimonio'; e.target.onerror = null; }}
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-xs bg-[var(--accent-main)] text-white text-xs font-bold uppercase tracking-wider">
                    Joya Goyesca
                  </span>
                  <span className="px-3 py-1 rounded-xs bg-black/75 backdrop-blur-sm text-[var(--accent-gold)] text-xs font-bold uppercase">
                    Monumento BIC
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {heroPlace.duration}
                    </span>
                    <span>•</span>
                    <span>{heroPlace.entry}</span>
                  </div>

                  <h3 className="font-editorial font-extrabold text-3xl sm:text-4xl text-[var(--text-main)] uppercase leading-tight mb-3">
                    {heroPlace.title}
                  </h3>

                  <p className="font-body text-[var(--text-muted)] text-base mb-6 leading-relaxed">
                    Templo cumbre del barroco madrileño. En su retablo mayor conviven el lienzo original de Francisco de Goya (1786-1787), las composiciones de Francisco y Ramón Bayeu, y la memoria de Pedro López de Lerena.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-main)]">
                  <button
                    onClick={() => onSelectPlace(heroPlace)}
                    className="flex-1 min-w-[160px] px-5 py-3 rounded-sm bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span>Ver ficha completa</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onToggleRoute(heroPlace)}
                    className={`px-4 py-3 rounded-sm border font-semibold text-sm transition-colors flex items-center justify-center gap-2 min-h-[44px] ${
                      isPlaceInRoute(heroPlace.id)
                        ? 'bg-[var(--accent-gold)] text-black border-[var(--accent-gold)] font-bold'
                        : 'border-[var(--border-strong)] text-[var(--text-main)] hover:border-[var(--accent-main)] bg-[var(--surface-subtle)]'
                    }`}
                    aria-label={isPlaceInRoute(heroPlace.id) ? 'Quitar de mi ruta' : 'Añadir a mi ruta'}
                  >
                    {isPlaceInRoute(heroPlace.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>En mi ruta</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Añadir a mi ruta</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Secondary Column: 3 Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryPlaces.map((place) => {
              const inRoute = isPlaceInRoute(place.id);
              return (
                <article 
                  key={place.id}
                  className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-sm p-5 hover:border-[var(--accent-main)] transition-all duration-300 flex flex-col sm:flex-row gap-5 group"
                >
                  <div className="w-full sm:w-36 h-36 shrink-0 relative overflow-hidden rounded-xs">
                    <img 
                      src={place.image} 
                      alt={place.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width="300"
                      height="300"
                      loading="lazy"
                      onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=Valdemoro'; e.target.onerror = null; }}
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-xs bg-black/80 text-white uppercase">
                      {place.categoryLabel}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[11px] font-bold text-[var(--accent-gold)] uppercase tracking-wider block mb-1">
                        {place.rating}
                      </span>
                      <h4 className="font-editorial font-bold text-2xl text-[var(--text-main)] uppercase leading-tight mb-1">
                        {place.title}
                      </h4>
                      <p className="font-body text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                        {place.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectPlace(place)}
                        className="text-xs font-bold text-[var(--accent-main)] hover:underline uppercase tracking-wider py-1.5 flex items-center gap-1"
                      >
                        <span>Detalles</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-neutral-400">•</span>

                      <button
                        onClick={() => onToggleRoute(place)}
                        className="text-xs font-semibold text-[var(--text-main)] hover:text-[var(--accent-main)] py-1.5 flex items-center gap-1"
                      >
                        {inRoute ? (
                          <span className="text-[var(--accent-gold)] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> En mi ruta
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Añadir a ruta
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
