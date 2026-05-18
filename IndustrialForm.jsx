// IndustrialForm.jsx — "solicitar diagnóstico técnico gratuito"
const { useState: useStateInd } = React;

function IndustrialForm() {
  const [form, setForm] = useStateInd({
    empresa: '', contacto: '', email: '', telefono: '',
    sector: '', problema: '', parametros: '', mensaje: '',
  });
  const [sent, setSent] = useStateInd(false);

  const input = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
    background: '#fff', boxSizing: 'border-box',
  };
  const label = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

  if (sent) {
    return (
      <section id="diagnostico" style={{ padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)', background: 'var(--ng-navy)' }}>
        <div style={{
          maxWidth: 680, margin: '0 auto',
          background: '#102942', border: '1px solid #1f3d5e',
          borderRadius: 'var(--r-xl)', padding: 56, textAlign: 'center',
          color: '#fff',
        }}>
          <div style={{ width: 72, height: 72, background: 'rgba(65,190,67,.18)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 22px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, margin: '0 0 12px', color: '#fff', letterSpacing: '-0.02em' }}>
            Diagnóstico solicitado.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', margin: 0, lineHeight: 1.55 }}>
            Un ingeniero de procesos te contacta en <strong style={{ color: '#fff' }}>menos de 24 h hábiles</strong> para agendar visita o llamada técnica.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostico" style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-navy)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-200px', left: '-200px',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,85,184,.20) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}></div>
      <div style={{
        position: 'absolute', bottom: '-200px', right: '-200px',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(65,190,67,.10) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}></div>

      <div className="ng-ind-form-layout" style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.4fr',
        gap: 64, alignItems: 'start',
        position: 'relative',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px',
            background: 'rgba(65,190,67,.15)',
            border: '1px solid rgba(65,190,67,.3)',
            borderRadius: 999,
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--ng-green)',
            marginBottom: 16,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ng-green)' }}></span>
            Diagnóstico sin costo
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 18px',
            color: '#fff',
            lineHeight: 1.05,
          }}>
            Cuéntanos el problema.<br/>Te enviamos un plan.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.78)', margin: '0 0 28px', lineHeight: 1.55, maxWidth: 420 }}>
            Sin compromiso de contratación. Recibirás un análisis técnico inicial con parámetros, riesgos y dosis sugerida — más una propuesta económica si decides avanzar.
          </p>

          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Análisis inicial gratuito + reporte ejecutivo',
              'Ingeniero asignado por sector industrial',
              'Visita de campo dentro del Bajío sin costo',
              'NDA mutua antes de compartir datos sensibles',
            ].map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#fff' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              data-lead-source="industrial-diagnostico-form"
              style={{
                background: '#102942',
                border: '1px solid #1f3d5e',
                borderRadius: 'var(--r-xl)',
                padding: 36,
              }}>
          <div className="ng-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ ...label, color: '#fff' }}>Empresa</label>
              <input style={input} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Razón social" required />
            </div>
            <div>
              <label style={{ ...label, color: '#fff' }}>Contacto</label>
              <input style={input} value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })} placeholder="Nombre y puesto" />
            </div>
          </div>

          <div className="ng-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ ...label, color: '#fff' }}>Correo</label>
              <input type="email" style={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ingeniero@empresa.com" required />
            </div>
            <div>
              <label style={{ ...label, color: '#fff' }}>WhatsApp</label>
              <input style={input} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+52 ..." />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ ...label, color: '#fff' }}>Sector</label>
            <select style={input} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} required>
              <option value="">Seleccionar...</option>
              <option>Alimenticio</option>
              <option>Manufactura</option>
              <option>Salud</option>
              <option>PTAR municipal</option>
              <option>Hotel / hospitalidad</option>
              <option>Cárnicos / lácteos</option>
              <option>Otro</option>
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ ...label, color: '#fff' }}>Problema actual / proceso</label>
            <select style={input} value={form.problema} onChange={(e) => setForm({ ...form, problema: e.target.value })} required>
              <option value="">Seleccionar...</option>
              <option>Tratamiento de agua de proceso</option>
              <option>PTAR · cumplimiento NOM-001</option>
              <option>Torres de enfriamiento</option>
              <option>Calderas / vapor</option>
              <option>Control de olores</option>
              <option>Dosificación / instrumentación</option>
              <option>Ingeniería de proyecto integral</option>
              <option>Otro</option>
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ ...label, color: '#fff' }}>Parámetros conocidos (opcional)</label>
            <input style={input} value={form.parametros} onChange={(e) => setForm({ ...form, parametros: e.target.value })} placeholder="ej. caudal, DQO, dureza, pH, T°..." />
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={{ ...label, color: '#fff' }}>Mensaje libre</label>
            <textarea style={{ ...input, minHeight: 100, resize: 'vertical', fontFamily: 'inherit' }}
                      value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Contexto: tamaño operación, problema cronológico, urgencia, normativa aplicable..."></textarea>
          </div>

          <button type="submit" style={{
            width: '100%',
            background: 'var(--ng-green)', color: '#fff',
            fontWeight: 700, fontSize: 15,
            padding: '16px 22px', borderRadius: 'var(--r)',
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 12px 30px -10px rgba(65,190,67,.55)',
          }}>
            Solicitar diagnóstico técnico
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', margin: '12px 0 0', textAlign: 'center', letterSpacing: '0.04em' }}>
            Respuesta &lt; 24 h hábiles · sin costo · sin compromiso
          </p>
        </form>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ng-ind-form-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ng-form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.IndustrialForm = IndustrialForm;
