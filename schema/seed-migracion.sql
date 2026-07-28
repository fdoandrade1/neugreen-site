-- schema/seed-migracion.sql
-- GENERADO por scripts/migrate-articulos.js — no editar a mano.
-- Origen: assets/js/articulos-data.js (7 artículos)
-- Generado: 2026-07-28T20:47:23.458Z
--
-- Todos los artículos entran con estado = borrador. La migración no
-- publica nada; publicar es una acción explícita desde el panel.
--
-- Los slugs son UNIQUE: aplicar este archivo dos veces falla en el
-- segundo INSERT. Para reaplicar, vaciar antes la tabla articulos.

-- bioaumentacion-ptar-cuando-aplica
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'bioaumentacion-ptar-cuando-aplica',
  'Bioaumentación en PTAR: cuándo aplica y cómo se mide el resultado',
  'Bioaumentación en PTAR: cuándo aplica | Neugreen México',
  'Criterios para decidir si la bioaumentación resuelve tu planta de tratamiento, qué medir antes de dosificar y cómo documentar el resultado.',
  'Industrial',
  'Tratamiento de agua',
  '2026-07-12',
  '12 jul 2026',
  '9 min de lectura',
  'Equipo Técnico Neugreen',
  'assets/images/BODEGA_NEUGREEN_COMPLETA_FINAL.webp',
  'Planta y bodega Neugreen en San Luis Potosí',
  'Planta Neugreen · San Luis Potosí.',
  'agua',
  'Tratamiento de agua',
  'Cuándo el problema de una PTAR es biológico y cuándo no. Criterios de diagnóstico, parámetros de control y forma de documentar el resultado.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Bacterias para trampas de grasa","desc":"Bioaumentación dirigida para PTAR, trampas y cárcamos.","href":"/industrial.html?area=ptar","icono":"gota"},{"nombre":"Desinfectantes industriales","desc":"Alta concentración para dosificación automatizada en proceso.","href":"/productos.html?tab=desinfeccion","icono":"escudo"},{"nombre":"Eliminadores de olores","desc":"Neutralización enzimática en cárcamos y líneas de drenaje.","href":"/productos.html?tab=enzimatica","icono":"agua"}]',
  '["trampa-grasa-protocolo-recuperacion","legionella-torres-normativa-muestreo","dosificacion-manual-vs-automatica"]',
  1,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);

-- legionella-torres-normativa-muestreo
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'legionella-torres-normativa-muestreo',
  'Control de Legionella en torres: normativa aplicable y protocolo de muestreo',
  'Control de Legionella en torres de enfriamiento | Neugreen México',
  'Qué normativa aplica al control de Legionella en torres de enfriamiento, con qué frecuencia muestrear y qué registro se solicita en auditoría.',
  'Industrial',
  'Torres de enfriamiento',
  '2026-07-04',
  '04 jul 2026',
  '7 min de lectura',
  'Equipo Técnico Neugreen',
  NULL,
  NULL,
  NULL,
  'agua',
  'Torres de enfriamiento',
  'Frecuencia de muestreo, límites de referencia y el registro que se solicita en auditoría. Con el protocolo de choque y sostenimiento.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Tratamiento de torres","desc":"Biocidas e inhibidores para circuitos de enfriamiento.","href":"/industrial.html?area=torres","icono":"escudo"},{"nombre":"Dosificación automática","desc":"Equipo de dosificación para control continuo.","href":"/industrial.html?area=dosificacion","icono":"medidor"}]',
  '["bioaumentacion-ptar-cuando-aplica","trampa-grasa-protocolo-recuperacion","dosificacion-manual-vs-automatica"]',
  0,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);

