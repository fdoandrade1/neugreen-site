// AsesorBlock.jsx — generic "¿no sabes cuál?" block with general form
const { useState: useStateAsesor } = React;

function AsesorBlock() {
  const [form, setForm] = useStateAsesor({ name: '', empresa: '', email: '', mensaje: '' });
  const [sent, setSent] = useStateAsesor(false);

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
    background: '#fff', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

  return (
    <section style={{
      padding: 'clamp(72px, 8vw, 112px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 64, alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>¿No sabes cuál necesitas?</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Habla con un asesor técnico.
          </h2>
          <p style={{
            fontSize: 17, color: 'var(--ng-steel)',
            margin: '0 0 28px', lineHeight: 1.55, maxWidth: 480,
          }}>
            Te conectamos con el especialista correcto en menos de 24 h hábiles. Diagnóstico inicial gratuito — sin compromiso, sin call center.
          </p>

          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Identificamos la línea adecuada para tu operación',
              'Te enviamos fichas técnicas y HDS sin pedírtelas',
              'Sugerimos dosis estimada por metro cuadrado o por proceso',
              'Sin compromiso de compra ni minimun de cotización',
            ].map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: 'var(--ng-ink)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {sent ? (
          <div style={{
            background: '#fff', border: '1px solid var(--ng-line)',
            borderRadius: 'var(--r-xl)', padding: 40, textAlign: 'center',
          }}>
            <div style={{ width: 64, height: 64, background: 'var(--ng-green-50)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, margin: '0 0 10px', color: 'var(--ng-ink)' }}>Solicitud recibida.</h3>
            <p style={{ fontSize: 15, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>
              Un asesor técnico te contacta en <strong style={{ color: 'var(--ng-ink)' }}>menos de 24 h hábiles</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                data-lead-source="productos-asesor-general"
                style={{
                  background: '#fff', border: '1px solid var(--ng-line)',
                  borderRadius: 'var(--r-xl)', padding: 36, boxShadow: 'var(--shadow-sm)',
                }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Nombre</label>
                <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" />
              </div>
              <div>
                <label style={labelStyle}>Empresa</label>
                <input style={inputStyle} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Razón social" />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Correo corporativo</label>
              <input type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="compras@empresa.com" />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Cuéntanos qué necesitas</label>
              <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical', fontFamily: 'inherit' }}
                        value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        placeholder="Tipo de operación, problema actual, sector..."></textarea>
            </div>
            <button type="submit" style={{
              width: '100%',
              background: 'var(--ng-blue)', color: '#fff',
              fontWeight: 700, fontSize: 15,
              padding: '14px 22px', borderRadius: 'var(--r)',
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              Hablar con un asesor
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

window.AsesorBlock = AsesorBlock;
