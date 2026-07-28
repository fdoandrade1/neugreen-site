// AdminEditorTexto.jsx — Etapa A: editor Markdown con vista previa.
//
// Markdown en vez de WYSIWYG a propósito: contenteditable sin librería
// acumula errores difíciles (pegar desde Word, listas anidadas, undo).
// Esto cubre el 100% de las etiquetas que la API acepta con poco código.
//
// El cuerpo se guarda en HTML (es lo que espera la tabla y el sitio), así que
// se convierte en ambos sentidos: Markdown -> HTML al guardar, HTML ->
// Markdown al abrir un artículo existente.

const { useState: useStateTx, useRef: useRefTx, useMemo: useMemoTx } = React;

// Escapa solo & y < — deliberadamente NO '>'. El escape corre antes de
// detectar bloques, y convertir '>' en '&gt;' destruiría el marcador de cita
// de Markdown. Dejarlo crudo es seguro: sin '<' no se puede formar una
// etiqueta, y un '>' suelto es texto válido en HTML.
function escaparHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

// --- inline: negritas, cursivas, enlaces, imágenes --------------------------
function inline(txt) {
  return txt
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');
}

/**
 * Markdown -> HTML, limitado a las etiquetas que la API acepta:
 * h2 h3 p ul ol li strong em a table thead tbody tr th td blockquote img
 * El texto se escapa primero, así que el HTML crudo que alguien pegue queda
 * neutralizado antes de llegar al servidor (que igual lo sanea).
 */
