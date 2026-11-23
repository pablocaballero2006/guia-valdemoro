import React, { useState } from 'react';
import { 
  CalendarClock, 
  MapPin, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  Train, 
  Car, 
  Bus, 
  Building2, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles,
  ExternalLink,
  Plus,
  Navigation,
  Route,
  CheckCircle2,
  Circle,
  Share2,
  Compass
} from 'lucide-react';
import { PRACTICAL_INFO, PLACES, getFallbackImage } from '../data/valdemoroData';

export default function PlanificadorRuta({ 
  routePlaces, 
  visitedPlaces = [],
  onToggleVisited,
  onRemoveFromRoute, 
  onMovePlace, 
  onClearRoute, 
  onLoadPresetRoute,
  onSelectPlace,
  onNavigateToRadar
}) {
  const [copied, setCopied] = useState(false);
  const [whatsappCopied, setWhatsappCopied] = useState(false);

  // Calculate estimated total time (approximate sum of minutes)
  const calculateTotalTime = () => {
    if (routePlaces.length === 0) return '0 minutos';
    let totalMinutes = 0;
    routePlaces.forEach(p => {
      if (p.duration.includes('1 - 2 horas')) totalMinutes += 90;
      else if (p.duration.includes('2 - 3 horas')) totalMinutes += 150;
      else if (p.duration.includes('45 - 60 min')) totalMinutes += 55;
      else if (p.duration.includes('30 - 45 min')) totalMinutes += 40;
      else if (p.duration.includes('30 min')) totalMinutes += 30;
      else if (p.duration.includes('20 min')) totalMinutes += 20;
      else if (p.duration.includes('45 min')) totalMinutes += 45;
      else totalMinutes += 45;
    });

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0) return `${mins} minutos`;
    if (mins === 0) return `${hours} horas`;
    return `${hours} horas y ${mins} minutos`;
  };

  // Visited count and percentage
  const visitedCount = routePlaces.filter(p => visitedPlaces.includes(p.id)).length;
  const visitedPercent = routePlaces.length > 0 
    ? Math.round((visitedCount / routePlaces.length) * 100) 
    : 0;

  const handleCopyItinerary = () => {
    if (routePlaces.length === 0) return;

    let text = `MI RUTA TURÍSTICA POR VALDEMORO\n`;
    text += `Tiempo estimado de visita: ${calculateTotalTime()}\n`;
    text += `Paradas planificadas (${routePlaces.length}):\n\n`;

    routePlaces.forEach((place, index) => {
      const isVisited = visitedPlaces.includes(place.id);
      text += `${index + 1}. ${place.title} ${isVisited ? '[VISITADA]' : ''}\n`;
      text += `   - Categoría: ${place.categoryLabel}\n`;
      text += `   - Duración estimada: ${place.duration}\n`;
      text += `   - Dirección: ${place.address}\n`;
      text += `   - Entrada: ${place.entry}\n`;
      text += `   - Coordenadas: ${place.lat}, ${place.lng}\n\n`;
    });

    text += `INFORMACIÓN PRÁCTICA:\n`;
    text += `Oficina de Turismo: Plaza de la Constitución, 7. Tel: 91 801 82 45.\n`;
    text += `Acceso Renfe: Línea C-3 desde Madrid Atocha/Sol (25 min).\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleCopyWhatsApp = () => {
    if (routePlaces.length === 0) return;

    let msg = `🏛️ *MI RUTA TURÍSTICA POR VALDEMORO* 🇪🇸\n`;
    msg += `⏱️ *Tiempo estimado:* ${calculateTotalTime()}\n`;
    msg += `📍 *${routePlaces.length} paradas planificadas:*\n\n`;

    routePlaces.forEach((p, idx) => {
      const isVisited = visitedPlaces.includes(p.id);
      const mark = isVisited ? '✅' : `${idx + 1}️⃣`;
      msg += `${mark} *${p.title}* (${p.categoryLabel})\n`;
      msg += `   ⏱️ ${p.duration} | 🎟️ ${p.entry}\n`;
      msg += `   📍 ${p.address}\n`;
      msg += `   🗺️ https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}\n\n`;
    });

    msg += `ℹ️ *Oficina de Turismo:* Plaza de la Constitución, 7 (Tel: 91 801 82 45)\n`;
    msg += `🚆 *Cercanías Renfe C-3:* Madrid Sol / Atocha -> Valdemoro (25 min)\n`;
    msg += `🌐 *Portal Oficial:* Descubre Valdemoro`;

    navigator.clipboard.writeText(msg).then(() => {
      setWhatsappCopied(true);
      setTimeout(() => setWhatsappCopied(false), 3000);
    });
  };

  const handleDownloadItinerary = () => {
    if (routePlaces.length === 0) return;

    let text = `MI RUTA TURÍSTICA POR VALDEMORO\n`;
    text += `Tiempo estimado de visita: ${calculateTotalTime()}\n`;
    text += `Paradas planificadas (${routePlaces.length}):\n\n`;

    routePlaces.forEach((place, index) => {
      const isVisited = visitedPlaces.includes(place.id);
      text += `${index + 1}. ${place.title} ${isVisited ? '[VISITADA]' : ''}\n`;
      text += `   - Categoría: ${place.categoryLabel}\n`;
      text += `   - Duración estimada: ${place.duration}\n`;
      text += `   - Dirección: ${place.address}\n`;
      text += `   - Entrada: ${place.entry}\n`;
      text += `   - Coordenadas: ${place.lat}, ${place.lng}\n\n`;
    });

    text += `INFORMACIÓN PRÁCTICA:\n`;
    text += `Oficina de Turismo: Plaza de la Constitución, 7. Tel: 91 801 82 45.\n`;
    text += `Acceso Renfe: Línea C-3 desde Madrid Atocha/Sol (25 min).\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mi-Ruta-Valdemoro.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenGoogleMapsRoute = () => {
    if (routePlaces.length === 0) return;
    
    if (routePlaces.length === 1) {
      const target = `${routePlaces[0].lat},${routePlaces[0].lng}`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target)}`, '_blank', 'noopener,noreferrer');
      return;
    }

    const origin = `${routePlaces[0].lat},${routePlaces[0].lng}`;
    const destination = `${routePlaces[routePlaces.length - 1].lat},${routePlaces[routePlaces.length - 1].lng}`;
    const waypoints = routePlaces.slice(1, -1).map(p => `${p.lat},${p.lng}`).join('|');

    let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;
    if (waypoints) {
      url += `&waypoints=${encodeURIComponent(waypoints)}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--badge-bg)] text-[var(--accent-main)] text-xs font-bold uppercase tracking-wider mb-3">
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Herramienta de Planificación</span>
          </div>
          <h2 className="font-editorial font-extrabold text-4xl sm:text-6xl text-[var(--text-main)] uppercase tracking-tight leading-none mb-4">
            Planifica tu Visita
          </h2>
          <p className="font-body text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Organiza tu itinerario personalizado, marca tus paradas en tiempo real con el modo En Ruta y consulta todos los transportes oficiales a Valdemoro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Mi Ruta Personalizada */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="bg-[var(--surface-main)] border border-[var(--border-main)] rounded-sm p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-main)]">
                <div>
                  <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-[var(--text-main)] uppercase">
                    Mi Ruta Personalizada
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {routePlaces.length} {routePlaces.length === 1 ? 'parada seleccionada' : 'paradas seleccionadas'} • Tiempo estimado: <strong className="text-[var(--accent-main)] font-bold">{calculateTotalTime()}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {onNavigateToRadar && (
                    <button
                      onClick={onNavigateToRadar}
                      className="text-xs font-bold text-[var(--accent-gold)] hover:text-white px-3 py-1.5 rounded-xs bg-black/60 border border-[var(--accent-gold)]/40 transition-colors flex items-center gap-1.5 min-h-[38px]"
                      title="Ver ruta en el Mapa Radar"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Ver en Radar</span>
                    </button>
                  )}

                  {routePlaces.length > 0 && (
                    <button
                      onClick={onClearRoute}
                      className="text-xs font-semibold text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 py-1 min-h-[38px]"
                      title="Vaciar itinerario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Vaciar</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar (Modo En Ruta) */}
              {routePlaces.length > 0 && (
                <div className="pt-4 pb-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1.5 text-[var(--accent-main)]">
                      <Route className="w-3.5 h-3.5" />
                      <span>Modo En Ruta: Progreso</span>
                    </span>
                    <span className="text-[var(--text-main)]">
                      {visitedCount} de {routePlaces.length} visitadas ({visitedPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[var(--surface-subtle)] border border-[var(--border-main)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--accent-main)] transition-all duration-300"
                      style={{ width: `${visitedPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Itinerary List */}
              {routePlaces.length > 0 ? (
                <div className="py-6 space-y-4">
                  {routePlaces.map((place, idx) => {
                    const isVisited = visitedPlaces.includes(place.id);
                    return (
                      <div 
                        key={place.id}
                        className={`p-4 rounded-sm border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isVisited 
                            ? 'bg-[var(--surface-subtle)]/50 border-emerald-500/40 opacity-80' 
                            : 'bg-[var(--surface-subtle)] border-[var(--border-main)]'
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-grow">
                          {/* Visit toggle button */}
                          {onToggleVisited ? (
                            <button
                              onClick={() => onToggleVisited(place.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors min-w-[32px] min-h-[32px] ${
                                isVisited
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-[var(--accent-main)] text-white hover:opacity-90'
                              }`}
                              title={isVisited ? 'Marcar como pendiente' : 'Marcar como visitada'}
                            >
                              {isVisited ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                            </button>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[var(--accent-main)] text-white font-editorial font-bold text-lg flex items-center justify-center shrink-0">
                              {idx + 1}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onSelectPlace(place)}
                                className={`text-left font-editorial font-bold text-xl uppercase hover:text-[var(--accent-main)] transition-colors truncate block max-w-full ${
                                  isVisited ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-main)]'
                                }`}
                              >
                                {place.title}
                              </button>
                              {isVisited && (
                                <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-xs shrink-0">
                                  Visitada
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                              <span className="text-[var(--accent-gold)] font-semibold">{place.duration}</span>
                              <span>•</span>
                              <span className="truncate">{place.entry}</span>
                            </div>
                          </div>
                        </div>

                        {/* Controls: Open Maps, Reorder & Delete */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          {/* Individual Google Maps button */}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xs text-[var(--accent-main)] hover:bg-[var(--border-main)] min-h-[44px] min-w-[40px] flex items-center justify-center gap-1 text-xs font-semibold"
                            title={`Abrir ${place.title} en Google Maps`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">GPS</span>
                          </a>

                          <button
                            onClick={() => onMovePlace(idx, -1)}
                            disabled={idx === 0}
                            className="p-2 rounded-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-main)] disabled:opacity-30 disabled:pointer-events-none min-h-[44px] min-w-[36px] flex items-center justify-center"
                            aria-label={`Mover ${place.title} arriba en el orden de visita`}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onMovePlace(idx, 1)}
                            disabled={idx === routePlaces.length - 1}
                            className="p-2 rounded-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-main)] disabled:opacity-30 disabled:pointer-events-none min-h-[44px] min-w-[36px] flex items-center justify-center"
                            aria-label={`Mover ${place.title} abajo en el orden de visita`}
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onRemoveFromRoute(place.id)}
                            className="p-2 rounded-xs text-neutral-400 hover:text-red-500 hover:bg-[var(--border-main)] min-h-[44px] min-w-[36px] flex items-center justify-center"
                            aria-label={`Eliminar ${place.title} de mi ruta`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    );
                  })}

                  {/* Actions for Export / Share */}
                  <div className="pt-6 border-t border-[var(--border-main)] flex flex-col gap-3">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleOpenGoogleMapsRoute}
                        className="flex-1 min-w-[200px] px-5 py-3.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px] shadow-sm"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Abrir ruta en Google Maps</span>
                      </button>

                      <button
                        onClick={handleCopyWhatsApp}
                        className="flex-1 min-w-[190px] px-5 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        {whatsappCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>¡Copiado para WhatsApp!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            <span>Copiar para WhatsApp</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCopyItinerary}
                        className="px-4 py-3.5 rounded-sm bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar texto</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDownloadItinerary}
                        className="px-4 py-3.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface-main)] hover:bg-[var(--surface-subtle)] text-[var(--text-main)] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <Download className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span>.txt</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] bg-[var(--surface-subtle)] p-3 rounded-xs border border-[var(--border-main)]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Route className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        Itinerario peatonal con coordenadas exactas
                      </span>
                      <span className="font-bold text-emerald-600">
                        100% Entradas Gratuitas
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty Route State with Quick 1-Click Preset (R-27) */
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--surface-subtle)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
                    <CalendarClock className="w-6 h-6" />
                  </div>
                  <h4 className="font-editorial font-bold text-xl text-[var(--text-main)] uppercase mb-2">
                    Tu ruta está vacía
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6">
                    Añade lugares desde la sección de Patrimonio o carga con un clic la ruta recomendada de un día en Valdemoro.
                  </p>

                  <button
                    onClick={onLoadPresetRoute}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[var(--accent-gold)] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity min-h-[44px]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Cargar Ruta Express de 1 Día (3 Paradas)</span>
                  </button>
                </div>
              )}

            </div>

            {/* Practical Map Assistance */}
            <div className="p-5 rounded-sm bg-[var(--surface-main)] border border-[var(--border-main)] flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[var(--accent-main)] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[var(--text-main)] block mb-1">
                  Movilidad dentro de Valdemoro
                </span>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  El Casco Histórico (Plaza de la Constitución, Asunción, Santa Clara y Fuente de la Villa) es totalmente peatonal y transitable a pie en menos de 10 minutos. Para el Parque Bolitas del Airón y El Restón se recomienda un agradable paseo o autobús urbano circular.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Cómo Llegar y Datos Prácticos */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Cómo llegar: Transportes reales contrastados */}
            <div className="bg-[var(--surface-main)] border border-[var(--border-main)] rounded-sm p-6 sm:p-8 shadow-sm">
              <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-[var(--text-main)] uppercase mb-6 pb-4 border-b border-[var(--border-main)]">
                Cómo Llegar a Valdemoro
              </h3>

              <div className="space-y-6">
                
                {/* Renfe Cercanías */}
                <div className="flex gap-4">
                  <div className="p-2.5 rounded-sm bg-red-500/10 text-red-500 shrink-0 h-fit">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[var(--text-main)] block">
                      {PRACTICAL_INFO.transport.renfe.line}
                    </span>
                    <span className="text-xs font-semibold text-[var(--accent-main)] block mb-1">
                      {PRACTICAL_INFO.transport.renfe.timeFromSol} desde Madrid Sol o Atocha
                    </span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                      Frecuencia: {PRACTICAL_INFO.transport.renfe.frequency}. Estación situada en {PRACTICAL_INFO.transport.renfe.stationAddress} ({PRACTICAL_INFO.transport.renfe.zone}).
                    </p>
                  </div>
                </div>

                {/* Carretera A-4 */}
                <div className="flex gap-4">
                  <div className="p-2.5 rounded-sm bg-blue-500/10 text-blue-500 shrink-0 h-fit">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[var(--text-main)] block">
                      {PRACTICAL_INFO.transport.road.highway} (Km 26,7)
                    </span>
                    <span className="text-xs font-semibold text-blue-400 block mb-1">
                      {PRACTICAL_INFO.transport.road.distanceMadrid}
                    </span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Accesos directos por Salida Norte (Polígonos y conexión M-423) y Salida Centro (Casco Urbano y aparcamientos disuasorios).
                    </p>
                  </div>
                </div>

                {/* Autobuses Interurbanos */}
                <div className="flex gap-4">
                  <div className="p-2.5 rounded-sm bg-emerald-500/10 text-emerald-500 shrink-0 h-fit">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[var(--text-main)] block mb-1">
                      Autobuses Interurbanos (CRTM)
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
                      {PRACTICAL_INFO.transport.buses.map((bus, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <strong className="text-[var(--text-main)] shrink-0">{bus.line}:</strong>
                          <span>{bus.route}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Official Tourism Office Card */}
            <div className="bg-[var(--surface-card)] border border-[var(--accent-gold)]/40 rounded-sm p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                <Building2 className="w-4 h-4" />
                <span>Atención Oficial al Visitante</span>
              </div>

              <h4 className="font-editorial font-bold text-2xl text-[var(--text-main)] uppercase mb-1">
                {PRACTICAL_INFO.tourismOffice.name}
              </h4>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Ubicada en el {PRACTICAL_INFO.tourismOffice.building}
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[var(--text-main)] border-t border-[var(--border-main)] pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--accent-main)] shrink-0 mt-0.5" />
                  <span>{PRACTICAL_INFO.tourismOffice.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--accent-main)] shrink-0" />
                  <a 
                    href={`tel:${PRACTICAL_INFO.tourismOffice.phone.replace(/\s+/g, '')}`}
                    className="hover:underline font-bold text-[var(--text-main)]"
                  >
                    {PRACTICAL_INFO.tourismOffice.phone}
                  </a>
                  <span className="text-neutral-400">/</span>
                  <span className="text-neutral-400">{PRACTICAL_INFO.tourismOffice.generalPhone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--accent-main)] shrink-0" />
                  <a 
                    href={`mailto:${PRACTICAL_INFO.tourismOffice.email}`}
                    className="hover:underline text-[var(--accent-main)] font-semibold"
                  >
                    {PRACTICAL_INFO.tourismOffice.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2 text-xs text-[var(--text-muted)] border-t border-[var(--border-main)]">
                  <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[var(--text-main)]">
                      {PRACTICAL_INFO.tourismOffice.hours}
                    </span>
                    <span>{PRACTICAL_INFO.tourismOffice.weekendNote}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
