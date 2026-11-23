import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, MapPin, Compass, UtensilsCrossed, CalendarClock, Navigation } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, routePlacesCount, isDark, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Compass },
    { id: 'patrimonio', label: 'Patrimonio y Lugares', icon: MapPin },
    { id: 'mapa-radar', label: 'Mapa', icon: Navigation },
    { id: 'gastronomia', label: 'Gastronomía y Ocio', icon: UtensilsCrossed },
    { 
      id: 'planificador', 
      label: 'Mi Ruta', 
      icon: CalendarClock,
      badge: routePlacesCount > 0 ? routePlacesCount : null
    }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--surface-main)]/95 backdrop-blur-md border-b border-[var(--border-main)] shadow-sm py-3' 
          : 'bg-[var(--surface-main)]/85 backdrop-blur-sm border-b border-[var(--border-main)] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Editorial */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)] rounded-sm group"
            aria-label="Ir a la portada de Descubre Valdemoro"
          >
            <div className="w-9 h-9 rounded-sm bg-[var(--accent-main)] flex items-center justify-center text-white font-editorial font-extrabold text-xl tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <span className="block font-editorial font-extrabold text-2xl sm:text-3xl tracking-tight leading-none text-[var(--text-main)]">
                VALDEMORO
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-bold text-[var(--accent-gold)]">
                Portal Turístico Oficial
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegación principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center gap-2 relative ${
                    isActive
                      ? 'text-[var(--accent-main)] bg-[var(--badge-bg)] font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-subtle)]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-xs font-bold rounded-full bg-[var(--accent-main)] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Theme Switcher & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-sm border border-[var(--border-main)] bg-[var(--surface-card)] text-[var(--text-main)] hover:border-[var(--accent-main)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
              aria-label={isDark ? 'Cambiar a modo claro Luz de Castilla' : 'Cambiar a modo oscuro Atardecer'}
              title={isDark ? 'Modo claro (Luz de Castilla)' : 'Modo oscuro (Atardecer)'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[var(--accent-gold)]" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--accent-main)]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-sm border border-[var(--border-main)] bg-[var(--surface-card)] text-[var(--text-main)] hover:border-[var(--accent-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden mt-3 pt-3 pb-4 border-t border-[var(--border-main)] bg-[var(--surface-main)] animate-fade-in"
            id="mobile-menu"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-sm text-base font-semibold transition-colors flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? 'text-white bg-[var(--accent-main)]'
                        : 'text-[var(--text-main)] hover:bg-[var(--surface-subtle)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isActive ? 'bg-white text-[var(--accent-main)]' : 'bg-[var(--accent-main)] text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
