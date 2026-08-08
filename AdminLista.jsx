// AdminLista.jsx — /admin · tabla de artículos con filtros y acciones.

const { useState: useStateL, useEffect: useEffectL } = React;

function Badge({ estado }) {
  const e = (window.NG_ESTADOS_UI || {})[estado] || { etiqueta: estado, fondo: '#eee', texto: '#555', borde: '#ddd' };
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--r-pill)',
      background: e.fondo, color: e.texto, border: `1px solid ${e.borde}`,
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{e.etiqueta}</span>
  );
}

function AdminLista() {
  const [articulos, setArticulos] = useStateL([]);
  const [cargando, setCargando] = useStateL(true);
  const [error, setError] = useStateL(null);
  const [fEstado, setFEstado] = useStateL('');
  const [fLinea, setFLinea] = useStateL('');
  const [ocupado, setOcupado] = useStateL(null);
  // Artículo pendiente de confirmar borrado, y el error del intento anterior.
  const [aBorrar, setABorrar] = useStateL(null);
  const [errorBorrado, setErrorBorrado] = useStateL(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const r = await window.AdminAPI.listar();
      setArticulos(r.articulos || []);
    } catch (e) {
      setError(e);
    } finally {
      setCargando(false);
    }
  };

  useEffectL(() => { cargar(); }, []);

  const conteos = articulos.reduce((acc, a) => {
    acc[a.estado] = (acc[a.estado] || 0) + 1;
    return acc;
  }, {});

  const visibles = articulos.filter((a) =>
    (!fEstado || a.estado === fEstado) && (!fLinea || a.linea === fLinea));

  const publicar = async (a) => {
    const faltan = window.faltantesParaPublicar(a);
    if (faltan.length) {
      alert(`No se puede publicar "${a.titulo}".\n\nFalta:\n· ${faltan.join('\n· ')}\n\nÁbrelo en el editor para completarlo.`);
      return;
    }
    if (!confirm(`Publicar "${a.titulo}".\n\nQuedará visible en /blog/${a.slug} y se disparará una reconstrucción del sitio.\n\n¿Continuar?`)) return;

    setOcupado(a.slug);
    try {
      const r = await window.AdminAPI.publicar(a.slug);
      await cargar();
      alert(`Publicado.\nDeploy: ${r.deploy}`);
    } catch (e) {
      alert(`No se pudo publicar: ${e.message}${e.detalle && e.detalle.faltan ? `\n\nFalta: ${e.detalle.faltan.join(', ')}` : ''}`);
    } finally {
      setOcupado(null);
    }
  };

  const confirmarBorrado = async () => {
    const a = aBorrar;
    if (!a) return;
    setOcupado(a.slug);
    setErrorBorrado(null);
    try {
      await window.AdminAPI.borrar(a.slug);
      // Se quita de la lista en memoria en vez de volver a pedirla: el
      // servidor ya confirmó el borrado y un refetch solo añadiría espera.
      setArticulos((prev) => prev.filter((x) => x.slug !== a.slug));
      setABorrar(null);
    } catch (e) {
      // El modal SIGUE abierto con el error a la vista. Cerrarlo aquí haría
      // creer que se borró: la fila seguiría en pantalla sin explicación.
      const extra = e.detalle && e.detalle.estado_actual ? ` (estado actual: ${e.detalle.estado_actual})` : '';
      setErrorBorrado(`${e.message}${extra}`);
    } finally {
      setOcupado(null);
    }
  };

  // --- estados de carga y error ---
  if (cargando) {
    return <div style={{ padding: 48, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ng-steel)' }}>Cargando artículos…</div>;
  }

  if (error) {
    const expirada = error.status === 403;
    return (
      <div style={{
        margin: 48, padding: 28, maxWidth: 640,
        background: '#fff', border: '1px solid var(--ng-line)',
        borderLeft: `3px solid ${expirada ? '#E8A800' : 'var(--danger)'}`,
        borderRadius: 'var(--r-lg)',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, margin: '0 0 10px', color: 'var(--ng-ink)' }}>
          {expirada ? 'Sesión expirada' : 'No se pudo cargar la lista'}
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ng-steel)', margin: '0 0 18px' }}>
          {expirada
            ? 'Tu sesión de Cloudflare Access caducó. Recarga la página para volver a entrar.'
            : error.message}
        </p>
        <button onClick={() => window.location.reload()} style={{
          background: 'var(--ng-blue)', color: '#fff', border: 'none',
          borderRadius: 'var(--r)', padding: '12px 20px', fontWeight: 700,
          fontSize: 14, cursor: 'pointer',
        }}>Recargar página</button>
      </div>
    );
  }

  const th = { textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ng-steel)', padding: '12px 14px', borderBottom: '1px solid var(--ng-line)', whiteSpace: 'nowrap' };
  const td = { padding: '14px', borderBottom: '1px solid var(--ng-line)', fontSize: 14, color: 'var(--ng-ink)', verticalAlign: 'middle' };
  const accion = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 10px', border: '1px solid var(--ng-line)', borderRadius: 'var(--r)', background: '#fff', color: 'var(--ng-ink)', cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' };
  const selectEstilo = { fontSize: 13, padding: '9px 12px', border: '1px solid var(--ng-line)', borderRadius: 'var(--r)', background: '#fff', color: 'var(--ng-ink)' };

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 48px)', maxWidth: 1400, margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ng-blue)', marginBottom: 8 }}>
            Panel editorial
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: 'var(--ng-ink)' }}>
            Artículos del blog
          </h1>
        </div>
        <a href="/admin/editar.html" style={{
          background: 'var(--ng-blue)', color: '#fff', fontWeight: 700, fontSize: 14,
          padding: '13px 22px', borderRadius: 'var(--r)', textDecoration: 'none',
        }}>+ Nuevo artículo</a>
      </div>

      {/* Conteo por estado */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {['borrador', 'revision', 'publicado'].map((e) => (
          <div key={e} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#fff', border: '1px solid var(--ng-line)',
            borderRadius: 'var(--r)', padding: '10px 16px',
          }}>
            <Badge estado={e} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--ng-ink)' }}>
              {conteos[e] || 0}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ng-steel)' }}>
          {articulos.length} en total
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        <select value={fEstado} onChange={(e) => setFEstado(e.target.value)} style={selectEstilo}>
          <option value="">Todos los estados</option>
          <option value="borrador">Borrador</option>
          <option value="revision">Revisión</option>
          <option value="publicado">Publicado</option>
        </select>
        <select value={fLinea} onChange={(e) => setFLinea(e.target.value)} style={selectEstilo}>
          <option value="">Todas las líneas</option>
          {(window.NG_LINEAS || []).map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        {(fEstado || fLinea) && (
          <button onClick={() => { setFEstado(''); setFLinea(''); }} style={accion}>Limpiar</button>
        )}
        <span style={{ flex: 1 }} />
        <button onClick={cargar} style={accion}>Recargar</button>
      </div>

      {/* Tabla */}
      <div style={{ background: '#fff', border: '1px solid var(--ng-line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
            <thead>
              <tr style={{ background: 'var(--ng-mist)' }}>
                <th style={th}>Título</th>
                <th style={th}>Línea</th>
                <th style={th}>Estado</th>
                <th style={th}>Publicación</th>
                <th style={th}>Última edición</th>
                <th style={th}>Editó</th>
                <th style={{ ...th, textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((a) => (
                <tr key={a.slug}>
                  <td style={td}>
                    <div style={{ fontWeight: 600, lineHeight: 1.35 }}>{a.titulo}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', marginTop: 4 }}>
                      /{a.slug}{a.destacado ? ' · destacado' : ''}
                    </div>
                  </td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{a.linea}</td>
                  <td style={td}><Badge estado={a.estado} /></td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {a.fecha || '—'}
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {window.haceCuanto(a.actualizado_en) || '—'}
                  </td>
                  <td style={{ ...td, fontSize: 12, color: 'var(--ng-steel)' }}>{a.actualizado_por || '—'}</td>
                  <td style={{ ...td, textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <a href={`/admin/editar.html?slug=${encodeURIComponent(a.slug)}`} style={accion}>Editar</a>
                      <a href={`/blog/${a.slug}`} target="_blank" rel="noopener" style={accion}>Ver</a>
                      {a.estado !== 'publicado' && (
                        <button onClick={() => publicar(a)} disabled={ocupado === a.slug}
                          style={{ ...accion, borderColor: 'var(--ng-blue)', color: 'var(--ng-blue)', fontWeight: 700, opacity: ocupado === a.slug ? .5 : 1 }}>
                          {ocupado === a.slug ? '…' : 'Publicar'}
                        </button>
                      )}
                      {/* Solo en borrador: la API responde 409 en cualquier
                          otro estado, así que ofrecer el botón sería ofrecer
                          una acción que se sabe que va a fallar. */}
                      {a.estado === 'borrador' && (
                        <button onClick={() => { setErrorBorrado(null); setABorrar(a); }} disabled={ocupado === a.slug}
                          style={{ ...accion, borderColor: 'var(--danger)', color: 'var(--danger)', opacity: ocupado === a.slug ? .5 : 1 }}>
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibles.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ng-steel)' }}>
            {articulos.length === 0 ? 'Todavía no hay artículos.' : 'Ningún artículo coincide con el filtro.'}
          </div>
        )}
      </div>

      {/* --- confirmación de borrado --- */}
      {aBorrar && (
        <div
          onClick={() => { if (ocupado !== aBorrar.slug) { setABorrar(null); setErrorBorrado(null); } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(11,27,43,.55)',
            display: 'grid', placeItems: 'center', padding: 20,
          }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 'var(--r-lg)', padding: 26,
            width: 'min(480px, 100%)', border: '1px solid var(--ng-line)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800,
              margin: '0 0 10px', color: 'var(--ng-ink)', lineHeight: 1.3,
            }}>
              ¿Eliminar “{aBorrar.titulo}”?
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ng-steel)', margin: '0 0 18px' }}>
              Esta acción no se puede deshacer. Se borrarán también sus revisiones.
            </p>

            {errorBorrado && (
              <div style={{
                background: '#FDECEC', border: '1px solid #F5C2C2',
                borderLeft: '3px solid var(--danger)', borderRadius: 'var(--r)',
                padding: '12px 14px', marginBottom: 18,
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ng-ink)', marginBottom: 4 }}>
                  No se eliminó
                </div>
                <div style={{ fontSize: 13, color: 'var(--ng-steel)', lineHeight: 1.5 }}>{errorBorrado}</div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => { setABorrar(null); setErrorBorrado(null); }}
                disabled={ocupado === aBorrar.slug} style={accion}>Cancelar</button>
              <button onClick={confirmarBorrado} disabled={ocupado === aBorrar.slug}
                style={{
                  ...accion,
                  background: 'var(--danger)', borderColor: 'var(--danger)',
                  color: '#fff', fontWeight: 700,
                  opacity: ocupado === aBorrar.slug ? .6 : 1,
                }}>
                {ocupado === aBorrar.slug ? 'Eliminando…' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.AdminLista = AdminLista;
window.AdminBadge = Badge;
