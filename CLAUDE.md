# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A pixel-grade recreation of the Neugreen public marketing site (destination: Zoho Sites), reconstructed from the Brand Guidelines section *"12.1 Sitio web (Zoho Sites)"*. There is no live URL, no Figma, and no production codebase — this is a clickable mock that shows what the site should look like.

All copy is Spanish (`<html lang="es">`). The target deployment is Zoho Sites, so the React-as-prototype approach here is intentional: components are flat JSX files loaded by HTML pages, then later translated to Zoho's editor / static markup.

## Run / build

There is **no build step, no package manager, and no `package.json`**. JSX is compiled in-browser by `@babel/standalone`.

To preview, open any of the HTML files directly in a modern browser, or serve the directory:

```
python3 -m http.server 8000        # then visit http://localhost:8000/index.html
```

There are no tests, no linter, and no CI. Verification is visual — open the page in a browser and check rendering.

## Architecture

### Multi-page React-via-CDN

Each top-level page is its own HTML file at the repo root: `index.html`, `productos.html`, `manufactura.html`, `industrial.html`, `proyectos.html`, `nosotros.html`, `contacto.html`. Plus `index-print.html` (A4 print stylesheet variant of the home page).

Each HTML page:
1. Loads `colors_and_type.css` (single source of truth for design tokens).
2. Loads React 18, ReactDOM, and `@babel/standalone` from unpkg CDN (with SRI hashes — preserve them if you change the URLs).
3. Loads the JSX components it needs as `<script type="text/babel" src="...">`.
4. Defines an inline `<script type="text/babel">` `App()` that composes the page's sections and calls `ReactDOM.createRoot(...).render(...)`.

There is **no router and no shared App shell**. Each page has its own `App()` with its own `handleNav(id)` that maps nav clicks to `window.location.href = '<other>.html'` for cross-page navigation, and `scrollTo` for in-page anchors. When adding a new page, replicate the handler block — every nav target in `Header.jsx` must be routed in every page's `App()`.

### Component registration pattern

Components are not modules. Each `*.jsx` file defines one (or sometimes several) function components and **must end with `window.ComponentName = ComponentName;`** so the inline `<script type="text/babel">` block in each HTML file can reference it as a global. Forgetting this line silently breaks the page.

Because every JSX file shares one global scope, **`useState` is aliased per file** to avoid redeclaration errors when Babel inlines them: e.g. `const { useState: useStateForm } = React;` in `ContactForm.jsx`, `useStateTabs` in `ProductosTabs.jsx`, `useStateForm` in `ContactForm.jsx`. Follow this convention in any new file that imports hooks — pick a unique alias.

### Page → section composition

Each page is a sequence of section components. Roughly, the file naming reflects which page a component belongs to:

- Shared chrome: `Header.jsx`, `Footer.jsx`, `CTAStrip.jsx`
- Home (`index.html`): `Hero`, `Selector`, `ProductLines`, `MaquilaBand`, `TechnicalSolutions`, `Sectores`, `Diferenciadores`, `ProcessSteps`, `CapacidadesPlanta`
- Productos page: `ProductosHero`, `ProductosTabs`, `AsesorBlock`
- Manufactura page: `MaquilaHero`, `MaquilaParaQuien`, `MaquilaProceso`, `MaquilaCasos`, `MaquilaForm`
- Industrial page: `IndustrialHero`, `IndustrialAreas`, `IndustrialForm`
- Proyectos page: `ProyectosHero`, `ProyectosGaleria`, `ProyectosRefNDA`
- Nosotros page: `NosotrosHero`, `NosotrosTimeline`, `NosotrosValores`, `NosotrosOrganigrama`, `NosotrosEquipo`, `Colaboradores`
- Contacto page: `ContactoHero`, `ContactoTabs`, `ContactForm`
- Print variant: `StatsBar`, `Infrastructure` are only in `index-print.html`

When adding a section, also add its `<script type="text/babel" src="X.jsx">` tag to every HTML page that should render it.

### Styling

All visual design lives in **`colors_and_type.css`** — the single source of truth for color, typography, spacing, radius, and shadow tokens. Use CSS variables (e.g. `var(--ng-blue)`, `var(--space-5)`, `var(--r-lg)`, `var(--container-max)`, `var(--section-pad-y)`) rather than hardcoding values. The brand palette includes `--ng-blue`, `--ng-green`, `--ng-navy`, `--ng-ink`, `--ng-steel`, `--ng-line`, `--ng-mist`, `--ng-cloud`, plus blue/green soft tints (`-50`, `-100`, `-700`).

Components style themselves with **inline `style={{...}}` objects** — this is the established convention; there is no Tailwind, no CSS-in-JS library, and no per-component CSS file. Static `:hover` transitions that JSX can't easily express inline (cards, buttons) live in a `<style>` block inside each HTML page (look for `.ng-card-light:hover`, `.ng-card-dark:hover`, `.ng-selector-card:hover`).

Typography: brand face is **Fixel Text** (licensed, in `/fonts`, `@font-face`-loaded by `colors_and_type.css`). Fixel Display was not licensed, so `--font-display` falls back to `Fixel Text` Black/ExtraBold. Manrope (Google Fonts) is the approved web fallback.

### Assets

- `assets/logos/` — Neugreen SVG logos in compact/extended × ink/white/default variants. The hero/header references `neugreen-logo-extended.svg`; the navy footer uses `neugreen-logo-extended-white.svg`.
- `assets/logos/clients/` — client logos for trust rows.
- `assets/photos/` — **not yet present**. Per the README, real planta SLP photos (`IMG_1876`–`IMG_1885`) referenced in the Brand Guidelines were not delivered; placeholder textures with a visible "pedir foto real planta SLP" label stand in for them. Drop real images into `assets/photos/` and replace the placeholder div in `Infrastructure.jsx`.

### Print variant

`index-print.html` is a separate copy of the home page with an `@media print` block sized for A4 portrait: hides the sticky header, forces background colors (`print-color-adjust: exact`), avoids cards/sections splitting across pages, and includes `StatsBar` + `Infrastructure` sections that are not on the live home page. When changing the home layout, mirror structural changes here as well if print fidelity matters.

## Conventions to follow

- **Spanish copy.** All user-facing strings, eyebrows, CTAs, and form labels are Spanish.
- **No build tooling.** Don't introduce npm, Vite, webpack, TypeScript, or a CSS preprocessor unless explicitly asked — the deliverable is Babel-in-browser JSX that translates cleanly to Zoho Sites later.
- **No new dependencies via CDN** without a reason. If you add one, include its SRI `integrity` hash like the existing React/Babel tags.
- **Keep `window.X = X;` at the bottom of every JSX file.**
- **Add new nav targets to every page's `handleNav`** so cross-page links work from any entry point.
- **Use CSS variables from `colors_and_type.css`**, not hex literals, for color and spacing.

## Known gaps (from README)

- Mobile-specific drawer/menu is missing — the header collapses gracelessly under 760 px.
- No cookie banner or legal modals.
- Inner pages beyond the section kits (product detail, blog, technical-proposal PDF view) are not modeled.
