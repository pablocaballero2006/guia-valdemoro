import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Route, 
  Clock, 
  Plus, 
  Check, 
  Sparkles, 
  Share2, 
  Trash2, 
  Search, 
  ExternalLink,
  ChevronRight,
  Crosshair,
  Footprints,
  Eye,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  PLACES, 
  CATEGORIES, 
  THEMED_ROUTES, 
  RADAR_DISTRICTS,
  getFallbackImage 
} from '../data/valdemoroData';

// Category color palette inspired by GTA VI radar HUD
const CATEGORY_COLORS = {
  patrimonio: '#FF5A36', // Coral
  cultura: '#FFB84D',    // Gold
  parques: '#749E78',    // Sage green
  deporte: '#38BDF8',    // Cyan
  gastronomia: '#F43F5E',// Crimson
  compras: '#A855F7',    // Purple
  transporte: '#EAB308', // Amber
  servicios: '#10B981'   // Emerald
};

// Distance calculation using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapaRadar({ 
  routePlaces, 
  onToggleRoute, 
  isPlaceInRoute, 
  onSelectPlace,
  onLoadCustomPreset,
  onClearRoute,
  isDark
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const lightLayerRef = useRef(null);
  const darkLayerRef = useRef(null);
  const markersRef = useRef({});
  const polylineGlowRef = useRef(null);
  const polylineCoreRef = useRef(null);
  const waypointMarkersRef = useRef([]);

  const [effectiveDark, setEffectiveDark] = useState(() => {
    if (typeof isDark === 'boolean') return isDark;
    return typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true;
  });

  useEffect(() => {
    if (typeof isDark === 'boolean') {
      setEffectiveDark(isDark);
    }
  }, [isDark]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setEffectiveDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [whatsappCopied, setWhatsappCopied] = useState(false);
  const [focusedPlaceId, setFocusedPlaceId] = useState(null);

  // Filtered places for list and radar blips
  const filteredPlaces = useMemo(() => {
    return PLACES.filter(p => {
      const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchText = !q || 
        p.title.toLowerCase().includes(q) || 
        p.address.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [selectedCategory, searchQuery]);

  // Route statistics
  const routeStats = useMemo(() => {
    if (routePlaces.length < 2) return { distanceKm: 0, walkingMins: 0 };
    let straightKm = 0;
    for (let i = 0; i < routePlaces.length - 1; i++) {
      straightKm += calculateDistance(
        routePlaces[i].lat, routePlaces[i].lng,
        routePlaces[i + 1].lat, routePlaces[i + 1].lng
      );
    }
    // Urban pedestrian factor: street turns add ~25%
    const realKm = straightKm * 1.25;
    const mins = Math.round((realKm / 4.5) * 60);
    return {
      distanceKm: Number(realKm.toFixed(2)),
      walkingMins: mins
    };
  }, [routePlaces]);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Valdemoro
    const map = L.map(mapContainerRef.current, {
      center: [40.1895, -3.6780],
      zoom: 14,
      minZoom: 13,
      maxZoom: 18,
      maxBounds: [
        [40.1500, -3.7350], // Suroeste
        [40.2300, -3.6150]  // Noreste
      ],
      maxBoundsViscosity: 0.9,
      zoomControl: false
    });

    const isCurrentlyDark = document.documentElement.classList.contains('dark');

    // Light mode CartoDB Voyager tiles
    const lightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors, © CARTO',
      subdomains: 'abcd',
      maxNativeZoom: 19,
      maxZoom: 18,
      opacity: isCurrentlyDark ? 0 : 1
    }).addTo(map);

    // Dark mode CartoDB Dark Matter tiles
    const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors, © CARTO',
      subdomains: 'abcd',
      maxNativeZoom: 19,
      maxZoom: 18,
      opacity: isCurrentlyDark ? 1 : 0
    }).addTo(map);

    lightLayerRef.current = lightLayer;
    darkLayerRef.current = darkLayer;

    if (isCurrentlyDark) {
      darkLayer.bringToFront();
    } else {
      lightLayer.bringToFront();
    }

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 2. Add District Labels
    RADAR_DISTRICTS.forEach(district => {
      const labelIcon = L.divIcon({
        className: 'district-label-container',
        html: `<div class="district-label">${district.name}</div>`,
        iconSize: [160, 24],
        iconAnchor: [80, 12]
      });
      L.marker(district.coords, { 
        icon: labelIcon, 
        interactive: false,
        zIndexOffset: 1000 
      }).addTo(map);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      lightLayerRef.current = null;
      darkLayerRef.current = null;
    };
  }, []);

  // Synchronize CartoDB Voyager (Light) / Dark Matter (Dark) Tile Layers dynamically without purging tiles
  useEffect(() => {
    const map = mapInstanceRef.current;
    const lightLayer = lightLayerRef.current;
    const darkLayer = darkLayerRef.current;
    if (!map || !lightLayer || !darkLayer) return;

    if (effectiveDark) {
      darkLayer.setOpacity(1);
      lightLayer.setOpacity(0);
      darkLayer.bringToFront();
    } else {
      lightLayer.setOpacity(1);
      darkLayer.setOpacity(0);
      lightLayer.bringToFront();
    }
    map.invalidateSize();
  }, [effectiveDark]);

  // 3. Render 15 Radar Blips
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing place markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    PLACES.forEach(place => {
      const color = CATEGORY_COLORS[place.category] || '#FF5A36';
      const inRoute = isPlaceInRoute(place.id);
      const isVisible = filteredPlaces.some(p => p.id === place.id);

      // Radar Blip HTML icon
      const blipHtml = `
        <div class="relative group cursor-pointer" style="opacity: ${isVisible ? '1' : '0.25'}; transition: opacity 0.3s;">
          ${inRoute ? `<div class="absolute -inset-2 rounded-full border-2 border-[${color}] radar-pulse-ring"></div>` : ''}
          <div style="background-color: ${color}; box-shadow: 0 0 12px ${color}88;" class="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[10px] shadow-lg">
            ${inRoute ? '★' : '•'}
          </div>
        </div>
      `;

      const blipIcon = L.divIcon({
        className: 'custom-radar-blip',
        html: blipHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
      });

      const marker = L.marker([place.lat, place.lng], { icon: blipIcon }).addTo(map);

      // Popup Content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans text-neutral-900 dark:text-neutral-100 min-w-[220px] max-w-[260px]';
      popupContent.innerHTML = `
        <div class="relative aspect-[16/10] overflow-hidden rounded-xs mb-2 bg-neutral-900">
          <img src="${place.image}" alt="${place.title}" class="w-full h-full object-cover" onerror="this.src='${getFallbackImage(place.title)}'" />
          <span style="background-color: ${color};" class="absolute top-1.5 left-1.5 px-2 py-0.5 text-[9px] font-bold text-white uppercase rounded-xs">
            ${place.categoryLabel}
          </span>
        </div>
        <h4 class="font-bold text-sm uppercase leading-tight mb-1 text-black dark:text-white">
          ${place.title}
        </h4>
        <p class="text-[11px] text-neutral-600 dark:text-neutral-400 mb-2 line-clamp-2">
          ${place.description}
        </p>
        <div class="text-[10px] text-neutral-500 mb-3 flex items-center gap-1">
          <span>📍</span> <span class="truncate">${place.address}</span>
        </div>
        <div class="flex items-center gap-1.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <button id="btn-popup-waypoint-${place.id}" class="flex-1 py-1.5 px-2 rounded-xs text-[10px] font-bold uppercase tracking-wider text-white transition-colors" style="background-color: ${color};">
            ${inRoute ? '✓ En Ruta' : '+ Añadir Waypoint'}
          </button>
          <button id="btn-popup-detail-${place.id}" class="py-1.5 px-2.5 rounded-xs text-[10px] font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Ficha
          </button>
        </div>
      `;

      // Bind button events inside popup
      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btnWaypoint = document.getElementById(`btn-popup-waypoint-${place.id}`);
        const btnDetail = document.getElementById(`btn-popup-detail-${place.id}`);
        if (btnWaypoint) {
          btnWaypoint.onclick = () => {
            onToggleRoute(place);
            marker.closePopup();
          };
        }
        if (btnDetail) {
          btnDetail.onclick = () => {
            onSelectPlace(place);
            marker.closePopup();
          };
        }
      });

      markersRef.current[place.id] = marker;
    });
  }, [filteredPlaces, routePlaces, isPlaceInRoute, onToggleRoute, onSelectPlace]);

  // 4. Draw Glowing GPS Polyline for Waypoints
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove previous polylines & sequence numbers
    if (polylineGlowRef.current) polylineGlowRef.current.remove();
    if (polylineCoreRef.current) polylineCoreRef.current.remove();
    waypointMarkersRef.current.forEach(m => m.remove());
    waypointMarkersRef.current = [];

    if (routePlaces.length >= 2) {
      const latlngs = routePlaces.map(p => [p.lat, p.lng]);

      // Outer glow line (GTA VI GPS neon glow)
      polylineGlowRef.current = L.polyline(latlngs, {
        color: '#FF5A36',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // Core sharp line
      polylineCoreRef.current = L.polyline(latlngs, {
        color: '#FFB84D',
        weight: 3.5,
        opacity: 0.95,
        dashArray: '1, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // Numbered badge on each waypoint stop
      routePlaces.forEach((p, idx) => {
        const numIcon = L.divIcon({
          className: 'waypoint-number-icon',
          html: `
            <div class="w-6 h-6 rounded-full bg-[#14141C] border-2 border-[#FF5A36] text-[#FFB84D] font-extrabold text-[11px] flex items-center justify-center shadow-md">
              ${idx + 1}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        const numMarker = L.marker([p.lat, p.lng], { icon: numIcon, interactive: false, zIndexOffset: 200 }).addTo(map);
        waypointMarkersRef.current.push(numMarker);
      });
    }
  }, [routePlaces]);

  // Handle focus on place from list
  const handleFocusPlace = (place) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    setFocusedPlaceId(place.id);
    map.flyTo([place.lat, place.lng], 16, { duration: 0.8 });
    const marker = markersRef.current[place.id];
    if (marker) {
      setTimeout(() => marker.openPopup(), 400);
    }
  };

  // Reset Map View to Valdemoro Overview
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([40.1895, -3.6740], 14, { duration: 0.8 });
  };

  // Copy route for WhatsApp
  const handleShareWhatsApp = () => {
    if (routePlaces.length === 0) return;
    let msg = `*MI RUTA POR VALDEMORO (Descubre Valdemoro)*\n`;
    msg += `Itinerario peatonal planificado (${routePlaces.length} paradas):\n\n`;
    routePlaces.forEach((p, i) => {
      msg += `*${i + 1}. ${p.title}*\n`;
      msg += `📍 ${p.address}\n`;
      msg += `⏱️ Duración recomendada: ${p.duration}\n\n`;
    });
    if (routeStats.distanceKm > 0) {
      msg += `*Recorrido estimado:* ${routeStats.distanceKm} km (aprox. ${routeStats.walkingMins} min a pie)\n\n`;
    }
    msg += `Ver mapa oficial: https://valdemoro.es\n`;

    navigator.clipboard.writeText(msg).then(() => {
      setWhatsappCopied(true);
      setTimeout(() => setWhatsappCopied(false), 3000);
    });
  };

  // Open full route in Google Maps using exact coordinates
  const handleOpenGoogleMaps = () => {
    if (routePlaces.length === 0) return;
    if (routePlaces.length === 1) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${routePlaces[0].lat},${routePlaces[0].lng}`, '_blank');
      return;
    }
    const origin = `${routePlaces[0].lat},${routePlaces[0].lng}`;
    const destination = `${routePlaces[routePlaces.length - 1].lat},${routePlaces[routePlaces.length - 1].lng}`;
    const waypoints = routePlaces.slice(1, -1).map(p => `${p.lat},${p.lng}`).join('|');
    let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;
    if (waypoints) {
      url += `&waypoints=${encodeURIComponent(waypoints)}`;
    }
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 sm:py-20 bg-[var(--bg-main)]" id="mapa-radar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--badge-bg)] text-[var(--accent-main)] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Navegación Interactiva & Puntos de Interés</span>
          </div>
          <h2 className="font-editorial font-extrabold text-4xl sm:text-6xl text-[var(--text-main)] uppercase tracking-tight leading-none mb-4">
            Mapa de Valdemoro
          </h2>
          <p className="font-body text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Cartografía interactiva con los 15 hitos reales contrastados de Valdemoro. Traza waypoints en tiempo real y calcula distancias y tiempos de visita a pie.
          </p>
        </div>

        {/* 3 Rutas Temáticas en 1 Clic */}
        <div className="mb-8 p-4 sm:p-5 rounded-sm bg-[var(--surface-main)] border border-[var(--border-main)] shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="font-editorial font-bold text-lg uppercase text-[var(--text-main)]">
                Cargar Rutas Temáticas en 1 Clic
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
              Selecciona una ruta para activar su trazado GPS en el mapa
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {THEMED_ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => {
                  const selected = PLACES.filter(p => route.placeIds.includes(p.id));
                  onLoadCustomPreset(selected);
                }}
                className="p-3.5 rounded-sm border border-[var(--border-main)] bg-[var(--surface-subtle)] hover:border-[var(--accent-main)] text-left transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase mb-1">
                    <span className="text-[var(--accent-gold)]">{route.badge}</span>
                    <span className="text-[var(--text-muted)]">{route.stopsCount} paradas</span>
                  </div>
                  <h4 className="font-editorial font-bold text-base sm:text-lg uppercase text-[var(--text-main)] group-hover:text-[var(--accent-main)] transition-colors mb-1">
                    {route.title}
                  </h4>
                  <p className="font-body text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                    {route.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--accent-main)] pt-2 border-t border-[var(--border-main)]/60">
                  <span>Cargar Waypoints</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Radar Map + Side/Bottom Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Map Viewport (8 Columns on Desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            
            {/* Map Frame */}
            <div className={`relative rounded-sm overflow-hidden border-2 border-[var(--border-strong)] shadow-xl transition-colors duration-200 ${effectiveDark ? 'bg-[#0d1117]' : 'bg-[#dce4dc]'}`}>
              
              {/* Map Container */}
              <div 
                ref={mapContainerRef} 
                className={`w-full h-[520px] sm:h-[620px] gta-radar-map z-0 ${effectiveDark ? 'map-dark' : 'map-light'}`}
              />

              {/* HUD Header Bar (GTA VI Pause Menu Aesthetic) */}
              <div className="absolute top-3 left-3 right-3 z-[400] flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1.5 rounded-xs bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] flex items-center gap-2 shadow-lg">
                  <Crosshair className="w-3.5 h-3.5 text-[var(--accent-main)] animate-spin-slow" />
                  <span>MAPA // VALDEMORO [40.1895°N, 3.6740°W]</span>
                </div>

                <div className="px-3 py-1.5 rounded-xs bg-black/85 backdrop-blur-md border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GPS ACTIVO</span>
                </div>
              </div>

              {/* HUD Bottom Bar: Waypoints & Stats */}
              <div className="absolute bottom-3 left-3 right-16 z-[400] pointer-events-none flex flex-wrap gap-2">
                <div className="px-3 py-2 rounded-xs bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-3 shadow-lg pointer-events-auto">
                  <div className="flex items-center gap-1.5 font-bold text-[var(--accent-gold)]">
                    <Route className="w-4 h-4" />
                    <span>{routePlaces.length} {routePlaces.length === 1 ? 'PARADA' : 'PARADAS'}</span>
                  </div>
                  {routeStats.distanceKm > 0 && (
                    <>
                      <span className="text-white/30">•</span>
                      <div className="flex items-center gap-1 font-mono">
                        <Footprints className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{routeStats.distanceKm} KM</span>
                      </div>
                      <span className="text-white/30">•</span>
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[var(--accent-main)]" />
                        <span>~{routeStats.walkingMins} MIN A PIE</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Reset View Button */}
                <button
                  onClick={handleResetView}
                  className="px-3 py-2 rounded-xs bg-black/85 hover:bg-black text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-lg pointer-events-auto flex items-center gap-1.5 transition-colors"
                  title="Centrar vista de Valdemoro"
                >
                  <Navigation className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span className="hidden sm:inline">Centrar</span>
                </button>
              </div>

            </div>

            {/* Quick Action Buttons Under Map */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[var(--surface-main)] border border-[var(--border-main)] rounded-sm text-xs">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-main)]" />
                <span>Haz clic sobre cualquier marcador del mapa para añadirlo a tu itinerario</span>
              </div>

              <div className="flex items-center gap-2">
                {routePlaces.length > 0 && (
                  <>
                    <button
                      onClick={handleOpenGoogleMaps}
                      className="px-3.5 py-2 rounded-xs bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps GPS</span>
                    </button>

                    <button
                      onClick={handleShareWhatsApp}
                      className="px-3.5 py-2 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{whatsappCopied ? '¡Copiado!' : 'Compartir WhatsApp'}</span>
                    </button>

                    <button
                      onClick={onClearRoute}
                      className="p-2 text-neutral-400 hover:text-red-500 rounded-xs transition-colors"
                      title="Limpiar waypoints"
                      aria-label="Vaciar ruta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Places Radar Drawer (4 Columns on Desktop) */}
          <div className="lg:col-span-4 bg-[var(--surface-main)] border border-[var(--border-main)] rounded-sm p-4 sm:p-5 shadow-sm flex flex-col h-[580px] sm:h-[680px]">
            
            <div className="pb-4 border-b border-[var(--border-main)] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial font-bold text-xl uppercase text-[var(--text-main)] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--accent-main)]" />
                  <span>Hitos de Valdemoro</span>
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-xs bg-[var(--badge-bg)] text-[var(--text-main)]">
                  {filteredPlaces.length} / {PLACES.length}
                </span>
              </div>

              {/* Search in Radar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en el mapa..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[var(--surface-subtle)] border border-[var(--border-main)] rounded-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-main)] transition-colors"
                />
              </div>

              {/* Category Pills Slider */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[var(--accent-main)] text-white'
                        : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Places Scrollable List */}
            <div className="flex-grow overflow-y-auto py-3 space-y-2.5 pr-1 scrollbar-thin">
              {filteredPlaces.map(place => {
                const inRoute = isPlaceInRoute(place.id);
                const isFocused = focusedPlaceId === place.id;
                const catColor = CATEGORY_COLORS[place.category] || '#FF5A36';

                return (
                  <div
                    key={place.id}
                    className={`p-3 rounded-xs border transition-all duration-200 text-left flex flex-col gap-2 ${
                      isFocused 
                        ? 'border-[var(--accent-main)] bg-[var(--surface-subtle)] shadow-sm'
                        : 'border-[var(--border-main)] bg-[var(--surface-card)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span 
                            style={{ backgroundColor: catColor }} 
                            className="w-2 h-2 rounded-full inline-block shrink-0" 
                          />
                          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider truncate">
                            {place.categoryLabel}
                          </span>
                        </div>
                        <h4 className="font-editorial font-bold text-base text-[var(--text-main)] uppercase leading-snug truncate">
                          {place.title}
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] truncate">
                          {place.address}
                        </p>
                      </div>

                      <img
                        src={place.image}
                        alt={place.title}
                        className="w-12 h-12 object-cover rounded-xs border border-[var(--border-main)] shrink-0"
                        onError={(e) => { e.target.src = getFallbackImage(place.title); e.target.onerror = null; }}
                      />
                    </div>

                    {/* Actions on place card */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border-main)]/60 text-xs">
                      <button
                        onClick={() => handleFocusPlace(place)}
                        className="text-[var(--accent-gold)] hover:underline font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 py-1"
                      >
                        <Crosshair className="w-3 h-3" />
                        <span>Enfocar</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectPlace(place)}
                          className="px-2 py-1 rounded-xs border border-[var(--border-main)] text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)]"
                        >
                          Ficha
                        </button>

                        <button
                          onClick={() => onToggleRoute(place)}
                          className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                            inRoute
                              ? 'bg-[var(--accent-gold)] text-black'
                              : 'bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white'
                          }`}
                        >
                          {inRoute ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>En Ruta</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Waypoint</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
