# DESIGN.md — Descubre Valdemoro

## Identity

**Project:** Portal turístico y cultural de Valdemoro (Madrid).
**Voice:** Editorial, directa, con personalidad local. Ni institucional aburrida ni influencer vacía. El tono de una buena revista de viajes que conoce el lugar de verdad.
**Page type:** place (tourism destination portal).
**Site kind:** place/service hybrid (tourist discovery + route planning).

## Dials (antislop)

| Dial | Value | Reason |
|------|-------|--------|
| ENERGY | 3 (Bold) | Estética editorial cinematográfica, alto contraste, impacto visual inmediato para captar turistas |
| RHYTHM | 3 (Asymmetric) | Maquetación de revista: composiciones asimétricas, secciones que varían radicalmente entre sí |
| MOTION | 2 (Balanced) | Transiciones de vista, hover states con intención, una entrada de hero. Sin scroll-jacking ni parallax abusivo |

## Typography

| Role | Font | Weight | Reason |
|------|------|--------|--------|
| Headlines (H1, H2, impacto) | Barlow Condensed | 700, 800 | Condensada de alto impacto, lectura rápida en móvil. Rockstar usa condensadas para títulos cinematográficos. No es Inter, no es Geist, no es un default AI |
| Body, UI, navegación | Plus Jakarta Sans | 400, 500, 600 | Geométrica legible a 16px, personalidad contemporánea sin ser genérica. Contraste claro con la condensada de titulares |

**Scale:** H1 `clamp(2.5rem, 5vw, 4.5rem)`, H2 `clamp(1.75rem, 3.5vw, 3rem)`, H3 `clamp(1.25rem, 2vw, 1.75rem)`, body `1rem/1.6`.

## Color System (Dual Mode, obligatorio)

### Dark Mode — "Atardecer / Cine" (default for first impression)

| Token | Hex | Role | Reason |
|-------|-----|------|--------|
| `--bg` | `#0A0A0E` | Fondo principal | Negro cálido, no puro. Inmersivo para fotografía |
| `--surface` | `#14141C` | Tarjetas, paneles | Separación sutil sin romper la inmersión |
| `--text` | `#F5F5F7` | Texto principal | Blanco cálido. Contraste >15:1 sobre bg |
| `--text-muted` | `#9CA3AF` | Texto secundario | Contraste >4.5:1 sobre bg y surface |
| `--accent` | `#FF5A36` | Acento principal, CTAs | Coral vibrante: atardecer, Mediterráneo, energía. Contraste >4.5:1 sobre bg |
| `--accent-secondary` | `#FFB84D` | Acento secundario, highlights | Dorado cálido: patrimonio, Castilla, sol. Usado con moderación |
| `--border` | `#1E1E2A` | Bordes sutiles | Separación sin ruido visual |

### Light Mode — "Luz de Castilla"

| Token | Hex | Role | Reason |
|-------|-----|------|--------|
| `--bg` | `#F6F4EF` | Fondo principal | Crema cálido, no blanco puro. Evoca la piedra caliza castellana |
| `--surface` | `#FFFFFF` | Tarjetas, paneles | Blanco limpio con borde sutil |
| `--text` | `#111115` | Texto principal | Negro profundo. Contraste >15:1 sobre bg |
| `--text-muted` | `#6B7280` | Texto secundario | Contraste >4.5:1 sobre bg y surface |
| `--accent` | `#D93D1E` | Acento principal, CTAs | Coral oscurecido para mantener contraste en fondo claro |
| `--accent-secondary` | `#C97608` | Acento secundario | Dorado intenso, legible sobre crema |
| `--border` | `#E2DFD7` | Bordes | Cálido, no gris frío |

**Palette count:** 2 core (accent coral + accent gold) + neutrals. Cumple R-29.

## Photography

- **Obligatorio:** fotografías reales de alta resolución (Unsplash/Pexels con licencia libre).
- **Temática:** arquitectura castellana (piedra, ladrillo, arcos), retablos e interiores de iglesias, parques con vegetación mediterránea, tapas y vino, mercados y fiestas populares.
- **Tratamiento:** composición asimétrica, overlays de alto contraste en modo oscuro (gradient-to-black para legibilidad de texto sobre imagen). En modo claro, las fotos se muestran con bordes sutiles sin overlay.
- **Prohibido:** fotografías genéricas de "happy people pointing at things", stock corporativo, imágenes con marcas de agua.
- Cada imagen tiene `alt` descriptivo y `width`/`height` explícitos (R-40, R-39).

## Layout

- **Contenedor:** `max-width: 1440px`, padding lateral `clamp(1rem, 4vw, 6rem)`.
- **Grid:** CSS Grid 12 columnas en desktop, colapso a 1 columna en móvil.
- **Breakpoints:** 390px (móvil), 768px (tablet), 1024px (desktop small), 1440px (desktop).
- **Secciones:** cada sección ocupa al menos una pantalla completa. Composiciones varían (R-05, RHYTHM 3): el hero es fullbleed, el catálogo es grid denso, gastronomía usa layout asimétrico foto+texto.
- **Bordes redondeados:** `0.5rem` para tarjetas, `0.375rem` para botones e inputs. No pill-shaped en todo (R-11).

## Buttons

| Variant | Style | Reason |
|---------|-------|--------|
| Primary | Fondo `--accent`, texto blanco, hover oscurece 10%, press escala 0.97 | Acción principal, un solo estilo primario |
| Secondary | Borde `--accent`, fondo transparente, hover rellena fondo con accent al 10% | Acción secundaria, jerarquía visual clara |
| Ghost | Sin borde, texto `--accent`, hover subraya | Acciones terciarias, links disfrazados |

Todos: `min-height: 44px` (R-03 tap target), `cursor: pointer` (R-39), estados hover/active/focus visibles (R-39).

## Motion

- **Hero entrance:** fade-in + slide-up del titular, una sola vez en carga (`data-enter`).
- **View transitions:** CSS View Transitions API entre vistas de la SPA; fallback a crossfade simple.
- **Hover:** tarjetas suben 2px con `translate`, fotos hacen zoom 1.03 dentro de su contenedor, botones oscurecen y hacen press (scale 0.97).
- **Reduced motion:** todo se desactiva bajo `prefers-reduced-motion: reduce` (R-39).
- **Prohibido:** fade-in en cada sección al scroll, parallax en texto, scroll-jacking, animaciones bounce/floating genéricas (R-19).

## Decisions Log (R-31)

| Decision | Reason |
|----------|--------|
| Barlow Condensed para titulares | Impacto editorial condensado, contraste con body geométrica, referencia cinematográfica sin copiar Rockstar |
| Plus Jakarta Sans para cuerpo | Legibilidad excelente a 16px, personalidad geométrica sin ser un default AI (Inter, Geist) |
| Coral como acento principal | Mediterráneo, atardecer, energía turística. Único frente a los azules genéricos de portales municipales |
| Dorado como secundario | Patrimonio, Castilla, sol. Pareja natural del coral sin saturar la paleta |
| Crema en modo claro (no blanco puro) | Referencia a la piedra caliza de la arquitectura local. Calidez sin perder contraste |
| Modo oscuro como primera impresión | Inmersión cinematográfica para las fotografías del hero. El toggle permite elegir |
| Composición asimétrica | Diferenciación de portales municipales genéricos, que usan grids simétricos repetitivos |
| React + Vite + Tailwind | Stack moderno, deploy simple en Vercel/GitHub Pages, rendimiento excelente |
