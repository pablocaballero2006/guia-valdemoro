import React from 'react';
import { ArrowRight, Compass, CalendarCheck, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';
import { PRACTICAL_INFO } from '../data/valdemoroData';

export default function Hero({ onExploreClick, onPlanRouteClick }) {
  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pb-16"
      aria-label="Portada editorial de Valdemoro"
    >
      {/* Background Image with Cinematic High Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/valdemoro/hero-valdemoro.jpg"
          alt="Vista real de la Plaza Mayor y Torre del Reloj de Valdemoro"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15]"
          width="2000"
          height="1200"
          fetchPriority="high"
          onError={(e) => { e.target.src = 'https://placehold.co/2000x1200?text=Valdemoro+Madrid'; e.target.onerror = null; }}
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

          {/* Actions: Primary CTA and Route Planner Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={onExploreClick}
              className="px-6 py-4 rounded-sm bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white font-bold text-base tracking-wide uppercase transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[1px] flex items-center justify-center gap-3 min-h-[48px]"
            >
              <Compass className="w-5 h-5" />
              <span>Explorar lugares de interés</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPlanRouteClick}
              className="px-6 py-4 rounded-sm bg-black/50 hover:bg-black/75 border border-white/30 hover:border-white text-white font-semibold text-base tracking-wide transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-3 min-h-[48px]"
            >
              <CalendarCheck className="w-5 h-5 text-[var(--accent-gold)]" />
              <span>Organizar mi ruta</span>
            </button>
          </div>
        </div>

        {/* Real Verified Destination Stats */}
        <div className="border-t border-white/15 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-black/40 backdrop-blur-md p-5 rounded-sm border">
          {PRACTICAL_INFO.stats.map((stat, idx) => (
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
