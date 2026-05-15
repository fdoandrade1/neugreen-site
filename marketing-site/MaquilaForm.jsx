// MaquilaForm.jsx — strong form for maquila intake
const { useState: useStateMaq } = React;

function MaquilaForm() {
  const [form, setForm] = useStateMaq({
    empresa: '', contacto: '', email: '', telefono: '',
    tipoProducto: '', volumen: '',
    formula: 'no', plazo: '', mensaje: '',
  });
  const [sent, setSent] = useStateMaq(false);

  const input = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
    background: '#fff', boxSizing: 'border-box',
  };
  const label = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

  if (sent) {
    return (
      <section id="form" style={{ padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)', background: 'var(--ng-mist)' }}>
        <div style={{
          maxWidth: 680, margin: '0 auto',
          background: '#fff', border: '1px solid var(--ng-line)',
          borderRadius: 'var(--r-xl)', padding: 56, textAlign: 'center',
        }}>
          <div style={{ width: 72, height: 72, background: 'var(--ng-green-50)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 22px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, margin: '0 0 12px', color: 'var(--ng-ink)', letterSpacing: '-0.02em' }}>
            Brief recibido.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: '0 0 24px', lineHeight: 1.55 }}>
            Un ingeniero de planta te contacta en <strong style={{ color: 'var(--ng-ink)' }}>menos de 24 h hábiles</strong> con análisis de viabilidad y cotización preliminar.
          </p>
          <button onClick={() => { setSent(false); setForm({ empresa: '', contacto: '', email: '', telefono: '', tipoProducto: '', volumen: '', formula: 'no', plazo: '', mensaje: '' }); }}
                  style={{ background: 'transparent', border: '1px solid var(--ng-line)', color: 'var(--ng-ink)', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 'var(--r)', cursor: 'pointer' }}>
            Enviar otro brief
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="form" style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.4fr',
        gap: 64, alignItems: 'start',
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--ng-green-700)', marginBottom: 12 }}>Iniciar maquila</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 18px',
            color: 'var(--ng-ink)',
            lineHeight: 1.1,
          }}>
            Pasa de brief a propuesta en 24 h.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: '0 0 28px', lineHeight: 1.55, maxWidth: 380 }}>
            Cuéntanos qué producto quieres maquilar, qué volumen estimas y si tienes formulación o necesitas desarrollo. NDA mutua firmable en cualquier punto.
          </p>

          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Análisis de viabilidad técnica gratuito',
              'Estimado preliminar de costo y MOQ',
              'NDA mutua disponible antes de compartir fórmula',
              'Sin pago hasta validar prototipo',
            ].map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--ng-ink)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              data-lead-source="maquila-form"
              style={{
                background: '#fff', border: '1px solid var(--ng-line)',
                borderRadius: 'var(--r-xl)', padding: 36, boxShadow: 'var(--shadow-sm)',
              }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={label}>Empresa</label>
              <input style={input} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Razón social" required />
            </div>
            <div>
              <label style={label}>Contacto</label>
              <input style={input} value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })} placeholder="Nombre y puesto" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={label}>Correo corporativo</label>
              <input type="email" style={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="contacto@empresa.com" required />
            </div>
            <div>
              <label style={label}>WhatsApp</label>
              <input style={input} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+52 ..." />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={label}>Tipo de producto a maquilar</label>
            <select style={input} value={form.tipoProducto} onChange={(e) => setForm({ ...form, tipoProducto: e.target.value })} required>
              <option value="">Seleccionar...</option>
              <option>Desinfectante / sanitizante</option>
              <option>Detergente o multiusos</option>
              <option>Enzimático / biotecnológico</option>
              <option>Lavandería profesional</option>
              <option>Aromatizante</option>
              <option>Línea industrial (CIP, agua, torres)</option>
              <option>Otro / personalizado</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={label}>Volumen estimado / mes</label>
              <input style={input} value={form.volumen} onChange={(e) => setForm({ ...form, volumen: e.target.value })} placeholder="ej. 1 200 L" />
            </div>
            <div>
              <label style={label}>Plazo deseado</label>
              <select style={input} value={form.plazo} onChange={(e) => setForm({ ...form, plazo: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option>Urgente (&lt; 30 días)</option>
                <option>1 – 2 meses</option>
                <option>3 – 6 meses</option>
                <option>Exploratorio</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={label}>¿Tienes formulación o necesitas desarrollo?</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'tiene', label: 'Ya tengo fórmula' },
                { id: 'parcial', label: 'Tengo fórmula pero la quiero ajustar' },
                { id: 'no', label: 'Necesito desarrollo desde cero' },
              ].map(opt => (
                <button key={opt.id} type="button"
                        onClick={() => setForm({ ...form, formula: opt.id })}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--r)',
                          border: form.formula === opt.id ? '1px solid var(--ng-green)' : '1px solid var(--ng-line)',
                          background: form.formula === opt.id ? 'var(--ng-green-50)' : '#fff',
                          color: form.formula === opt.id ? 'var(--ng-green-700)' : 'var(--ng-ink)',
                          fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          font: 'inherit',
                        }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={label}>Mensaje libre</label>
            <textarea style={{ ...input, minHeight: 100, resize: 'vertical', fontFamily: 'inherit' }}
                      value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Contexto adicional: presentación deseada, normativa aplicable, claim del producto, antecedentes..."></textarea>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 12, color: 'var(--ng-steel)' }}>
              Respuesta &lt; 24 h hábiles · NDA disponible al solicitarla
            </div>
            <button type="submit" style={{
              background: 'var(--ng-green)', color: '#fff',
              fontWeight: 700, fontSize: 15,
              padding: '14px 26px', borderRadius: 'var(--r)',
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: '0 12px 30px -10px rgba(65,190,67,.45)',
            }}>
              Enviar brief de maquila
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

window.MaquilaForm = MaquilaForm;