-- enzimatico-o-cloro-cocina-industrial
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'enzimatico-o-cloro-cocina-industrial',
  'Enzimático o cloro en cocina industrial: criterio de selección por biocarga',
  'Enzimático o cloro en cocina industrial | Neugreen México',
  'Tabla de decisión por tipo de suelo, temperatura y material de superficie para elegir entre limpieza enzimática y desinfección clorada.',
  'Productos de Línea',
  'Limpieza enzimática',
  '2026-06-27',
  '27 jun 2026',
  '6 min de lectura',
  'Equipo Técnico Neugreen',
  NULL,
  NULL,
  NULL,
  'matraz',
  'Limpieza enzimática',
  'Criterio de decisión por tipo de suelo, temperatura y material de superficie, y por qué el cloro sale más caro en acero inoxidable.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Línea enzimática","desc":"Degradación de materia orgánica en cocina y drenaje.","href":"/productos.html?tab=enzimatica","icono":"matraz"},{"nombre":"Desinfección","desc":"Sanitizantes de superficie para contacto con alimentos.","href":"/productos.html?tab=desinfeccion","icono":"escudo"}]',
  '["dosificacion-manual-vs-automatica","bioaumentacion-ptar-cuando-aplica","moq-lead-time-escalamiento-maquila"]',
  0,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);

-- moq-lead-time-escalamiento-maquila
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'moq-lead-time-escalamiento-maquila',
  'MOQ, lead time y escalamiento: qué definir antes de tu primera maquila',
  'MOQ, lead time y escalamiento en maquila | Neugreen México',
  'Las variables que mueven el costo unitario de una marca privada: mínimo de orden, tiempos de entrega, envase, etiqueta y tamaño de corrida.',
  'Manufactura',
  'Marca privada',
  '2026-06-21',
  '21 jun 2026',
  '8 min de lectura',
  'Equipo Técnico Neugreen',
  'assets/images/Imagen_Manufactura_Neugreen.webp',
  'Línea de envasado Neugreen en planta San Luis Potosí',
  'Línea de envasado · planta Neugreen SLP.',
  'planta',
  'Planta SLP',
  'Las variables que mueven el costo unitario de una marca privada, desde el mínimo de orden hasta el tamaño de corrida.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Manufactura y marca privada","desc":"Formulación, envasado y etiquetado en planta propia.","href":"/manufactura.html","icono":"planta"},{"nombre":"Solicitar propuesta","desc":"Cotización de maquila con tu volumen y presentación.","href":"/contacto.html?tab=manufactura","icono":"etiqueta"}]',
  '["etiquetado-nom-189-checklist","enzimatico-o-cloro-cocina-industrial","bioaumentacion-ptar-cuando-aplica"]',
  0,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);

-- trampa-grasa-protocolo-recuperacion
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'trampa-grasa-protocolo-recuperacion',
  'Trampa de grasa saturada: protocolo de recuperación en tres fases',
  'Trampa de grasa saturada: protocolo de recuperación | Neugreen México',
  'Choque, adaptación y sostenimiento con bacterias dirigidas para recuperar una trampa de grasa saturada. Qué medir cada semana y cuándo ajustar la dosis.',
  'Industrial',
  'Trampa de grasa',
  '2026-06-13',
  '13 jun 2026',
  '5 min de lectura',
  'Equipo Técnico Neugreen',
  NULL,
  NULL,
  NULL,
  'trampa',
  'Trampa de grasa',
  'Choque, adaptación y sostenimiento con bacterias dirigidas. Qué medir cada semana y cuándo ajustar la dosis.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Bacterias para trampas de grasa","desc":"Bioaumentación dirigida para trampas, cárcamos y PTAR.","href":"/industrial.html?area=ptar","icono":"gota"},{"nombre":"Eliminadores de olores","desc":"Neutralización enzimática en líneas de drenaje.","href":"/productos.html?tab=enzimatica","icono":"agua"}]',
  '["bioaumentacion-ptar-cuando-aplica","legionella-torres-normativa-muestreo","enzimatico-o-cloro-cocina-industrial"]',
  0,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);

-- etiquetado-nom-189-checklist
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'etiquetado-nom-189-checklist',
  'Etiquetado NOM-189: puntos a verificar antes de mandar a imprimir',
  'Etiquetado NOM-189: checklist previo a imprenta | Neugreen México',
  'Leyendas obligatorias, pictogramas y datos del responsable que debe llevar la etiqueta de un producto de limpieza antes de mandarla a imprimir.',
  'Manufactura',
  'Etiquetado',
  '2026-06-06',
  '06 jun 2026',
  '6 min de lectura',
  'Equipo Técnico Neugreen',
  NULL,
  NULL,
  NULL,
  'etiqueta',
  'Etiquetado',
  'Leyendas obligatorias, pictogramas y datos del responsable. El error de forma que obliga a reimprimir un tiraje completo.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Manufactura y marca privada","desc":"Diseño de etiqueta y cumplimiento normativo incluidos.","href":"/manufactura.html","icono":"etiqueta"}]',
  '["moq-lead-time-escalamiento-maquila","enzimatico-o-cloro-cocina-industrial","dosificacion-manual-vs-automatica"]',
  0,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);

