// ContactForm.jsx — interactive technical-quote form
const { useState: useStateForm } = React;

function ContactForm() {
  const [form, setForm] = useStateForm({ name: '', email: '', telefono: '', company: '', line: 'productos', message: '' });
  const [submitted, setSubmitted] = useStateForm(false);

  if (submitted) {
    return (
      <section id="contacto" style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', background: 'var(--ng-mist)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', background: '#fff', border: '1px solid var(--ng-line)', borderRadius: 'var(--r-xl)', padding: 56 }}>
          <div style={{ width: 64, height: 64, background: 'var(--ng-green-50)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px', color: 'var(--ng-ink)' }}>Solicitud recibida.</h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: '0 0 24px', lineHeight: 1.55 }}>
            Te respondemos en menos de <strong style={{ color: 'var(--ng-ink)' }}>24 h hábiles</strong> con cotización + ficha técnica.
          </p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', telefono: '', company: '', line: 'productos', message: '' }); }}
                  style={{ background: 'transparent', border: '1px solid var(--ng-line)', color: 'var(--ng-ink)', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 'var(--r)', cursor: 'pointer' }}>
            Enviar otra solicitud
          </button>
        </div>
      </section>
    );
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--ng-line)',
    borderRadius: 'var(--r)',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
    background: '#fff', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

  return (
    <section id="contacto" style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div className="ng-contact-layout" style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: 64,
        alignItems: 'start',
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>05 · Contacto</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 18px', color: 'var(--ng-ink)', lineHeight: 1.1 }}>
            ¿Necesitas una<br/>cotización técnica?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ng-steel)', margin: '0 0 28px', lineHeight: 1.55, maxWidth: 380 }}>
            Cuéntanos el problema. Te conectamos con un asesor especializado en tu línea — no con un call center.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r)', background: 'var(--ng-blue-50)', display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ng-ink)' }}><a href="https://www.neugreen.mx/whatsapp" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ng-ink)', textDecoration: 'none' }}>+52 444 256 5697</a></div>
                <div style={{ fontSize: 12, color: 'var(--ng-steel)' }}>Lun–Vie 8–18 h CDMX</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r)', background: 'var(--ng-green-50)', display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ng-ink)' }}>WhatsApp directo</div>
                <div style={{ fontSize: 12, color: 'var(--ng-steel)' }}>Respuesta &lt; 24 h hábiles</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r)', background: 'var(--ng-blue-50)', display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ng-ink)' }}>Planta SLP</div>
                <div style={{ fontSize: 12, color: 'var(--ng-steel)' }}>San Luis Potosí · visita con cita</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              style={{ background: '#fff', border: '1px solid var(--ng-line)', borderRadius: 'var(--r-xl)', padding: 36, boxShadow: 'var(--shadow-sm)' }}>
          <div className="ng-contact-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" />
            </div>
            <div>
              <label style={labelStyle}>Correo corporativo</label>
              <input type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="compras@empresa.com" />
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Teléfono <span style={{ fontWeight: 400, color: 'var(--ng-steel)' }}>(opcional)</span></label>
            <input type="tel" style={inputStyle} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+52 ..." />
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Empresa</label>
            <input style={inputStyle} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Razón social" />
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Línea de interés</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'productos', label: 'Productos de línea' },
                { id: 'manufactura', label: 'Manufactura / marca privada' },
                { id: 'industrial', label: 'Industrial / agua' },
              ].map(opt => (
                <button key={opt.id} type="button"
                        onClick={() => setForm({ ...form, line: opt.id })}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 'var(--r)',
                          border: form.line === opt.id ? '1px solid var(--ng-blue)' : '1px solid var(--ng-line)',
                          background: form.line === opt.id ? 'var(--ng-blue-50)' : '#fff',
                          color: form.line === opt.id ? 'var(--ng-blue)' : 'var(--ng-ink)',
                          fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={labelStyle}>Cuéntanos el problema</label>
            <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical', fontFamily: 'inherit' }}
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Proceso, volumen estimado, normativa aplicable..."></textarea>
          </div>

          <div className="ng-contact-submit-row" style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: 'var(--ng-steel)', maxWidth: 280 }}>
              Te respondemos en <strong style={{ color: 'var(--ng-ink)' }}>menos de 24 h hábiles</strong>.
            </div>
            <button type="submit" className="ng-contact-submit-btn" style={{
              background: 'var(--ng-blue)', color: '#fff',
              fontWeight: 700, fontSize: 14, padding: '14px 26px',
              borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Solicitar cotización
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ng-contact-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ng-contact-2col { grid-template-columns: 1fr !important; }
          .ng-contact-submit-row { flex-direction: column !important; align-items: stretch !important; }
          .ng-contact-submit-btn { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}

window.ContactForm = ContactForm;
