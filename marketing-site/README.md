# Marketing site UI kit

> Pixel-grade recreation of the Neugreen public website (Zoho Sites destination).

## What this is

A clickable, single-page mock of `www.neugreen.mx` built from the Brand Guidelines and Design System v1. It's a **recreation** — it shows what the production site should look like; it is not the production site.

## Caveat

There was **no live URL, no codebase, and no Figma file** for the public website in the materials delivered. The structure here was reconstructed from the Brand Guidelines section *"12.1 Sitio web (Zoho Sites)"*, which specifies:

> *Hero foto-overlay + 3 CTAs por línea de negocio. Stats bar tras hero. 6 cards de líneas de producto (claro). Sección dark con 3 cards de soluciones técnicas. Sección infraestructura con foto real SLP + 3 puntos. Proceso comercial 4 pasos numerados. CTA strip azul al cierre.*

If the live site exists and differs, replace these components with screen captures from there.

## Run

Open `index.html` in any modern browser. No build step.

## Component map

| File | What it renders |
|---|---|
| `Header.jsx` | Sticky top nav · logo · 5 nav items · phone + CTA |
| `Hero.jsx` | Full-bleed hero · azul overlay · display XL · 2 CTAs · trust row |
| `StatsBar.jsx` | 4-metric row overlapping hero bottom |
| `ProductLines.jsx` | Grid of 6 product-family cards (light) |
| `MaquilaBand.jsx` | Maquila section · feature checklist · bottle row mockup |
| `TechnicalSolutions.jsx` | Navy section · 3 dark technical cards |
| `Infrastructure.jsx` | Split image+text · "operación real" pillar |
| `ProcessSteps.jsx` | 4 numbered commercial steps |
| `ContactForm.jsx` | Interactive technical-quote form (state, validation flag) |
| `CTAStrip.jsx` | Pre-footer azul CTA strip with WhatsApp button |
| `Footer.jsx` | Navy footer · logo + 3 columns + fine print |

## Photos

The infrastructure section and hero use **placeholder textures with a visible "pedir foto real planta SLP" label**. The Brand Guidelines reference real photos `IMG_1876` through `IMG_1885` which were not delivered. Drop them into `assets/photos/` and replace the placeholder div in `Infrastructure.jsx`.

## What's not here (yet)

- **Inner pages** — product detail, blog post, propuesta técnica PDF view. The home is a representative slice; if you need an inner-page kit, ask.
- **Mobile-specific drawer/menu** — the header collapses gracelessly under 760 px. A drawer is needed for production.
- **Cookie banner / legal modals** — not modeled.
