// AdminAPI.jsx — cliente de /api/admin/* y utilidades compartidas del panel.

const ADMIN_BASE = '/api/admin';

// Error con el status a la vista, para poder distinguir 403 de un fallo real.
class ErrorApi extends Error {
  constructor(status, mensaje, detalle) {
    super(mensaje);
    this.status = status;
    this.detalle = detalle;
  }
}

async function pedir(ruta, opciones = {}) {
  let res;
  try {
    res = await fetch(`${ADMIN_BASE}${ruta}`, {
      credentials: 'same-origin',
      ...opciones,
    });
  } catch {
    throw new ErrorApi(0, 'No se pudo contactar al servidor. Revisa tu conexión.');
  }

  // Access devuelve 302 al login cuando la sesión caduca; fetch lo sigue y
  // acaba entregando HTML en vez de JSON. Ambos casos son "sesión perdida".
  const tipo = res.headers.get('Content-Type') || '';
  if (!tipo.includes('application/json')) {
    if (res.status === 403 || res.status === 401 || res.redirected) {
      throw new ErrorApi(403, 'Sesión expirada, recarga la página');
    }
    throw new ErrorApi(res.status, `Respuesta inesperada del servidor (${res.status})`);
  }

  const cuerpo = await res.json();
  if (!res.ok) {
    if (res.status === 403) throw new ErrorApi(403, 'Sesión expirada, recarga la página');
    throw new ErrorApi(res.status, cuerpo.error || `Error ${res.status}`, cuerpo.detalle);
  }
  return cuerpo;
}

const jsonOpts = (metodo, cuerpo) => ({
  method: metodo,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cuerpo),
});

const AdminAPI = {
  ErrorApi,
  listar: (estado) => pedir(`/articulos${estado ? `?estado=${encodeURIComponent(estado)}` : ''}`),
  obtener: (slug) => pedir(`/articulos/${encodeURIComponent(slug)}`),
  crear: (datos) => pedir('/articulos', jsonOpts('POST', datos)),
  actualizar: (slug, datos) => pedir(`/articulos/${encodeURIComponent(slug)}`, jsonOpts('PUT', datos)),
  borrar: (slug) => pedir(`/articulos/${encodeURIComponent(slug)}`, { method: 'DELETE' }),
  publicar: (slug) => pedir('/publicar', jsonOpts('POST', { slug })),
  revisiones: (slug) => pedir(`/revisiones/${encodeURIComponent(slug)}`),
  revertir: (slug, revisionId) => pedir('/revertir', jsonOpts('POST', { slug, revision_id: revisionId })),
  subirMedia: (archivo, slug) => {
    const fd = new FormData();
    fd.append('archivo', archivo);
    fd.append('slug', slug || 'imagen');
    return pedir('/media', { method: 'POST', body: fd });
  },
};

// --- utilidades compartidas -------------------------------------------------

const LINEAS = ['Productos de Línea', 'Manufactura', 'Industrial'];

const ESTADOS_UI = {
  borrador: { etiqueta: 'Borrador', fondo: '#EEF1F6', texto: 'var(--ng-steel)', borde: '#D8DFE9' },
  revision: { etiqueta: 'Revisión', fondo: '#FFF4DB', texto: '#8A6100', borde: '#F0DCA8' },
  publicado: { etiqueta: 'Publicado', fondo: 'var(--ng-green-50)', texto: 'var(--ng-green-700)', borde: '#C6EBC7' },
};

// Genera un slug a partir del título. Solo se usa al CREAR.
function slugDesdeTitulo(titulo) {
  return String(titulo || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// '2026-07-12' -> '12 jul 2026' (el formato que muestra el sitio público)
function fechaLegible(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  return `${m[3]} ${MESES[Number(m[2]) - 1] || ''} ${m[1]}`;
}

function haceCuanto(iso) {
  if (!iso) return '';
  const seg = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seg < 5) return 'ahora mismo';
  if (seg < 60) return `hace ${seg} s`;
  if (seg < 3600) return `hace ${Math.floor(seg / 60)} min`;
  if (seg < 86400) return `hace ${Math.floor(seg / 3600)} h`;
  return `hace ${Math.floor(seg / 86400)} d`;
}

/**
 * snake_case (API) -> camelCase (componentes públicos).
 * La previsualización usa ArticuloLayout, el MISMO componente del sitio, así
 * que hay que hablarle en su formato o no pinta nada.
 */
function aFormatoSitio(a) {
  if (!a) return null;
  return {
    slug: a.slug,
    titulo: a.titulo,
    seoTitle: a.seo_title,
    metaDescription: a.meta_description,
    linea: a.linea,
    categoria: a.categoria,
    fecha: a.fecha,
    fechaTexto: a.fecha_texto || fechaLegible(a.fecha),
    lectura: a.lectura,
    autor: a.autor,
    portada: a.portada,
    portadaAlt: a.portada_alt,
    portadaPie: a.portada_pie,
    portadaIcono: a.portada_icono,
    portadaTag: a.portada_tag,
    extracto: a.extracto,
    respuestaRapida: a.respuesta_rapida,
    cuerpo: a.cuerpo,
    productosRelacionados: a.productos_relacionados,
    articulosRelacionados: a.articulos_relacionados,
    destacado: a.destacado,
  };
}

// Mismos requisitos que valida la API en /publicar. Se comprueban aquí para
// decir qué falta sin gastar un viaje al servidor.
function faltantesParaPublicar(a) {
  const req = [
    ['titulo', 'Título'],
    ['slug', 'Slug'],
    ['extracto', 'Extracto'],
    ['meta_description', 'Meta description'],
    ['cuerpo', 'Cuerpo'],
  ];
  const faltan = req.filter(([c]) => !a[c] || !String(a[c]).trim()).map(([, n]) => n);
  if (!a.portada && !a.portada_icono) faltan.push('Portada (imagen o icono)');
  return faltan;
}

window.AdminAPI = AdminAPI;
window.NG_LINEAS = LINEAS;
window.NG_ESTADOS_UI = ESTADOS_UI;
window.slugDesdeTitulo = slugDesdeTitulo;
window.fechaLegible = fechaLegible;
window.haceCuanto = haceCuanto;
window.aFormatoSitio = aFormatoSitio;
window.faltantesParaPublicar = faltantesParaPublicar;