function markdownAHtml(md) {
  const lineas = escaparHtml(md || '').replace(/\r\n/g, '\n').split('\n');
  const salida = [];
  let i = 0;

  const esTabla = (n) => /^\s*\|.*\|\s*$/.test(lineas[n] || '') && /^\s*\|[\s:|-]+\|\s*$/.test(lineas[n + 1] || '');
  const celdas = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

  while (i < lineas.length) {
    const l = lineas[i];

    if (!l.trim()) { i++; continue; }

    if (/^###\s+/.test(l)) { salida.push(`<h3>${inline(l.replace(/^###\s+/, ''))}</h3>`); i++; continue; }
    if (/^##\s+/.test(l)) { salida.push(`<h2>${inline(l.replace(/^##\s+/, ''))}</h2>`); i++; continue; }

    if (esTabla(i)) {
      const enc = celdas(lineas[i]);
      i += 2;
      const filas = [];
      while (i < lineas.length && /^\s*\|.*\|\s*$/.test(lineas[i])) { filas.push(celdas(lineas[i])); i++; }
      salida.push(
        '<table>\n<thead><tr>' + enc.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead>\n<tbody>\n' +
        filas.map((f) => '<tr>' + f.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('\n') +
        '\n</tbody>\n</table>',
      );
      continue;
    }

    if (/^\s*>\s?/.test(l)) {
      const partes = [];
      while (i < lineas.length && /^\s*>\s?/.test(lineas[i])) { partes.push(lineas[i].replace(/^\s*>\s?/, '')); i++; }
      salida.push(`<blockquote><p>${inline(partes.join(' '))}</p></blockquote>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(l)) {
      const items = [];
      while (i < lineas.length && /^\s*[-*]\s+/.test(lineas[i])) { items.push(inline(lineas[i].replace(/^\s*[-*]\s+/, ''))); i++; }
      salida.push('<ul>\n' + items.map((t) => `<li>${t}</li>`).join('\n') + '\n</ul>');
      continue;
    }

    if (/^\s*\d+\.\s+/.test(l)) {
      const items = [];
      while (i < lineas.length && /^\s*\d+\.\s+/.test(lineas[i])) { items.push(inline(lineas[i].replace(/^\s*\d+\.\s+/, ''))); i++; }
      salida.push('<ol>\n' + items.map((t) => `<li>${t}</li>`).join('\n') + '\n</ol>');
      continue;
    }

    // Párrafo: líneas consecutivas hasta un blanco o el inicio de otro bloque.
    const parr = [];
    while (
      i < lineas.length && lineas[i].trim() &&
      !/^(#{2,3}\s|\s*[-*]\s|\s*\d+\.\s|\s*>)/.test(lineas[i]) && !esTabla(i)
    ) { parr.push(lineas[i].trim()); i++; }
    if (parr.length) salida.push(`<p>${inline(parr.join(' '))}</p>`);
  }

  return salida.join('\n');
}

/**
 * HTML -> Markdown. Solo tiene que entender el subconjunto que genera la
 * función de arriba y que trae el contenido sembrado; no es un conversor
 * general. Usa el parser del navegador, no regex.
 */
function htmlAMarkdown(html) {
  if (!html) return '';
  const cont = document.createElement('div');
  cont.innerHTML = html;

  const enLinea = (nodo) => {
    let out = '';
    nodo.childNodes.forEach((n) => {
      if (n.nodeType === 3) { out += n.textContent; return; }
      const t = n.tagName ? n.tagName.toLowerCase() : '';
      if (t === 'strong' || t === 'b') out += `**${enLinea(n)}**`;
      else if (t === 'em' || t === 'i') out += `*${enLinea(n)}*`;
      else if (t === 'a') out += `[${enLinea(n)}](${n.getAttribute('href') || ''})`;
      else if (t === 'img') out += `![${n.getAttribute('alt') || ''}](${n.getAttribute('src') || ''})`;
      else if (t === 'br') out += '\n';
      else out += enLinea(n);
    });
    return out;
  };

  const bloques = [];
  cont.childNodes.forEach((n) => {
    if (n.nodeType === 3) {
      if (n.textContent.trim()) bloques.push(n.textContent.trim());
      return;
    }
    const t = n.tagName ? n.tagName.toLowerCase() : '';
    if (t === 'h2') bloques.push(`## ${enLinea(n)}`);
    else if (t === 'h3') bloques.push(`### ${enLinea(n)}`);
    else if (t === 'p') bloques.push(enLinea(n).trim());
    else if (t === 'ul') bloques.push([...n.querySelectorAll(':scope > li')].map((li) => `- ${enLinea(li)}`).join('\n'));
    else if (t === 'ol') bloques.push([...n.querySelectorAll(':scope > li')].map((li, k) => `${k + 1}. ${enLinea(li)}`).join('\n'));
    else if (t === 'blockquote') bloques.push([...n.children].map((p) => `> ${enLinea(p)}`).join('\n') || `> ${enLinea(n)}`);
    else if (t === 'table') {
      const filas = [...n.querySelectorAll('tr')];
      if (!filas.length) return;
      const salida = [];
      filas.forEach((fila, idx) => {
        const cs = [...fila.children].map((c) => enLinea(c).trim());
        salida.push(`| ${cs.join(' | ')} |`);
        if (idx === 0) salida.push(`|${cs.map(() => '---').join('|')}|`);
      });
      bloques.push(salida.join('\n'));
    } else {
      const txt = enLinea(n).trim();
      if (txt) bloques.push(txt);
    }
  });

  return bloques.filter(Boolean).join('\n\n');
}

// --- componente -------------------------------------------------------------

const BOTONES = [
  { etiqueta: 'H2', titulo: 'Encabezado 2', prefijo: '## ', bloque: true },
  { etiqueta: 'H3', titulo: 'Encabezado 3', prefijo: '### ', bloque: true },
  { etiqueta: 'B', titulo: 'Negrita', envuelve: '**', estilo: { fontWeight: 800 } },
  { etiqueta: 'i', titulo: 'Cursiva', envuelve: '*', estilo: { fontStyle: 'italic' } },
  { etiqueta: '• Lista', titulo: 'Lista con viñetas', prefijo: '- ', bloque: true },
  { etiqueta: '1. Lista', titulo: 'Lista numerada', prefijo: '1. ', bloque: true },
  { etiqueta: '❝', titulo: 'Cita', prefijo: '> ', bloque: true },
  { etiqueta: 'Enlace', titulo: 'Enlace', plantilla: '[texto](https://)' },
  { etiqueta: 'Tabla', titulo: 'Tabla', plantilla: '| Parámetro | Valor |\n|---|---|\n| Ejemplo | — |' },
];

function AdminEditorTexto({ valor, onChange }) {
  const [vista, setVista] = useStateTx('escribir');
  const areaRef = useRefTx(null);

  const html = useMemoTx(() => markdownAHtml(valor), [valor]);

  const aplicar = (b) => {
    const area = areaRef.current;
    if (!area) return;
    const ini = area.selectionStart;
    const fin = area.selectionEnd;
    const texto = valor || '';
    const sel = texto.slice(ini, fin);
    let nuevo;
    let cursor;

    if (b.plantilla) {
      nuevo = texto.slice(0, ini) + b.plantilla + texto.slice(fin);
      cursor = ini + b.plantilla.length;
    } else if (b.envuelve) {
      nuevo = texto.slice(0, ini) + b.envuelve + (sel || 'texto') + b.envuelve + texto.slice(fin);
      cursor = ini + b.envuelve.length + (sel || 'texto').length + b.envuelve.length;
    } else {
      // Bloque: se aplica al inicio de cada línea seleccionada.
      const arranque = texto.lastIndexOf('\n', ini - 1) + 1;
      const trozo = texto.slice(arranque, fin) || '';
      const conPrefijo = trozo.split('\n').map((l) => b.prefijo + l).join('\n');
      nuevo = texto.slice(0, arranque) + conPrefijo + texto.slice(fin);
      cursor = arranque + conPrefijo.length;
    }

    onChange(nuevo);
    requestAnimationFrame(() => {
      area.focus();
      area.setSelectionRange(cursor, cursor);
    });
  };

  const tab = (id, txt) => (
    <button type="button" onClick={() => setVista(id)} style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
      textTransform: 'uppercase', padding: '6px 12px', cursor: 'pointer',
      border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
      background: vista === id ? 'var(--ng-blue)' : '#fff',
      color: vista === id ? '#fff' : 'var(--ng-steel)',
    }}>{txt}</button>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
        {BOTONES.map((b) => (
          <button key={b.etiqueta} type="button" title={b.titulo} onClick={() => aplicar(b)}
            disabled={vista !== 'escribir'}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, padding: '6px 10px',
              border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
              background: '#fff', color: 'var(--ng-ink)',
              cursor: vista === 'escribir' ? 'pointer' : 'not-allowed',
              opacity: vista === 'escribir' ? 1 : .5,
              ...(b.estilo || {}),
            }}>{b.etiqueta}</button>
        ))}
        <span style={{ flex: 1 }} />
        {tab('escribir', 'Escribir')}
        {tab('previa', 'Vista previa')}
      </div>

      {vista === 'escribir' ? (
        <textarea
          ref={areaRef}
          value={valor || ''}
          onChange={(e) => onChange(e.target.value)}
          spellCheck
          style={{
            width: '100%', minHeight: 420, padding: 14,
            fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.65,
            color: 'var(--ng-ink)', background: '#fff',
            border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
            resize: 'vertical',
          }} />
      ) : (
        <div className="ng-articulo-cuerpo"
          style={{
            minHeight: 420, padding: '14px 18px', background: '#fff',
            border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
          }}
          dangerouslySetInnerHTML={{ __html: html }} />
      )}

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', marginTop: 6 }}>
        Markdown · se guarda como HTML. Etiquetas admitidas: h2 h3 p ul ol li strong em a table blockquote img
      </div>
    </div>
  );
}

window.AdminEditorTexto = AdminEditorTexto;
window.markdownAHtml = markdownAHtml;
window.htmlAMarkdown = htmlAMarkdown;
