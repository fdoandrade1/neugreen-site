// _lib/sanitizar.js — saneamiento del HTML editorial antes de guardarlo.
//
// Se usa HTMLRewriter (el parser del runtime de Cloudflare), NO expresiones
// regulares: sanear HTML con regex es inseguro por definición — cualquier
// variante de codificación, atributo partido en varias líneas o etiqueta mal
// cerrada evade el patrón. HTMLRewriter parsea de verdad.
//
// Política: lista blanca. Todo lo que no esté explícitamente permitido se
// elimina, así que un vector nuevo no entra por omisión.

const ETIQUETAS_PERMITIDAS = new Set([
  'h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'img',
]);

// Estas se borran CON su contenido: el texto de un <script> no debe sobrevivir.
// El resto de etiquetas no permitidas se desenvuelven conservando el texto.
const ETIQUETAS_A_VACIAR = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template',
  'svg', 'math', 'form', 'input', 'button', 'select', 'textarea',
  'link', 'meta', 'base', 'applet', 'frame', 'frameset',
]);

// Atributos permitidos por etiqueta. Cualquier otro (incluidos todos los
// on*: onclick, onerror, onload…) se elimina por no estar en la lista.
const ATRIBUTOS_PERMITIDOS = {
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height']),
  // `class` solo con valores del sistema de diseño, para no perder el pie
  // de tabla que ya usa el contenido existente.
  p: new Set(['class']),
  th: new Set(['scope']),
  td: new Set(['colspan', 'rowspan']),
};

const CLASES_PERMITIDAS = new Set(['ng-tabla-nota']);

function urlSegura(valor) {
  const v = String(valor || '').trim();
  // Bloquea javascript:, data:, vbscript: y variantes con espacios/mayúsculas.
  if (/^[a-z0-9.+-]*\s*:/i.test(v)) {
    return /^https?:\/\//i.test(v) ? v : null;
  }
  // Relativa: solo desde la raíz del sitio.
  if (v.startsWith('/')) return v;
  return null;
}

function imagenSegura(valor, urlPublicaR2) {
  const v = urlSegura(valor);
  if (!v) return null;
  if (v.startsWith('/')) return v;                       // /assets/... del propio sitio
  if (urlPublicaR2 && v.startsWith(urlPublicaR2)) return v; // bucket MEDIA
  if (/^https:\/\/([a-z0-9-]+\.)*neugreen\.mx\//i.test(v)) return v;
  return null;
}

/**
 * Sanea HTML editorial dejando solo etiquetas y atributos de la lista blanca.
 * @param {string} html
 * @param {string} [urlPublicaR2]  origen permitido para <img src>
 * @returns {Promise<string>}
 */
export async function sanearHtml(html, urlPublicaR2) {
  if (!html) return '';

  const rewriter = new HTMLRewriter().on('*', {
    element(el) {
      const etiqueta = el.tagName.toLowerCase();

      if (ETIQUETAS_A_VACIAR.has(etiqueta)) { el.remove(); return; }
      if (!ETIQUETAS_PERMITIDAS.has(etiqueta)) { el.removeAndKeepContent(); return; }

      const permitidos = ATRIBUTOS_PERMITIDOS[etiqueta] || new Set();

      // Copiar antes de mutar: el iterador no tolera cambios en vuelo.
      for (const [nombre, valor] of [...el.attributes]) {
        const attr = nombre.toLowerCase();

        if (!permitidos.has(attr)) { el.removeAttribute(nombre); continue; }

        if (etiqueta === 'a' && attr === 'href') {
          const limpio = urlSegura(valor);
          if (limpio) el.setAttribute('href', limpio);
          else el.removeAttribute(nombre);
        } else if (etiqueta === 'img' && attr === 'src') {
          const limpio = imagenSegura(valor, urlPublicaR2);
          if (limpio) el.setAttribute('src', limpio);
          else el.removeAttribute(nombre);
        } else if (attr === 'class') {
          const clases = String(valor).split(/\s+/).filter((c) => CLASES_PERMITIDAS.has(c));
          if (clases.length) el.setAttribute('class', clases.join(' '));
          else el.removeAttribute(nombre);
        } else if (attr === 'target') {
          // Solo _blank tiene sentido aquí; cualquier otro valor se descarta.
          if (String(valor) === '_blank') el.setAttribute('target', '_blank');
          else el.removeAttribute(nombre);
        } else if (attr === 'width' || attr === 'height' || attr === 'colspan' || attr === 'rowspan') {
          if (/^\d{1,5}$/.test(String(valor))) el.setAttribute(attr, String(valor));
          else el.removeAttribute(nombre);
        }
      }

      // Un target="_blank" sin rel deja abierta la referencia al opener.
      if (etiqueta === 'a' && el.getAttribute('target') === '_blank') {
        el.setAttribute('rel', 'noopener noreferrer');
      }
      // <img> sin src utilizable no aporta nada.
      if (etiqueta === 'img' && !el.getAttribute('src')) el.remove();
    },

    comments(c) {
      // Los comentarios condicionales han servido de vector; fuera todos.
      c.remove();
    },
  });

  return await rewriter.transform(new Response(html)).text();
}
