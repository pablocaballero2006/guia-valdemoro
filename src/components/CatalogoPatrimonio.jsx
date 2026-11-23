import React, { useState, useMemo } from 'react';
import { Search, X, Clock, MapPin, Plus, Check, ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import { PLACES, CATEGORIES } from '../data/valdemoroData';

export default function CatalogoPatrimonio({ onSelectPlace, onToggleRoute, isPlaceInRoute }) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('todas');
  const [onlyFree, setOnlyFree] = useState(false);

  // Instant reactive filter
  const filteredPlaces = useMemo(() => {
    return PLACES.filter(place => {
      const matchesCategory = selectedCategory === 'todos' || place.category === selectedCategory;
      
      const matchesFree = !onlyFree || place.entry.toLowerCase().includes('gratuita') || place.entry.toLowerCase().includes('libre');

      let matchesDuration = true;
      if (durationFilter === 'corta') {
        matchesDuration = place.duration.includes('20 min') || place.duration.includes('30 min');
      } else if (durationFilter === 'media') {
        matchesDuration = place.duration.includes('45') || place.duration.includes('60 min');
      } else if (durationFilter === 'larga') {
        matchesDuration = place.duration.includes('horas') || place.duration.includes('hora');
      }

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory && matchesFree && matchesDuration;

      const matchesText = 
        place.title.toLowerCase().includes(query) ||
        place.shortSubtitle.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.tags.some(tag => tag.toLowerCase().includes(query)) ||
        place.address.toLowerCase().includes(query);

      return matchesCategory && matchesFree && matchesDuration && matchesText;
    });
  }, [selectedCategory, searchQuery, durationFilter, onlyFree]);

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSearchQuery('');
    setDurationFilter('todas');
    setOnlyFree(false);
  };

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--badge-bg)] text-[var(--accent-main)] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guía de Patrimonio y Cultura</span>
          </div>
          <h2 className="font-editorial font-extrabold text-4xl sm:text-6xl text-[var(--text-main)] uppercase tracking-tight leading-none mb-4">
            Catálogo del Destino
          </h2>
          <p className="font-body text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Explora la riqueza monumental, los tesoros pictóricos del barroco castellano, las grandes zonas verdes y las celebraciones históricas de Valdemoro.
          </p>
        </div>

        {/* Filter Toolbar: Search Bar + Category Pills */}
        <div className="bg-[var(--surface-main)] border border-[var(--border-main)] rounded-sm p-4 sm:p-6 mb-10 shadow-sm flex flex-col gap-6">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por monumento, Goya, naturaleza, fiestas..."
              className="w-full pl-12 pr-10 py-3.5 bg-[var(--surface-subtle)] border border-[var(--border-strong)] rounded-sm text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-main)] focus:ring-1 focus:ring-[var(--accent-main)] transition-colors min-h-[46px]"
              aria-label="Buscar en el catálogo de patrimonio y cultura"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-full focus:outline-none"
                aria-label="Borrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filtrar por categoría">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                    isSelected
                      ? 'bg-[var(--accent-main)] text-white shadow-sm'
                      : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-main)] border border-[var(--border-main)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Subfilters: Duración estimada y Acceso Gratuito */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-main)] text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[11px] mr-1">
                Tiempo:
              </span>
              {[
                { id: 'todas', label: 'Cualquiera' },
                { id: 'corta', label: 'Rápida (≤ 30 min)' },
                { id: 'media', label: 'Media (45-60 min)' },
                { id: 'larga', label: 'Larga (≥ 1 hora)' }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDurationFilter(d.id)}
                  className={`px-3 py-1.5 rounded-xs text-[11px] font-semibold transition-colors min-h-[36px] ${
                    durationFilter === d.id
                      ? 'bg-[var(--accent-gold)] text-black font-bold'
                      : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOnlyFree(!onlyFree)}
              className={`px-3.5 py-1.5 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-colors min-h-[36px] flex items-center gap-1.5 border ${
                onlyFree
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] border-[var(--border-strong)] hover:text-[var(--text-main)]'
              }`}
            >
              <span>{onlyFree ? '✓ Solo Gratuitos' : 'Entrada Gratuita'}</span>
            </button>
          </div>

          {/* Active Filter Indicator & Count */}
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium pt-2 border-t border-[var(--border-main)]">
            <span>
              Mostrando <strong className="text-[var(--text-main)]">{filteredPlaces.length}</strong> de {PLACES.length} lugares catalogados
            </span>
            {(selectedCategory !== 'todos' || searchQuery || durationFilter !== 'todas' || onlyFree) && (
              <button
                onClick={handleResetFilters}
                className="text-[var(--accent-main)] hover:underline font-bold"
              >
                Restablecer todos los filtros
              </button>
            )}
          </div>

        </div>

        {/* Results Grid or Empty State */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => {
              const inRoute = isPlaceInRoute(place.id);
              return (
                <article
                  key={place.id}
                  className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[var(--accent-main)] transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  {/* Image and Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-subtle)]">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width="600"
                      height="375"
                      loading="lazy"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x375?text=Valdemoro'; e.target.onerror = null; }}
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-xs bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold uppercase">
                        {place.categoryLabel}
                      </span>
                      {place.tags.includes('BIC') && (
                        <span className="px-2.5 py-1 rounded-xs bg-[var(--accent-gold)] text-black text-[11px] font-extrabold uppercase">
                          BIC
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--accent-gold)] uppercase tracking-wider mb-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{place.duration}</span>
                        <span>•</span>
                        <span>{place.entry}</span>
                      </div>

                      <h3 className="font-editorial font-bold text-2xl text-[var(--text-main)] uppercase leading-snug mb-2 group-hover:text-[var(--accent-main)] transition-colors">
                        {place.title}
                      </h3>

                      <p className="font-body text-xs text-[var(--text-muted)] line-clamp-3 mb-4 leading-relaxed">
                        {place.description}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {place.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-xs bg-[var(--badge-bg)] text-[var(--text-muted)] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-main)]">
                      <button
                        onClick={() => onSelectPlace(place)}
                        className="flex-1 px-4 py-2.5 rounded-sm bg-[var(--surface-subtle)] hover:bg-[var(--border-main)] text-[var(--text-main)] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                      >
                        <span>Ver Ficha</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onToggleRoute(place)}
                        className={`px-3 py-2.5 rounded-sm border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 min-h-[44px] ${
                          inRoute
                            ? 'bg-[var(--accent-gold)] text-black border-[var(--accent-gold)] font-bold'
                            : 'border-[var(--border-strong)] text-[var(--text-main)] hover:border-[var(--accent-main)] bg-[var(--surface-main)]'
                        }`}
                        aria-label={inRoute ? `Quitar ${place.title} de mi ruta` : `Añadir ${place.title} a mi ruta`}
                      >
                        {inRoute ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">En ruta</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Añadir</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State (R-27) */
          <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-sm p-12 text-center max-w-xl mx-auto">
            <Search className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
            <h3 className="font-editorial font-bold text-2xl text-[var(--text-main)] uppercase mb-2">
              No se han encontrado resultados
            </h3>
            <p className="font-body text-sm text-[var(--text-muted)] mb-6">
              No hay lugares de interés que coincidan con los criterios actuales de búsqueda o categoría.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 rounded-sm bg-[var(--accent-main)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
