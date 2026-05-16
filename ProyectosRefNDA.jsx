// ProyectosRefNDA.jsx — "request reference under NDA" block
const { useState: useStatePR } = React;

function ProyectosRefNDA() {
  const [f, setF] = useStatePR({ empresa: '', email: '', linea: '', mensaje: '' });
  const [s, setS] = useStatePR(false);

  const input = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
    background: '#fff', boxSizing: 'border-box',
  };
  const lab = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.2fr',
        gap: 56, alignItems: 'start',
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Referencia bajo NDA</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800, letterSpacing: '-0.02em',
            margin: '0 0 18px', color: 'var(--ng-ink)', lineHeight: 1.1,
          }}>
            ¿Necesitas verificar con un cliente real?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: '0 0 24px', lineHeight: 1.55, maxWidth: 420 }}>
            Muchos clientes nos refieren a otros compradores B2B. Firmamos NDA mutua y agendamos una llamada de referencia con alguien que ya pasó por el problema que tú estás resolviendo.
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Conversación 30 min con cliente referencia',
              'NDA mutua firmada antes de cualquier contacto',
              'Sector y tamaño operación similares',
              'Sin pago por la conexión',
            ].map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--ng-ink)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {s ? (
          <div style={{ background: '#fff', border: '1px solid var(--ng-line)', borderLeft: '4px solid var(--ng-green)', borderRadius: 'var(--r-lg)', padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ng-green-50)', display: 'grid', placeItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--ng-ink)' }}>Solicitud recibida</h4>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
              Te enviamos la NDA mutua para revisión en menos de <strong style={{ color: 'var(--ng-ink)' }}>24 h hábiles</strong>. Una vez firmada, coordinamos la llamada con el cliente referencia adecuado.
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setS(true); }}
                data-lead-source="proyectos-ref-nda"
                style={{
                  background: '#fff', border: '1px solid var(--ng-line)',
                  borderRadius: 'var(--r-xl)', padding: 32, boxShadow: 'var(--shadow-sm)',
                }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div><label style={lab}>Empresa</label><input style={input} value={f.empresa} onChange={e => setF({ ...f, empresa: e.target.value })} placeholder="Razón social" required /></div>
              <div><label style={lab}>Correo corporativo</label><input type="email" style={input} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="compras@empresa.com" required /></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={lab}>Línea a verificar</label>
              <select style={input} value={f.linea} onChange={e => setF({ ...f, linea: e.target.value })} required>
                <option value="">Seleccionar...</option>
                <option>Productos</option>
                <option>Manufactura / marca privada</option>
                <option>Industrial / tratamiento de agua</option>
              </select>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={lab}>Caso o sector que te interesa</label>
              <textarea style={{ ...input, minHeight: 96, resize: 'vertical', fontFamily: 'inherit' }} value={f.mensaje} onChange={e => setF({ ...f, mensaje: e.target.value })} placeholder="ej. PTAR en planta de cárnicos, hotel boutique, distribuidor regional..." />
            </div>
            <button type="submit" style={{
              width: '100%', background: 'var(--ng-blue)', color: '#fff',
              fontWeight: 700, fontSize: 15, padding: '14px 22px',
              borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              Solicitar referencia
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <p style={{ fontSize: 11, color: 'var(--ng-steel)', margin: '12px 0 0', textAlign: 'center' }}>NDA mutua incluida</p>
          </form>
        )}
      </div>
    </section>
  );
}

window.ProyectosRefNDA = ProyectosRefNDA;
