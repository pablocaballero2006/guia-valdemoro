import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Imprescindibles from './components/Imprescindibles';
import RutasRecomendadas from './components/RutasRecomendadas';
import CatalogoPatrimonio from './components/CatalogoPatrimonio';
import GastronomiaOcio from './components/GastronomiaOcio';
import PlanificadorRuta from './components/PlanificadorRuta';
import MapaRadar from './components/MapaRadar';
import ModalDetalle from './components/ModalDetalle';
import Footer from './components/Footer';
import { PLACES, getFallbackImage } from './data/valdemoroData';
import { ArrowRight, Compass, CalendarCheck, Navigation } from 'lucide-react';

export default function App() {
  // Theme state (Dark Mode by default per Rockstar / Cine aesthetic)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('valdemoro_theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode for cinema aesthetic
  });

  // Current view state: 'inicio' | 'patrimonio' | 'mapa-radar' | 'gastronomia' | 'planificador'
  const [currentView, setCurrentView] = useState('inicio');

  // Travel profile filter state
  const [travelProfile, setTravelProfile] = useState(() => {
    return localStorage.getItem('valdemoro_profile') || null;
  });

  // Visited places state for "En Ruta" mode
  const [visitedPlaces, setVisitedPlaces] = useState(() => {
    try {
      const saved = localStorage.getItem('valdemoro_visited');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Route places state with localStorage persistence
  const [routePlaces, setRoutePlaces] = useState(() => {
    try {
      const saved = localStorage.getItem('valdemoro_route');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal detail state
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('valdemoro_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('valdemoro_theme', 'light');
    }
  }, [isDark]);

  // Persist travelProfile
  useEffect(() => {
    if (travelProfile) {
      localStorage.setItem('valdemoro_profile', travelProfile);
    } else {
      localStorage.removeItem('valdemoro_profile');
    }
  }, [travelProfile]);

  // Persist visitedPlaces
  useEffect(() => {
    localStorage.setItem('valdemoro_visited', JSON.stringify(visitedPlaces));
  }, [visitedPlaces]);

  // Persist routePlaces
  useEffect(() => {
    localStorage.setItem('valdemoro_route', JSON.stringify(routePlaces));
  }, [routePlaces]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleToggleRoute = (place) => {
    setRoutePlaces(prev => {
      const exists = prev.some(p => p.id === place.id);
      if (exists) {
        return prev.filter(p => p.id !== place.id);
      } else {
        return [...prev, place];
      }
    });
  };

  const handleToggleVisited = (placeId) => {
    setVisitedPlaces(prev => {
      if (prev.includes(placeId)) {
        return prev.filter(id => id !== placeId);
      } else {
        return [...prev, placeId];
      }
    });
  };

  const handleRemoveFromRoute = (placeId) => {
    setRoutePlaces(prev => prev.filter(p => p.id !== placeId));
  };

  const handleMovePlace = (index, direction) => {
    setRoutePlaces(prev => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[newIndex];
      copy[newIndex] = temp;
      return copy;
    });
  };

  const handleClearRoute = () => {
    if (window.confirm('¿Deseas vaciar todas las paradas de tu ruta personalizada?')) {
      setRoutePlaces([]);
      setVisitedPlaces([]);
    }
  };

  const handleLoadPresetRoute = () => {
    const presetIds = ['iglesia-asuncion', 'plaza-constitucion', 'bolitas-del-airon'];
    const presetPlaces = PLACES.filter(p => presetIds.includes(p.id));
    setRoutePlaces(presetPlaces);
  };

  const isPlaceInRoute = (placeId) => {
    return routePlaces.some(p => p.id === placeId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        routePlacesCount={routePlaces.length}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        
        {/* VIEW 1: INICIO */}
        {currentView === 'inicio' && (
          <div className="animate-fade-in">
            <Hero
              onExploreClick={() => {
                setCurrentView('patrimonio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPlanRouteClick={() => {
                setCurrentView('planificador');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToRadar={() => {
                setCurrentView('mapa-radar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentProfile={travelProfile}
              onSelectProfile={setTravelProfile}
            />

            <Imprescindibles
              onSelectPlace={(place) => setSelectedPlace(place)}
              onToggleRoute={handleToggleRoute}
              isPlaceInRoute={isPlaceInRoute}
              travelProfile={travelProfile}
            />

            <RutasRecomendadas
              onLoadCustomPreset={(places) => setRoutePlaces(places)}
              onNavigateToPlanner={() => {
                setCurrentView('planificador');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Editorial Discovery Callout Section */}
            <section className="py-16 sm:py-20 bg-[var(--surface-subtle)] border-b border-[var(--border-main)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] block mb-2">
                      Experiencia Completa
                    </span>
                    <h2 className="font-editorial font-extrabold text-3xl sm:text-5xl uppercase leading-tight text-[var(--text-main)] mb-4">
                      Patrimonio, Tapas y Más de 40 Hectáreas de Aire Puro
                    </h2>
                    <p className="font-body text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                      Desde el lienzo original de Goya en la Asunción hasta una comida con estrella Michelin en Chirón, el ascenso a Tercera FEB del CB Villa de Valdemoro en el Pabellón Jesús España o las smash burgers de La Osa, Valdemoro ofrece una jornada memorable a menos de media hora de Madrid.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setCurrentView('patrimonio');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-3 rounded-sm bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[44px]"
                      >
                        <Compass className="w-4 h-4" />
                        <span>Ver catálogo completo</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('mapa-radar');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-3 rounded-sm bg-black/70 hover:bg-black border border-[var(--accent-gold)] text-[var(--accent-gold)] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[44px]"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Mapa</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('gastronomia');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-3 rounded-sm border border-[var(--border-strong)] bg-[var(--surface-main)] hover:bg-[var(--surface-subtle)] text-[var(--text-main)] font-semibold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
                      >
                        <span>Descubrir Gastronomía</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[var(--border-main)] shadow-md">
                    <img
                      src="/images/valdemoro/plaza-constitucion.jpg"
                      alt="Fotografía real de la Plaza de la Constitución de Valdemoro"
                      className="w-full h-full object-cover"
                      width="800"
                      height="600"
                      loading="lazy"
                      onError={(e) => { 
                        e.currentTarget.src = getFallbackImage('Plaza de la Constitucion'); 
                        e.currentTarget.onerror = null; 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                      <div>
                        <span className="text-[11px] text-[var(--accent-gold)] font-bold uppercase tracking-wider block">
                          Soportales Castellanos
                        </span>
                        <span className="text-white font-editorial font-bold text-2xl uppercase">
                          Plaza de la Constitución y El Pósito
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PATRIMONIO Y CULTURA */}
        {currentView === 'patrimonio' && (
          <div className="animate-fade-in">
            <CatalogoPatrimonio
              onSelectPlace={(place) => setSelectedPlace(place)}
              onToggleRoute={handleToggleRoute}
              isPlaceInRoute={isPlaceInRoute}
              travelProfile={travelProfile}
            />
          </div>
        )}

        {/* VIEW 3: MAPA RADAR ESTILO GTA VI */}
        {currentView === 'mapa-radar' && (
          <div className="animate-fade-in">
            <MapaRadar
              routePlaces={routePlaces}
              onToggleRoute={handleToggleRoute}
              isPlaceInRoute={isPlaceInRoute}
              onSelectPlace={(place) => setSelectedPlace(place)}
              onLoadCustomPreset={(places) => setRoutePlaces(places)}
              onClearRoute={handleClearRoute}
            />
          </div>
        )}

        {/* VIEW 4: GASTRONOMÍA Y OCIO */}
        {currentView === 'gastronomia' && (
          <div className="animate-fade-in">
            <GastronomiaOcio />
          </div>
        )}

        {/* VIEW 5: PLANIFICA TU VISITA */}
        {currentView === 'planificador' && (
          <div className="animate-fade-in">
            <PlanificadorRuta
              routePlaces={routePlaces}
              visitedPlaces={visitedPlaces}
              onToggleVisited={handleToggleVisited}
              onRemoveFromRoute={handleRemoveFromRoute}
              onMovePlace={handleMovePlace}
              onClearRoute={handleClearRoute}
              onLoadPresetRoute={handleLoadPresetRoute}
              onSelectPlace={(place) => setSelectedPlace(place)}
              onNavigateToRadar={() => {
                setCurrentView('mapa-radar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

      </main>

      {/* Modal Drawer de Detalle */}
      {selectedPlace && (
        <ModalDetalle
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onToggleRoute={handleToggleRoute}
          isPlaceInRoute={isPlaceInRoute}
        />
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
