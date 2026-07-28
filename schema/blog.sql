-- schema/blog.sql — esquema del blog Neugreen en D1 (SQLite).
--
-- Los campos anidados (respuesta_rapida, productos_relacionados,
-- articulos_relacionados) van como JSON en columna: siempre se leen y
-- escriben junto con el artículo completo, nunca se consultan por separado.

CREATE TABLE articulos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  linea TEXT NOT NULL,
  categoria TEXT,
  fecha TEXT,                        -- YYYY-MM-DD, admite futuro
  fecha_texto TEXT,                  -- versión legible ("12 jul 2026")
  lectura TEXT,
  autor TEXT DEFAULT 'Equipo Técnico Neugreen',
  portada TEXT,                      -- URL en R2 o null
  portada_alt TEXT,
  portada_pie TEXT,                  -- caption bajo la imagen
  portada_icono TEXT,                -- nombre de icono si no hay foto
  portada_tag TEXT,                  -- etiqueta sobre la portada
  extracto TEXT,
  respuesta_rapida TEXT,             -- JSON: {parrafo, puntos: []}
  cuerpo TEXT,                       -- HTML
  productos_relacionados TEXT,       -- JSON: [{nombre,desc,href,icono}]
  articulos_relacionados TEXT,       -- JSON: [slug, slug, slug]
  destacado INTEGER DEFAULT 0,
  estado TEXT DEFAULT 'borrador',    -- borrador | revision | publicado
  creado_en TEXT,
  actualizado_en TEXT,
  actualizado_por TEXT
);

CREATE INDEX idx_articulos_slug ON articulos(slug);
CREATE INDEX idx_articulos_estado ON articulos(estado);
CREATE INDEX idx_articulos_fecha ON articulos(fecha);

CREATE TABLE revisiones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  articulo_id INTEGER NOT NULL,
  snapshot TEXT NOT NULL,            -- JSON del artículo completo
  editado_por TEXT,
  fecha TEXT,
  FOREIGN KEY (articulo_id) REFERENCES articulos(id)
);

CREATE INDEX idx_revisiones_articulo ON revisiones(articulo_id);