-- dosificacion-manual-vs-automatica
INSERT INTO articulos (
  slug, titulo, seo_title, meta_description, linea, categoria, fecha, fecha_texto, lectura, autor, portada, portada_alt, portada_pie, portada_icono, portada_tag, extracto, respuesta_rapida, cuerpo, productos_relacionados, articulos_relacionados, destacado, estado, creado_en, actualizado_en, actualizado_por
) VALUES (
  'dosificacion-manual-vs-automatica',
  'Dosificación manual vs. automática: dónde se pierde producto por turno',
  'Dosificación manual vs. automática | Neugreen México',
  'Dónde se pierde químico en una operación de limpieza por turno y qué se necesita para justificar la inversión en equipo de dosificación.',
  'Productos de Línea',
  'Dosificación',
  '2026-05-30',
  '30 may 2026',
  '7 min de lectura',
  'Equipo Técnico Neugreen',
  NULL,
  NULL,
  NULL,
  'medidor',
  'Dosificación',
  'Dónde se va el producto en una operación de housekeeping y qué hace falta para justificar la inversión en equipo de dosificación.',
  '{"parrafo":"Resumen ejecutivo en dos o tres frases: qué resuelve el artículo, cuándo aplica y cuándo no. Se reemplaza con el contenido real.","puntos":["<strong>Cuándo aplica:</strong> condición principal de uso.","<strong>Qué medir:</strong> parámetro de control y su frecuencia.","<strong>No aplica si:</strong> excepción o contraindicación."]}',
  '<h2>Contexto</h2>
<p>Texto de andamiaje. Este bloque se reemplaza con el contenido editorial real. Sirve para verificar la jerarquía tipográfica, el ancho de lectura de 720 px y el espaciado entre elementos.</p>
<p>Un segundo párrafo permite comprobar el interlineado y el ritmo vertical del cuerpo, además del tratamiento de <strong>texto en negritas</strong> dentro de la línea.</p>
<h3>Subsección</h3>
<p>Los encabezados de tercer nivel marcan pasos o criterios dentro de una sección mayor.</p>
<ul>
<li>Primer punto de una lista con viñeta azul.</li>
<li>Segundo punto, para ver el espaciado entre elementos.</li>
<li>Tercer punto, con texto suficientemente largo como para pasar a una segunda línea y confirmar la sangría.</li>
</ul>
<h2>Parámetros</h2>
<p>Las tablas se usan para comparativos y valores de referencia:</p>
<table>
<thead><tr><th>Parámetro</th><th>Referencia</th><th>Unidad</th></tr></thead>
<tbody>
<tr><td>Valor de ejemplo A</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo B</td><td>—</td><td>—</td></tr>
<tr><td>Valor de ejemplo C</td><td>—</td><td>—</td></tr>
</tbody>
</table>
<p class="ng-tabla-nota">Pie de tabla: origen del dato, método y norma de referencia.</p>
<blockquote><p>Cita destacada para una idea central del artículo.</p><footer>Atribución · área técnica</footer></blockquote>
<h2>Cierre</h2>
<p>Párrafo de cierre con la conclusión práctica y el siguiente paso para el lector.</p>',
  '[{"nombre":"Equipo de dosificación","desc":"Dosificadores para lavandería, cocina y limpieza general.","href":"/industrial.html?area=dosificacion","icono":"medidor"},{"nombre":"Productos concentrados","desc":"Formulaciones de alta dilución para dosificación.","href":"/productos.html?tab=convencional","icono":"matraz"}]',
  '["enzimatico-o-cloro-cocina-industrial","legionella-torres-normativa-muestreo","bioaumentacion-ptar-cuando-aplica"]',
  0,
  'borrador',
  '2026-07-28T20:47:23.458Z',
  '2026-07-28T20:47:23.458Z',
  'migración-inicial'
);
