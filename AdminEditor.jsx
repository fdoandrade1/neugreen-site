// AdminEditor.jsx — /admin/editar.html?slug=  ·  editor a dos columnas.
//
// La columna derecha renderiza con ArticuloLayout, el MISMO componente que
// sirve el sitio público: lo que ve el editor es lo que se publica, sin una
// segunda implementación que se desincronice.

const { useState: useStateE, useEffect: useEffectE, useRef: useRefE, useCallback: useCbE } = React;

const ICONOS_DISPONIBLES = ['agua', 'matraz', 'etiqueta', 'medidor', 'trampa', 'planta', 'escudo', 'gota'];
const INTERVALO_AUTOGUARDADO = 30000;

const VACIO = {
  slug: '', titulo: '', seo_title: '', meta_description: '',
  linea: 'Industrial', categoria: '', fecha: '', fecha_texto: '',
  lectura: '', autor: 'Equipo Técnico Neugreen',
  portada: '', portada_alt: '', portada_pie: '', portada_icono: 'gota', portada_tag: '',
  extracto: '', respuesta_rapida: { parrafo: '', puntos: [] },
  cuerpo: '', productos_relacionados: [], articulos_relacionados: [],
  destacado: false, estado: 'borrador',
};

// --- piezas de formulario ---------------------------------------------------

const etiquetaEstilo = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ng-steel)', marginBottom: 7 };
const inputEstilo = { width: '100%', padding: '11px 13px', fontSize: 14, fontFamily: 'var(--font-text)', color: 'var(--ng-ink)', background: '#fff', border: '1px solid var(--ng-line)', borderRadius: 'var(--r)' };
const botonChico = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '7px 11px', border: '1px solid var(--ng-line)', borderRadius: 'var(--r)', background: '#fff', color: 'var(--ng-ink)', cursor: 'pointer' };

function Campo({ etiqueta, children, ayuda, aviso }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={etiquetaEstilo}>{etiqueta}</label>
      {children}
      {(ayuda || aviso) && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 6, color: aviso ? '#B45309' : 'var(--ng-steel)' }}>
          {aviso || ayuda}
        </div>
      )}
    </div>
  );
}

function Seccion({ titulo, children }) {
  return (
    <section style={{ background: '#fff', border: '1px solid var(--ng-line)', borderRadius: 'var(--r-lg)', padding: 22, marginBottom: 18 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, margin: '0 0 18px', color: 'var(--ng-ink)' }}>{titulo}</h2>
      {children}
    </section>
  );
}

// --- componente principal ---------------------------------------------------

