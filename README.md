# Neugreen México Site

Sitio corporativo B2B de Neugreen México creado con React, Vite y Tailwind CSS, listo para publicar en Netlify.

## Requisitos

- Node.js 20 o superior
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

El sitio compilado queda en `dist/`.

## Preview local del build

```bash
npm run preview
```

## Deploy en Netlify

1. Sube este proyecto a GitHub con el nombre `neugreen-site`.
2. En Netlify, crea un nuevo sitio conectado al repositorio.
3. Netlify leerá `netlify.toml` automáticamente:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Publica el sitio y conecta el dominio `www.neugreen.mx` desde la configuración de dominios.

## Imágenes reemplazables

Las imágenes placeholder están en:

- `src/assets/bodega-neugreen.jpg`
- `src/assets/laboratorio-neugreen.jpg`
- `src/assets/productos-neugreen.jpg`

Puedes reemplazarlas por fotografías reales usando los mismos nombres para no tocar el código.
