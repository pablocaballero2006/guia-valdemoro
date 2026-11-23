import React from 'react';
import { Sparkles, Clock, Check, ArrowRight, Compass, Shield, Users, MapPin } from 'lucide-react';
import { PLACES } from '../data/valdemoroData';

export default function RutasRecomendadas({ onLoadCustomPreset, onNavigateToPlanner }) {
  const PRESET_ROUTES = [
    {
      id: 'goyesca',
      title: 'Ruta Goyesca y Barroco Castellano',
      badge: 'Historia y Arte',
      duration: '3 horas aprox.',
      stopsCount: 4,
      cost: 'Acceso Gratuito',
      target: 'Ideal amantes del arte e historia',
      image: '/images/valdemoro/iglesia-asuncion.jpg',
      description: 'El itinerario cultural esencial: admira el óleo de Francisco de Goya en la Asunción, pasea bajo los soportales del siglo XVII y conoce la clausura del Duque de Lerma.',
      placeIds: ['iglesia-asuncion', 'plaza-constitucion', 'convento-santa-clara', 'fuente-de-la-villa']
    },
    {
      id: 'familia',
      title: 'Escapada Verde y Familiar',
      badge: 'Naturaleza y Relax',
      duration: '4 horas aprox.',
      stopsCount: 3,
      cost: '100% Gratuito',
      target: 'Familias con niños y mascotas',
      image: '/images/valdemoro/bolitas-del-airon.jpg',
      description: 'Un recorrido pensado para desconectar: 44 hectáreas en Bolitas del Airón con arroyos y merenderos, seguido del lago con aves del parque Tierno Galván.',
      placeIds: ['bolitas-del-airon', 'tierno-galvan', 'fuente-de-la-villa']
    },
    {
      id: 'completa',
      title: 'Gran Experiencia Valdemoro 360',
      badge: 'Día Completo',
      duration: 'Jornada Completa (6-7 h)',
      stopsCount: 6,
      cost: 'Variable según gastronomía',
      target: 'La experiencia turística definitiva',
      image: '/images/valdemoro/plaza-constitucion.jpg',
      description: 'Combina patrimonio monumental, el lienzo de Goya, paseo por los parques naturales, ruta de tapas tradicionales y velada en el Teatro Juan Prado.',
      placeIds: ['iglesia-asuncion', 'plaza-constitucion', 'convento-santa-clara', 'fuente-de-la-villa', 'bolitas-del-airon', 'teatro-juan-prado']
    }
  ];

  const handleApplyPreset = (route) => {
    const selected = PLACES.filter(p => route.placeIds.includes(p.id));
    onLoadCustomPreset(selected);
    onNavigateToPlanner();
  };

  return (
    <section className="py-16 sm:py-24 bg-[var(--surface-subtle)] border-y border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--badge-bg)] text-[var(--accent-main)] text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Itinerarios Inteligentes</span>
            </div>
            <h2 className="font-editorial font-extrabold text-4xl sm:text-5xl text-[var(--text-main)] uppercase tracking-tight">
              ¿Qué tipo de viaje buscas?
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[var(--text-muted)] max-w-md mt-4 md:mt-0">
            Selecciona una ruta temática optimizada con paradas en orden lógico. Puedes cargarla en tu planificador con un solo clic y adaptarla a tu ritmo.
          </p>
        </div>

        {/* 3 Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRESET_ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[var(--accent-main)] transition-all duration-300 shadow-sm group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="600"
                  height="375"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x375?text=Ruta+Valdemoro'; e.target.onerror = null; }}
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-xs bg-[var(--accent-main)] text-white text-[11px] font-bold uppercase">
                    {route.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-xs bg-black/80 text-[var(--accent-gold)] text-[11px] font-bold">
                    {route.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] mb-2">
                    <span className="text-[var(--accent-gold)] font-bold">{route.stopsCount} paradas clave</span>
                    <span>•</span>
                    <span>{route.cost}</span>
                  </div>

                  <h3 className="font-editorial font-bold text-2xl text-[var(--text-main)] uppercase leading-snug mb-2 group-hover:text-[var(--accent-main)] transition-colors">
                    {route.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {route.description}
                  </p>

                  <div className="p-3 rounded-xs bg-[var(--surface-subtle)] border border-[var(--border-main)] mb-6 text-xs text-[var(--text-muted)]">
                    <span className="text-[11px] font-bold text-[var(--text-main)] block mb-1 uppercase tracking-wider">
                      Recomendado para:
                    </span>
                    <span>{route.target}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyPreset(route)}
                  className="w-full px-5 py-3 rounded-sm bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Cargar esta ruta en mi planificador</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
