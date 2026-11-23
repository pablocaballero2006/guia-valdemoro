import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  CalendarCheck, 
  Sparkles, 
  Navigation, 
  Landmark, 
  Users, 
  Flame, 
  Trophy,
  Check
} from 'lucide-react';
import { PRACTICAL_INFO, TRAVEL_PROFILES, getFallbackImage } from '../data/valdemoroData';

const PROFILE_ICONS = {
  Landmark: Landmark,
  Users: Users,
  Flame: Flame,
  Trophy: Trophy
};

export default function Hero({ 
  onExploreClick, 
  onPlanRouteClick, 
  onNavigateToRadar,
  currentProfile, 
  onSelectProfile 
}) {
  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pb-16"
      aria-label="Portada editorial de Valdemoro"
    >
      {/* Background Image with Cinematic High Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./images/valdemoro/hero-valdemoro.jpg"
          alt="Vista real de la Parroquia de la Asunción y atardecer en Valdemoro"
          className="w-full h-full object-cover object-[72%_center] sm:object-center filter brightness-[0.80] contrast-[1.10]"
          width="2000"
          height="1200"
          fetchPriority="high"
          onError={(e) => { 
            e.currentTarget.src = getFallbackImage('Valdemoro Madrid'); 
            e.currentTarget.onerror = null; 
          }}
        />
        {/* Dual Mode Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/60 to-black/50" 
        />
        <div 
          className="absolute inset-0 bg-radial at-center from-transparent via-transparent to-[var(--bg-main)]/70"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between">
        
        {/* Top Tag & Pre-header */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-md border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destino Cultural de la Comunidad de Madrid</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-md border border-white/20 text-neutral-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>21°C • Jornada óptima para visitar Valdemoro</span>
            </div>
          </div>

          {/* Main Cinematic Headline */}
          <h1 className="font-editorial font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-white uppercase mb-6 drop-shadow-md">
            VALDEMORO <br />
            <span className="text-[var(--accent-main)]">HISTORIA VIVA</span> <br />
            Y ARTE GOYESCO
          </h1>

          {/* Editorial Subtitle (Strictly No Em Dashes per R-02) */}
          <p className="font-body text-lg sm:text-xl text-neutral-200 leading-relaxed font-normal max-w-2xl mb-8 drop-shadow">
            Historia, arte goyesco y naturaleza al sur de Madrid. Descubre el legado del barroco castellano, la huella insigne de Francisco de Goya y más de 40 hectáreas de paraje natural a 25 minutos de Sol.
          </p>

          {/* Actions: Primary CTA, Radar Map & Route Planner */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onExploreClick}
              className="px-6 py-4 rounded-sm bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm sm:text-base tracking-wide uppercase transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[1px] flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <Compass className="w-5 h-5" />
              <span>Explorar lugares</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onNavigateToRadar && (
              <button
                onClick={onNavigateToRadar}
                className="px-6 py-4 rounded-sm bg-black/70 hover:bg-black border border-[var(--accent-gold)] text-[var(--accent-gold)] font-bold text-sm sm:text-base tracking-wide uppercase transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2.5 min-h-[48px]"
              >
                <Navigation className="w-5 h-5" />
                <span>Mapa</span>
              </button>
            )}

            <button
              onClick={onPlanRouteClick}
              className="px-6 py-4 rounded-sm bg-black/50 hover:bg-black/75 border border-white/30 hover:border-white text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <CalendarCheck className="w-5 h-5 text-neutral-300" />
              <span>Organizar mi ruta</span>
            </button>
          </div>

          {/* Travel Profile Selector ("¿Cuál es tu plan?") */}
          <div className="mb-10 p-4 sm:p-5 rounded-sm bg-black/60 backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>¿Cuál es tu plan? Personaliza tu visita</span>
              </span>
              {currentProfile && (
                <button
                  onClick={() => onSelectProfile(null)}
                  className="text-[11px] text-neutral-400 hover:text-white underline transition-colors"
                >
                  Ver todos
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TRAVEL_PROFILES.map((prof) => {
                const IconComponent = PROFILE_ICONS[prof.iconName] || Sparkles;
                const isSelected = currentProfile === prof.id;
                return (
                  <button
                    key={prof.id}
                    onClick={() => onSelectProfile(isSelected ? null : prof.id)}
                    className={`p-3 rounded-xs text-left transition-all border flex flex-col justify-between min-h-[70px] ${
                      isSelected
                        ? 'bg-[var(--accent-main)]/90 border-[var(--accent-gold)] text-white shadow-md'
                        : 'bg-black/40 hover:bg-white/10 border-white/10 text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <IconComponent className={`w-4 h-4 ${isSelected ? 'text-[var(--accent-gold)]' : 'text-neutral-400'}`} />
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </div>
                    <span className="font-editorial font-bold text-sm sm:text-base uppercase tracking-tight leading-tight block">
                      {prof.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real Verified Destination Stats */}
        <div className="border-t border-white/15 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-black/40 backdrop-blur-md p-5 rounded-sm border">
          {(PRACTICAL_INFO?.stats || []).map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-editorial font-bold text-3xl sm:text-4xl text-[var(--accent-gold)] leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-[11px] text-neutral-300 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
