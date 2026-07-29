// AdminEditorImagen.jsx — editor de portada integrado en el panel.
//
// El lienzo muestra EL RESULTADO, no la imagen completa: lo que se ve es
// exactamente lo que se sube. Vista y exportación llaman a la misma
// dibujarEncuadre() de AdminImagen.jsx, solo que a distinta resolución, así
// que no hay dos implementaciones que puedan divergir.

const { useState: useStateImg, useEffect: useEffectImg, useRef: useRefImg, useCallback: useCbImg } = React;

const ANCHO_VISTA = 720;
const ALTO_VISTA = 405;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

function Deslizador({ etiqueta, valor, min, max, paso, onChange, sufijo, deshabilitado }) {
  return (
    <label style={{ display: 'block', marginBottom: 14, opacity: deshabilitado ? .45 : 1 }}>
      <span style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--ng-steel)', marginBottom: 6,
      }}>
        <span>{etiqueta}</span>
        <span style={{ color: 'var(--ng-ink)' }}>{valor}{sufijo || ''}</span>
      </span>
      <input type="range" min={min} max={max} step={paso} value={valor}
        disabled={deshabilitado}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--ng-blue)', cursor: deshabilitado ? 'not-allowed' : 'pointer' }} />
    </label>
  );
}

function AdminEditorImagen({ archivo, onAplicar, onCancelar }) {
  const IMG = window.NG_IMG;

  const [img, setImg] = useStateImg(null);
  const [estado, setEstado] = useStateImg(IMG.ESTADO_INICIAL);
  const [error, setError] = useStateImg(null);
  const [procesando, setProcesando] = useStateImg(false);
  const [cargando, setCargando] = useStateImg(true);

  const lienzoRef = useRefImg(null);
  const arrastreRef = useRefImg(null);
  const cuadroRef = useRefImg(0);
  const hayFiltro = useRefImg(IMG.soportaFiltro());

  const set = (parcial) => setEstado((e) => ({ ...e, ...parcial }));

  // --- carga ---
  useEffectImg(() => {
    let vivo = true;
    IMG.cargarImagen(archivo)
      .then((i) => { if (vivo) { setImg(i); setCargando(false); } })
      .catch((e) => { if (vivo) { setError(e.message || 'No se pudo leer la imagen'); setCargando(false); } });
    return () => { vivo = false; };
  }, [archivo]);

  // --- dibujo, agrupado con requestAnimationFrame ---
  useEffectImg(() => {
    if (!img || !lienzoRef.current) return undefined;
    cancelAnimationFrame(cuadroRef.current);
    cuadroRef.current = requestAnimationFrame(() => {
      try {
        const ctx = lienzoRef.current.getContext('2d');
        if (!ctx) throw new Error('El navegador no expone contexto 2D de canvas');
        IMG.dibujarEncuadre(ctx, img, estado, ANCHO_VISTA, ALTO_VISTA);
      } catch (e) {
        setError(e.message || 'Fallo al dibujar la previsualización');
      }
    });
    return () => cancelAnimationFrame(cuadroRef.current);
  }, [img, estado]);

  // --- arrastre para reposicionar ---
  const alBajarPuntero = (e) => {
    if (!img) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    arrastreRef.current = { x: e.clientX, y: e.clientY, panX: estado.panX, panY: estado.panY };
  };

  const alMoverPuntero = (e) => {
    const a = arrastreRef.current;
    if (!a || !img || !lienzoRef.current) return;

    const rect = lienzoRef.current.getBoundingClientRect();
    const aCanvas = ANCHO_VISTA / (rect.width || ANCHO_VISTA);
    const g = IMG.geometriaEncuadre(img, estado);
    const escala = ANCHO_VISTA / g.ventana.w; // px de lienzo por px del espacio rotado

    // Arrastrar la imagen hacia un lado mueve la ventana al contrario.
    const dsx = ((e.clientX - a.x) * aCanvas) / escala;
    const dsy = ((e.clientY - a.y) * aCanvas) / escala;

    set({
      panX: g.maxX > 0 ? Math.max(-1, Math.min(1, a.panX - dsx / g.maxX)) : 0,
      panY: g.maxY > 0 ? Math.max(-1, Math.min(1, a.panY - dsy / g.maxY)) : 0,
    });
  };

  const alSoltarPuntero = (e) => {
    arrastreRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ya liberado */ }
  };

  const alRodar = (e) => {
    if (!img) return;
    e.preventDefault();
    const paso = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    set({ zoom: Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, estado.zoom * paso)) });
  };

  const rotar = () => set({ rotacion: IMG.normalizarRotacion(estado.rotacion + 90), panX: 0, panY: 0 });

  const restablecer = () => setEstado(IMG.ESTADO_INICIAL);

  const aplicar = useCbImg(async () => {
    if (!img) return;
    setProcesando(true);
    setError(null);
    try {
      const salida = await IMG.exportarEncuadre(archivo, img, estado);
      onAplicar(salida);
    } catch (e) {
      // Visible, no silencioso: el usuario decide qué hacer.
      setError(e.message || 'No se pudo generar la imagen');
      setProcesando(false);
    }
  }, [img, estado, archivo, onAplicar]);

  const subirSinEditar = () => onAplicar(archivo);

  const salida = img ? IMG.dimensionesSalida(img, estado) : null;
  const neutro = estado.brillo === 100 && estado.contraste === 100 && estado.saturacion === 100;
  const sinTocar = neutro && estado.zoom === 1 && estado.panX === 0 && estado.panY === 0 && estado.rotacion === 0;

  const boton = (extra) => ({
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
    textTransform: 'uppercase', padding: '9px 14px', borderRadius: 'var(--r)',
    border: '1px solid var(--ng-line)', background: '#fff', color: 'var(--ng-ink)',
    cursor: 'pointer', ...extra,
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(11,27,43,.6)', display: 'grid', placeItems: 'center', padding: 20,
    }}>
      <div className="ng-img-modal" style={{
        background: 'var(--ng-cloud)', borderRadius: 'var(--r-lg)',
        width: 'min(1040px, 100%)', maxHeight: '92vh', overflowY: 'auto',
        border: '1px solid var(--ng-line)',
      }}>

        {/* cabecera */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 22px', borderBottom: '1px solid var(--ng-line)', background: '#fff',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--ng-blue)',
            }}>Portada</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--ng-ink)' }}>
              Ajusta el encuadre
            </div>
          </div>
          <span style={{ flex: 1 }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', textAlign: 'right' }}>
            {archivo && archivo.name}
            {salida && <div>salida {salida.dw}×{salida.dh}</div>}
          </div>
        </div>

        {error && (
          <div style={{
            margin: '16px 22px 0', padding: '14px 16px', background: '#FDECEC',
            border: '1px solid #F5C2C2', borderLeft: '3px solid var(--danger)',
            borderRadius: 'var(--r)',
          }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ng-ink)', marginBottom: 6 }}>
              No se pudo procesar la imagen
            </div>
            <div style={{ fontSize: 13, color: 'var(--ng-steel)', marginBottom: 12, lineHeight: 1.5 }}>{error}</div>
            <button onClick={subirSinEditar} style={boton({ borderColor: 'var(--ng-blue)', color: 'var(--ng-blue)', fontWeight: 700 })}>
              Subir el archivo sin editar
            </button>
          </div>
        )}

        <div className="ng-img-cuerpo" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 22, padding: 22 }}>

          {/* lienzo */}
          <div>
            <div style={{
              position: 'relative', borderRadius: 'var(--r)', overflow: 'hidden',
              border: '1px solid var(--ng-line)', background: 'var(--ng-navy)',
              aspectRatio: '16 / 9',
            }}>
              <canvas
                ref={lienzoRef}
                width={ANCHO_VISTA}
                height={ALTO_VISTA}
                onPointerDown={alBajarPuntero}
                onPointerMove={alMoverPuntero}
                onPointerUp={alSoltarPuntero}
                onPointerCancel={alSoltarPuntero}
                onWheel={alRodar}
                style={{
                  display: 'block', width: '100%', height: '100%',
                  cursor: arrastreRef.current ? 'grabbing' : 'grab', touchAction: 'none',
                }} />
              {cargando && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                  color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12,
                }}>Cargando imagen…</div>
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', marginTop: 8, lineHeight: 1.5 }}>
              Arrastra para reposicionar · rueda del ratón para acercar.
              Lo que ves aquí es exactamente lo que se sube.
            </div>
          </div>

          {/* controles */}
          <div>
            <Deslizador etiqueta="Zoom" valor={Number(estado.zoom.toFixed(2))} min={ZOOM_MIN} max={ZOOM_MAX}
              paso={0.01} sufijo="×" onChange={(v) => set({ zoom: v })} />

            <button onClick={rotar} style={{ ...boton({ width: '100%', marginBottom: 18 }) }}>
              ⟳ Rotar 90°{estado.rotacion ? ` (${estado.rotacion}°)` : ''}
            </button>

            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--ng-steel)',
              paddingTop: 6, borderTop: '1px solid var(--ng-line)', marginBottom: 14,
            }}>Ajustes</div>

            {!hayFiltro.current && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B45309', marginBottom: 12, lineHeight: 1.5 }}>
                Este navegador no admite filtros en canvas. El recorte y la rotación sí funcionan.
              </div>
            )}

            <Deslizador etiqueta="Brillo" valor={estado.brillo} min={50} max={150} paso={1} sufijo="%"
              deshabilitado={!hayFiltro.current} onChange={(v) => set({ brillo: v })} />
            <Deslizador etiqueta="Contraste" valor={estado.contraste} min={50} max={150} paso={1} sufijo="%"
              deshabilitado={!hayFiltro.current} onChange={(v) => set({ contraste: v })} />
            <Deslizador etiqueta="Saturación" valor={estado.saturacion} min={0} max={200} paso={1} sufijo="%"
              deshabilitado={!hayFiltro.current} onChange={(v) => set({ saturacion: v })} />

            <button onClick={restablecer} disabled={sinTocar}
              style={boton({ width: '100%', opacity: sinTocar ? .45 : 1, cursor: sinTocar ? 'default' : 'pointer' })}>
              Restablecer
            </button>
          </div>
        </div>

        {/* acciones */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'flex-end', alignItems: 'center',
          padding: '14px 22px', borderTop: '1px solid var(--ng-line)', background: '#fff',
        }}>
          {sinTocar && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', marginRight: 'auto' }}>
              Encuadre automático centrado
            </span>
          )}
          <button onClick={onCancelar} disabled={procesando} style={boton({})}>Cancelar</button>
          <button onClick={aplicar} disabled={procesando || !img}
            style={boton({
              background: procesando || !img ? '#C7D2E0' : 'var(--ng-blue)',
              color: '#fff', border: 'none', fontWeight: 700, padding: '10px 20px',
            })}>
            {procesando ? 'Procesando…' : 'Aplicar y subir'}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ng-img-cuerpo { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

window.AdminEditorImagen = AdminEditorImagen;