function AdminEditor() {
  const slugUrl = new URLSearchParams(window.location.search).get('slug') || '';
  const esNuevo = !slugUrl;

  const [art, setArt] = useStateE(VACIO);
  const [md, setMd] = useStateE('');
  const [cargando, setCargando] = useStateE(!esNuevo);
  const [error, setError] = useStateE(null);
  const [sucio, setSucio] = useStateE(false);
  const [guardando, setGuardando] = useStateE(false);
  const [guardadoEn, setGuardadoEn] = useStateE(null);
  const [otros, setOtros] = useStateE([]);
  const [vista, setVista] = useStateE('escritorio');
  const [historial, setHistorial] = useStateE(null);
  const [subiendo, setSubiendo] = useStateE(false);
  const [, forzar] = useStateE(0);

  const sucioRef = useRefE(false);
  useEffectE(() => { sucioRef.current = sucio; }, [sucio]);

  const set = (campo, valor) => { setArt((a) => ({ ...a, [campo]: valor })); setSucio(true); };

  // --- carga inicial ---
  useEffectE(() => {
    (async () => {
      try {
        const lista = await window.AdminAPI.listar();
        setOtros((lista.articulos || []).filter((a) => a.slug !== slugUrl));
        if (!esNuevo) {
          const r = await window.AdminAPI.obtener(slugUrl);
          const a = r.articulo;
          setArt({
            ...VACIO, ...a,
            respuesta_rapida: a.respuesta_rapida || { parrafo: '', puntos: [] },
            productos_relacionados: a.productos_relacionados || [],
            articulos_relacionados: a.articulos_relacionados || [],
          });
          // El cuerpo vive en HTML; el editor trabaja en Markdown.
          setMd(window.htmlAMarkdown(a.cuerpo || ''));
          setGuardadoEn(a.actualizado_en);
        }
      } catch (e) {
        setError(e);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  // Refresca el "hace X" sin depender de otra interacción.
  useEffectE(() => {
    const t = setInterval(() => forzar((n) => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  // --- aviso de cambios sin guardar ---
  useEffectE(() => {
    const h = (e) => {
      if (!sucioRef.current) return;
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, []);

  const cuerpoHtml = window.markdownAHtml(md);
  const paraGuardar = { ...art, cuerpo: cuerpoHtml };

  const guardar = useCbE(async (estadoNuevo) => {
    if (guardando) return null;
    const datos = { ...art, cuerpo: window.markdownAHtml(md) };
    if (estadoNuevo) datos.estado = estadoNuevo;

    if (!datos.titulo || !String(datos.titulo).trim()) { alert('El título es obligatorio.'); return null; }
    if (!datos.slug) { alert('El slug es obligatorio.'); return null; }

    setGuardando(true);
    try {
      let r;
      if (esNuevo && !guardadoEn) {
        r = await window.AdminAPI.crear(datos);
        // Al crear se cambia la URL para que recargar no duplique el artículo.
        window.history.replaceState({}, '', `/admin/editar.html?slug=${encodeURIComponent(datos.slug)}`);
      } else {
        const { slug, ...resto } = datos; // el slug va en la URL, no en el body
        r = await window.AdminAPI.actualizar(art.slug, resto);
      }
      setArt((a) => ({ ...a, estado: r.articulo.estado }));
      setGuardadoEn(r.articulo.actualizado_en);
      setSucio(false);
      return r.articulo;
    } catch (e) {
      alert(`No se pudo guardar: ${e.message}`);
      return null;
    } finally {
      setGuardando(false);
    }
  }, [art, md, guardando, esNuevo, guardadoEn]);

  // --- autoguardado ---
  // Solo sobre artículos ya creados: autoguardar uno nuevo llenaría la tabla
  // de borradores vacíos con cada visita al editor.
  useEffectE(() => {
    const t = setInterval(() => {
      if (sucioRef.current && !guardando && (guardadoEn || !esNuevo)) guardar();
    }, INTERVALO_AUTOGUARDADO);
    return () => clearInterval(t);
  }, [guardar, guardando, guardadoEn, esNuevo]);

  const publicar = async () => {
    const faltan = window.faltantesParaPublicar(paraGuardar);
    if (faltan.length) {
      alert(`Todavía no se puede publicar.\n\nFalta:\n· ${faltan.join('\n· ')}`);
      return;
    }
    if (!confirm(
      `Publicar "${art.titulo}".\n\nQué va a pasar:\n` +
      `· El artículo queda visible en /blog/${art.slug}\n` +
      `· Se dispara una reconstrucción del sitio\n· Ya no se podrá borrar sin pasarlo antes a borrador\n\n¿Continuar?`
    )) return;

    const guardado = await guardar();
    if (!guardado) return;
    try {
      const r = await window.AdminAPI.publicar(art.slug);
      setArt((a) => ({ ...a, estado: 'publicado' }));
      alert(`Publicado.\nDeploy: ${r.deploy}`);
    } catch (e) {
      alert(`No se pudo publicar: ${e.message}`);
    }
  };

  const abrirHistorial = async () => {
    try {
      const r = await window.AdminAPI.revisiones(art.slug);
      setHistorial(r.revisiones || []);
    } catch (e) {
      alert(`No se pudo cargar el historial: ${e.message}`);
    }
  };

  const restaurar = async (id) => {
    if (!confirm(`Restaurar la revisión #${id}.\n\nLa versión actual se guarda como revisión nueva, así que esto también se puede deshacer.\nEl estado de publicación no cambia.\n\n¿Continuar?`)) return;
    try {
      const r = await window.AdminAPI.revertir(art.slug, id);
      const a = r.articulo;
      setArt({ ...VACIO, ...a, respuesta_rapida: a.respuesta_rapida || { parrafo: '', puntos: [] }, productos_relacionados: a.productos_relacionados || [], articulos_relacionados: a.articulos_relacionados || [] });
      setMd(window.htmlAMarkdown(a.cuerpo || ''));
      setSucio(false);
      setHistorial(null);
      alert('Revisión restaurada.');
    } catch (e) {
      alert(`No se pudo restaurar: ${e.message}`);
    }
  };

  const subirPortada = async (archivo) => {
    if (!archivo) return;
    setSubiendo(true);
    try {
      const r = await window.AdminAPI.subirMedia(archivo, art.slug || window.slugDesdeTitulo(art.titulo));
      set('portada', r.url);
    } catch (e) {
      alert(`No se pudo subir la imagen: ${e.message}`);
    } finally {
      setSubiendo(false);
    }
  };

  if (cargando) return <div style={{ padding: 48, fontFamily: 'var(--font-mono)', color: 'var(--ng-steel)' }}>Cargando…</div>;

  if (error) {
    const expirada = error.status === 403;
    return (
      <div style={{ margin: 48, padding: 28, maxWidth: 640, background: '#fff', border: '1px solid var(--ng-line)', borderLeft: `3px solid ${expirada ? '#E8A800' : 'var(--danger)'}`, borderRadius: 'var(--r-lg)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, margin: '0 0 10px' }}>
          {expirada ? 'Sesión expirada' : 'No se pudo abrir el artículo'}
        </h2>
        <p style={{ color: 'var(--ng-steel)', margin: '0 0 18px', lineHeight: 1.6 }}>
          {expirada ? 'Tu sesión de Cloudflare Access caducó. Recarga la página para volver a entrar.' : error.message}
        </p>
        <button onClick={() => window.location.reload()} style={{ background: 'var(--ng-blue)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '12px 20px', fontWeight: 700, cursor: 'pointer' }}>Recargar</button>
      </div>
    );
  }

  // Previsualización: ArticuloLayout busca en window.ARTICULOS, así que se
  // inyecta el borrador en curso junto al resto para que resuelva relaciones.
  const enSitio = window.aFormatoSitio(paraGuardar);
  window.ARTICULOS = [...otros.map(window.aFormatoSitio), enSitio];

  const rr = art.respuesta_rapida || { parrafo: '', puntos: [] };
  const setRR = (v) => set('respuesta_rapida', { ...rr, ...v });
  const faltan = window.faltantesParaPublicar(paraGuardar);

  return (
    <div>
      {/* --- barra superior fija --- */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 60, background: 'rgba(255,255,255,.96)',
        backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--ng-line)',
        padding: '12px clamp(16px, 3vw, 28px)', display: 'flex',
        alignItems: 'center', gap: 14, flexWrap: 'wrap',
      }}>
        <a href="/admin/" style={{ ...botonChico, textDecoration: 'none' }}>← Lista</a>
        <window.AdminBadge estado={art.estado} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: sucio ? '#B45309' : 'var(--ng-steel)' }}>
          {guardando ? 'Guardando…'
            : sucio ? '● Cambios sin guardar'
            : guardadoEn ? `Guardado ${window.haceCuanto(guardadoEn)}` : 'Sin guardar todavía'}
        </div>
        <span style={{ flex: 1 }} />
        {!esNuevo && <button onClick={abrirHistorial} style={botonChico}>Historial</button>}
        <button onClick={() => guardar()} disabled={guardando} style={{ ...botonChico, opacity: guardando ? .5 : 1 }}>Guardar borrador</button>
        <button onClick={() => guardar('revision')} disabled={guardando} style={{ ...botonChico, borderColor: '#F0DCA8', background: '#FFF4DB', color: '#8A6100' }}>Marcar para revisión</button>
        <button onClick={publicar} disabled={guardando} title={faltan.length ? `Falta: ${faltan.join(', ')}` : 'Publicar'}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '8px 16px', border: 'none', borderRadius: 'var(--r)', fontWeight: 700, cursor: 'pointer',
            background: faltan.length ? '#C7D2E0' : 'var(--ng-blue)', color: '#fff',
          }}>Publicar</button>
      </div>

      {faltan.length > 0 && (
        <div style={{ background: '#FFF4DB', borderBottom: '1px solid #F0DCA8', padding: '10px clamp(16px, 3vw, 28px)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A6100' }}>
          Falta para poder publicar: {faltan.join(' · ')}
        </div>
      )}

      {/* --- dos columnas --- */}
      <div className="ng-admin-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, alignItems: 'start' }}>

        {/* IZQUIERDA */}
        <div style={{ padding: 'clamp(16px, 2.5vw, 28px)', background: 'var(--ng-cloud)' }}>

          <Seccion titulo="Identidad">
            <Campo etiqueta="Título">
              <input style={inputEstilo} value={art.titulo}
                onChange={(e) => {
                  const v = e.target.value;
                  setArt((a) => ({ ...a, titulo: v, ...(esNuevo && !guardadoEn ? { slug: window.slugDesdeTitulo(v) } : {}) }));
                  setSucio(true);
                }} />
            </Campo>

            <Campo etiqueta="Slug"
              ayuda={esNuevo && !guardadoEn ? 'Se genera del título mientras el artículo no se haya guardado.' : null}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input style={{ ...inputEstilo, background: esNuevo && !guardadoEn ? '#fff' : 'var(--ng-mist)', color: esNuevo && !guardadoEn ? 'var(--ng-ink)' : 'var(--ng-steel)', fontFamily: 'var(--font-mono)', fontSize: 13 }}
                  value={art.slug} readOnly={!(esNuevo && !guardadoEn)}
                  onChange={(e) => set('slug', window.slugDesdeTitulo(e.target.value))} />
                {!(esNuevo && !guardadoEn) && (
                  <button type="button" style={botonChico} onClick={() => alert(
                    'El slug es la URL publicada.\n\n' +
                    'Cambiarlo rompería los enlaces existentes y lo que ya indexó Google, ' +
                    'por eso la API rechaza el cambio desde el editor.\n\n' +
                    'Si de verdad hace falta renombrarlo, es una migración deliberada: ' +
                    'crear el artículo con el slug nuevo y dejar una redirección del viejo.'
                  )}>Cambiar</button>
                )}
              </div>
            </Campo>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Campo etiqueta="Línea">
                <select style={inputEstilo} value={art.linea} onChange={(e) => set('linea', e.target.value)}>
                  {(window.NG_LINEAS || []).map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </Campo>
              <Campo etiqueta="Categoría">
                <input style={inputEstilo} value={art.categoria || ''} onChange={(e) => set('categoria', e.target.value)}
                  placeholder="ej. Tratamiento de agua" />
              </Campo>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Campo etiqueta="Fecha de publicación" ayuda="Admite fechas futuras.">
                <input type="date" style={inputEstilo} value={art.fecha || ''}
                  onChange={(e) => { const v = e.target.value; setArt((a) => ({ ...a, fecha: v, fecha_texto: window.fechaLegible(v) })); setSucio(true); }} />
              </Campo>
              <Campo etiqueta="Tiempo de lectura">
                <input style={inputEstilo} value={art.lectura || ''} onChange={(e) => set('lectura', e.target.value)} placeholder="7 min de lectura" />
              </Campo>
            </div>

            <Campo etiqueta="Autor">
              <input style={inputEstilo} value={art.autor || ''} onChange={(e) => set('autor', e.target.value)} />
            </Campo>

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 14, color: 'var(--ng-ink)' }}>
              <input type="checkbox" checked={!!art.destacado} style={{ marginTop: 3 }}
                onChange={(e) => {
                  if (e.target.checked && !confirm('Marcar este artículo como destacado.\n\nEl que esté destacado ahora dejará de estarlo: solo uno puede ocupar el hero del índice.\n\n¿Continuar?')) return;
                  set('destacado', e.target.checked);
                }} />
              <span>Destacado <span style={{ color: 'var(--ng-steel)', fontSize: 13 }}>— ocupa el hero del índice del blog</span></span>
            </label>
          </Seccion>

          <Seccion titulo="Resumen">
            <Campo etiqueta="Extracto" ayuda={`${(art.extracto || '').length} caracteres · se recorta a 2 líneas en las tarjetas`}>
              <textarea style={{ ...inputEstilo, minHeight: 80, resize: 'vertical' }} value={art.extracto || ''}
                onChange={(e) => set('extracto', e.target.value)} />
            </Campo>

            <Campo etiqueta="Respuesta rápida — párrafo">
              <textarea style={{ ...inputEstilo, minHeight: 80, resize: 'vertical' }} value={rr.parrafo || ''}
                onChange={(e) => setRR({ parrafo: e.target.value })} />
            </Campo>

            <label style={etiquetaEstilo}>Respuesta rápida — puntos</label>
            {(rr.puntos || []).map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <input style={{ ...inputEstilo, fontSize: 13 }} value={p}
                  onChange={(e) => { const n = [...rr.puntos]; n[i] = e.target.value; setRR({ puntos: n }); }} />
                <button style={botonChico} disabled={i === 0} title="Subir"
                  onClick={() => { const n = [...rr.puntos]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setRR({ puntos: n }); }}>↑</button>
                <button style={botonChico} disabled={i === rr.puntos.length - 1} title="Bajar"
                  onClick={() => { const n = [...rr.puntos]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; setRR({ puntos: n }); }}>↓</button>
                <button style={botonChico} title="Quitar"
                  onClick={() => setRR({ puntos: rr.puntos.filter((_, k) => k !== i) })}>×</button>
              </div>
            ))}
            <button style={botonChico} onClick={() => setRR({ puntos: [...(rr.puntos || []), ''] })}>+ Agregar punto</button>
          </Seccion>

          <Seccion titulo="Cuerpo">
            <AdminEditorTexto valor={md} onChange={(v) => { setMd(v); setSucio(true); }} />
          </Seccion>

          <Seccion titulo="Portada">
            {art.portada ? (
              <div style={{ marginBottom: 14 }}>
                <img src={window.NG_URL_PORTADA(art.portada)} alt=""
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--r)', border: '1px solid var(--ng-line)' }} />
                <button style={{ ...botonChico, marginTop: 8 }} onClick={() => set('portada', '')}>Quitar imagen</button>
              </div>
            ) : (
              <Campo etiqueta="Icono (si no hay foto)">
                <select style={inputEstilo} value={art.portada_icono || 'gota'} onChange={(e) => set('portada_icono', e.target.value)}>
                  {ICONOS_DISPONIBLES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </Campo>
            )}

            <Campo etiqueta="Subir imagen" ayuda="jpg, png o webp · máximo 5 MB">
              <input type="file" accept=".jpg,.jpeg,.png,.webp" disabled={subiendo}
                onChange={(e) => subirPortada(e.target.files && e.target.files[0])}
                style={{ fontSize: 13, color: 'var(--ng-steel)' }} />
              {subiendo && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-blue)', marginTop: 6 }}>Subiendo…</div>}
            </Campo>

            <Campo etiqueta="Texto alternativo"><input style={inputEstilo} value={art.portada_alt || ''} onChange={(e) => set('portada_alt', e.target.value)} /></Campo>
            <Campo etiqueta="Pie de foto"><input style={inputEstilo} value={art.portada_pie || ''} onChange={(e) => set('portada_pie', e.target.value)} /></Campo>
            <Campo etiqueta="Etiqueta sobre la portada"><input style={inputEstilo} value={art.portada_tag || ''} onChange={(e) => set('portada_tag', e.target.value)} /></Campo>
          </Seccion>

          <Seccion titulo="Productos relacionados">
            {(art.productos_relacionados || []).map((p, i) => (
              <div key={i} style={{ border: '1px solid var(--ng-line)', borderRadius: 'var(--r)', padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginBottom: 8 }}>
                  <input style={{ ...inputEstilo, fontSize: 13 }} placeholder="Nombre" value={p.nombre || ''}
                    onChange={(e) => { const n = [...art.productos_relacionados]; n[i] = { ...p, nombre: e.target.value }; set('productos_relacionados', n); }} />
                  <button style={botonChico} onClick={() => set('productos_relacionados', art.productos_relacionados.filter((_, k) => k !== i))}>×</button>
                </div>
                <input style={{ ...inputEstilo, fontSize: 13, marginBottom: 8 }} placeholder="Descripción" value={p.desc || ''}
                  onChange={(e) => { const n = [...art.productos_relacionados]; n[i] = { ...p, desc: e.target.value }; set('productos_relacionados', n); }} />
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
                  <input style={{ ...inputEstilo, fontSize: 13 }} placeholder="/productos.html?tab=..." value={p.href || ''}
                    onChange={(e) => { const n = [...art.productos_relacionados]; n[i] = { ...p, href: e.target.value }; set('productos_relacionados', n); }} />
                  <select style={{ ...inputEstilo, fontSize: 13 }} value={p.icono || 'gota'}
                    onChange={(e) => { const n = [...art.productos_relacionados]; n[i] = { ...p, icono: e.target.value }; set('productos_relacionados', n); }}>
                    {ICONOS_DISPONIBLES.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
            ))}
            <button style={botonChico} onClick={() => set('productos_relacionados', [...(art.productos_relacionados || []), { nombre: '', desc: '', href: '', icono: 'gota' }])}>
              + Agregar producto
            </button>
          </Seccion>

          <Seccion titulo="Artículos relacionados">
            {otros.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ng-steel)' }}>No hay otros artículos todavía.</div>
            ) : otros.map((o) => {
              const puesto = (art.articulos_relacionados || []).includes(o.slug);
              return (
                <label key={o.slug} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 0', cursor: 'pointer', fontSize: 13, color: 'var(--ng-ink)' }}>
                  <input type="checkbox" checked={puesto} style={{ marginTop: 3 }}
                    onChange={(e) => {
                      const act = art.articulos_relacionados || [];
                      set('articulos_relacionados', e.target.checked ? [...act, o.slug] : act.filter((s) => s !== o.slug));
                    }} />
                  <span>{o.titulo}<span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)' }}>/{o.slug}</span></span>
                </label>
              );
            })}
          </Seccion>

          <Seccion titulo="SEO">
            <Campo etiqueta="SEO title"
              ayuda={`${(art.seo_title || '').length} / 60 caracteres`}
              aviso={(art.seo_title || '').length > 60 ? `${(art.seo_title || '').length} caracteres — Google recorta más allá de ~60` : null}>
              <input style={inputEstilo} value={art.seo_title || ''} onChange={(e) => set('seo_title', e.target.value)} />
            </Campo>
            <Campo etiqueta="Meta description"
              ayuda={`${(art.meta_description || '').length} / 155 caracteres`}
              aviso={(art.meta_description || '').length > 155 ? `${(art.meta_description || '').length} caracteres — Google recorta más allá de ~155` : null}>
              <textarea style={{ ...inputEstilo, minHeight: 80, resize: 'vertical' }} value={art.meta_description || ''}
                onChange={(e) => set('meta_description', e.target.value)} />
            </Campo>
          </Seccion>
        </div>

        {/* DERECHA — previsualización */}
        <div style={{ position: 'sticky', top: 61, height: 'calc(100vh - 61px)', overflowY: 'auto', background: 'var(--ng-mist)', borderLeft: '1px solid var(--ng-line)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid var(--ng-line)', background: '#fff', position: 'sticky', top: 0, zIndex: 5 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ng-steel)' }}>Previsualización</span>
            <span style={{ flex: 1 }} />
            {['escritorio', 'movil'].map((v) => (
              <button key={v} onClick={() => setVista(v)} style={{
                ...botonChico,
                background: vista === v ? 'var(--ng-blue)' : '#fff',
                color: vista === v ? '#fff' : 'var(--ng-steel)',
                borderColor: vista === v ? 'var(--ng-blue)' : 'var(--ng-line)',
              }}>{v === 'escritorio' ? 'Escritorio' : 'Móvil'}</button>
            ))}
          </div>
          <div style={{ padding: vista === 'movil' ? '20px 0' : 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: vista === 'movil' ? 390 : '100%',
              maxWidth: '100%',
              background: 'var(--ng-cloud)',
              border: vista === 'movil' ? '1px solid var(--ng-line)' : 'none',
              borderRadius: vista === 'movil' ? 'var(--r-lg)' : 0,
              overflow: 'hidden',
            }}>
              <ArticuloLayout slug={art.slug || '__borrador__'} />
            </div>
          </div>
        </div>
      </div>

      {/* --- historial --- */}
      {historial && (
        <div onClick={() => setHistorial(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(11,27,43,.55)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 'var(--r-lg)', maxWidth: 620, width: '100%', maxHeight: '80vh', overflowY: 'auto', padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, margin: 0, flex: 1 }}>Historial de revisiones</h2>
              <button style={botonChico} onClick={() => setHistorial(null)}>Cerrar</button>
            </div>
            {historial.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ng-steel)' }}>Todavía no hay revisiones. Se crea una en cada guardado.</div>
            ) : historial.map((r) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--ng-line)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: 'var(--ng-ink)' }}>{r.titulo || '(sin título)'}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', marginTop: 3 }}>
                    #{r.id} · {window.haceCuanto(r.fecha)} · {r.editado_por} · estado {r.estado}
                  </div>
                </div>
                <button style={botonChico} onClick={() => restaurar(r.id)}>Restaurar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .ng-admin-cols { grid-template-columns: 1fr !important; }
          .ng-admin-cols > div:last-child { position: static !important; height: auto !important; border-left: none !important; border-top: 1px solid var(--ng-line); }
        }
      `}</style>
    </div>
  );
}

window.AdminEditor = AdminEditor;
