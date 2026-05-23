// ContactoTabs.jsx — 3 segmented forms (Productos / Manufactura / Industrial) + contact info column
const { useState: useStateCT } = React;

const inputStyle = {
  width: '100%', padding: '12px 14px',
  border: '1px solid var(--ng-line)', borderRadius: 'var(--r)',
  fontFamily: 'inherit', fontSize: 14, color: 'var(--ng-ink)',
  background: '#fff', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ng-ink)', marginBottom: 6 };

function FormSuccess({ onReset, accent }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--ng-line)',
      borderLeft: `4px solid ${accent === 'green' ? 'var(--ng-green)' : 'var(--ng-blue)'}`,
      borderRadius: 'var(--r-lg)',
      padding: 32,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--ng-green-50)', display: 'grid', placeItems: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--ng-ink)' }}>Solicitud recibida</h4>
      </div>
      <p style={{ fontSize: 15, color: 'var(--ng-steel)', margin: '0 0 18px', lineHeight: 1.55 }}>
        Un asesor técnico de Neugreen te contacta en <strong style={{ color: 'var(--ng-ink)' }}>menos de 24 h hábiles</strong>.
      </p>
      <button onClick={onReset} style={{
        background: 'transparent', border: '1px solid var(--ng-line)',
        color: 'var(--ng-ink)', fontWeight: 700, fontSize: 13,
        padding: '10px 18px', borderRadius: 'var(--r)', cursor: 'pointer',
      }}>Enviar otra solicitud</button>
    </div>
  );
}

function ProductosFormCT() {
  const lineaMap = { convencional: 'Limpieza convencional', enzimatica: 'Limpieza enzimática', desinfeccion: 'Desinfección', bodycare: 'Body Care', mascotas: 'Mascotas', aroma: 'Aroma Experience', jarciera: 'Jarciería e institucional' };
  const lineaParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('linea') : '';
  const lineaLabel = lineaMap[lineaParam] || '';
  const [f, setF] = useStateCT({ nombre: '', empresa: '', email: '', telefono: '', sector: '', mensaje: lineaLabel });
  const [s, setS] = useStateCT(false);
  if (s) return <FormSuccess onReset={() => { setS(false); setF({ nombre: '', empresa: '', email: '', telefono: '', sector: '', mensaje: '' }); }} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setS(true); }} data-lead-source="contacto-productos">
      <div className="ng-ctabs-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div><label style={labelStyle}>Nombre</label><input style={inputStyle} value={f.nombre} onChange={e => setF({ ...f, nombre: e.target.value })} placeholder="Tu nombre" required /></div>
        <div><label style={labelStyle}>Correo</label><input type="email" style={inputStyle} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="compras@empresa.com" required /></div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Teléfono <span style={{ fontWeight: 400, color: 'var(--ng-steel)' }}>(opcional)</span></label>
        <input type="tel" style={inputStyle} value={f.telefono} onChange={e => setF({ ...f, telefono: e.target.value })} placeholder="+52 ..." />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Empresa</label>
        <input style={inputStyle} value={f.empresa} onChange={e => setF({ ...f, empresa: e.target.value })} placeholder="Razón social" required />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Sector</label>
        <select style={inputStyle} value={f.sector} onChange={e => setF({ ...f, sector: e.target.value })} required>
          <option value="">Seleccionar...</option><option>Hospitalidad (Hotel / Restaurant)</option><option>Salud (Clínica / Consultorio)</option><option>Alimentos y Bebidas</option><option>Industrial / Manufactura</option><option>Oficinas</option><option>Otro</option>
        </select>
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>¿Qué línea o producto necesitas?</label>
        <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical', fontFamily: 'inherit' }} value={f.mensaje} onChange={e => setF({ ...f, mensaje: e.target.value })} placeholder="ej. Desinfectante enzimático para cocinas, volumen 200 L/mes..." />
      </div>
      <button type="submit" style={{
        width: '100%', background: 'var(--ng-blue)', color: '#fff',
        fontWeight: 700, fontSize: 15, padding: '14px 22px',
        borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        Solicitar cotización de productos
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>
    </form>
  );
}

function MaquilaFormCT() {
  const [f, setF] = useStateCT({ empresa: '', email: '', producto: '', volumen: '', formula: 'no', mensaje: '' });
  const [s, setS] = useStateCT(false);
  if (s) return <FormSuccess onReset={() => { setS(false); setF({ empresa: '', email: '', producto: '', volumen: '', formula: 'no', mensaje: '' }); }} accent="green" />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setS(true); }} data-lead-source="contacto-manufactura">
      <div className="ng-ctabs-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div><label style={labelStyle}>Empresa</label><input style={inputStyle} value={f.empresa} onChange={e => setF({ ...f, empresa: e.target.value })} placeholder="Razón social" required /></div>
        <div><label style={labelStyle}>Correo</label><input type="email" style={inputStyle} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="contacto@empresa.com" required /></div>
      </div>
      <div className="ng-ctabs-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Producto a manufacturar</label>
          <select style={inputStyle} value={f.producto} onChange={e => setF({ ...f, producto: e.target.value })} required>
            <option value="">Seleccionar...</option><option>Desinfectante</option><option>Detergente / multiusos</option><option>Enzimático</option><option>Lavandería</option><option>Aromatizante</option><option>Línea industrial</option><option>Otro</option>
          </select>
        </div>
        <div><label style={labelStyle}>Volumen / mes</label><input style={inputStyle} value={f.volumen} onChange={e => setF({ ...f, volumen: e.target.value })} placeholder="ej. 1 200 L" /></div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>¿Tienes formulación?</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[{ id: 'tiene', l: 'Sí, ya tengo' }, { id: 'parcial', l: 'Tengo pero la ajusto' }, { id: 'no', l: 'Desarrollo desde cero' }].map(opt => (
            <button key={opt.id} type="button" onClick={() => setF({ ...f, formula: opt.id })} style={{
              padding: '10px 14px', borderRadius: 'var(--r)',
              border: f.formula === opt.id ? '1px solid var(--ng-green)' : '1px solid var(--ng-line)',
              background: f.formula === opt.id ? 'var(--ng-green-50)' : '#fff',
              color: f.formula === opt.id ? 'var(--ng-green-700)' : 'var(--ng-ink)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', font: 'inherit',
            }}>{opt.l}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>Contexto adicional</label>
        <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical', fontFamily: 'inherit' }} value={f.mensaje} onChange={e => setF({ ...f, mensaje: e.target.value })} placeholder="Presentación deseada, normativa, claim del producto..." />
      </div>
      <button type="submit" style={{
        width: '100%', background: 'var(--ng-green)', color: '#fff',
        fontWeight: 700, fontSize: 15, padding: '14px 22px',
        borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        boxShadow: '0 12px 30px -10px rgba(65,190,67,.45)',
      }}>
        Enviar brief de manufactura
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>
      <p style={{ fontSize: 11, color: 'var(--ng-steel)', margin: '12px 0 0', textAlign: 'center' }}>NDA disponible al solicitarla</p>
    </form>
  );
}

function IndustrialFormCT() {
  const [f, setF] = useStateCT({ empresa: '', email: '', sector: '', problema: '', mensaje: '' });
  const [s, setS] = useStateCT(false);
  if (s) return <FormSuccess onReset={() => { setS(false); setF({ empresa: '', email: '', sector: '', problema: '', mensaje: '' }); }} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setS(true); }} data-lead-source="contacto-industrial">
      <div className="ng-ctabs-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div><label style={labelStyle}>Empresa</label><input style={inputStyle} value={f.empresa} onChange={e => setF({ ...f, empresa: e.target.value })} placeholder="Razón social" required /></div>
        <div><label style={labelStyle}>Correo</label><input type="email" style={inputStyle} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="ingeniero@empresa.com" required /></div>
      </div>
      <div className="ng-ctabs-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Sector</label>
          <select style={inputStyle} value={f.sector} onChange={e => setF({ ...f, sector: e.target.value })} required>
            <option value="">Seleccionar...</option><option>Alimenticio</option><option>Manufactura</option><option>Salud</option><option>PTAR municipal</option><option>Cárnicos / lácteos</option><option>Otro</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Problema</label>
          <select style={inputStyle} value={f.problema} onChange={e => setF({ ...f, problema: e.target.value })} required>
            <option value="">Seleccionar...</option><option>Tratamiento de agua</option><option>PTAR</option><option>Torres</option><option>Calderas</option><option>Olores</option><option>Dosificación</option><option>Ingeniería integral</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>Contexto técnico</label>
        <textarea style={{ ...inputStyle, minHeight: 96, resize: 'vertical', fontFamily: 'inherit' }} value={f.mensaje} onChange={e => setF({ ...f, mensaje: e.target.value })} placeholder="Caudal, parámetros conocidos, normativa, urgencia..." />
      </div>
      <button type="submit" style={{
        width: '100%', background: 'var(--ng-blue)', color: '#fff',
        fontWeight: 700, fontSize: 15, padding: '14px 22px',
        borderRadius: 'var(--r)', border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        Solicitar diagnóstico técnico
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>
      <p style={{ fontSize: 11, color: 'var(--ng-steel)', margin: '12px 0 0', textAlign: 'center' }}>Sin costo · sin compromiso</p>
    </form>
  );
}

function ContactoTabs() {
  const [active, setActive] = useStateCT(() => {
    if (typeof window === 'undefined') return 'productos';
    const p = new URLSearchParams(window.location.search);
    const tab = p.get('tab');
    if (tab === 'manufactura' || tab === 'industrial') return tab;
    const hash = window.location.hash.replace('#', '');
    if (hash === 'formulario-manufactura') return 'manufactura';
    if (hash === 'formulario-industrial') return 'industrial';
    return 'productos';
  });

  const tabs = [
    { id: 'productos',  label: 'Productos',  accent: 'blue',  sub: 'Cotización de catálogo' },
    { id: 'manufactura',    label: 'Manufactura',    accent: 'green', sub: 'Brief de marca privada' },
    { id: 'industrial', label: 'Industrial', accent: 'blue',  sub: 'Diagnóstico técnico' },
  ];

  return (
    <section style={{
      padding: '64px var(--section-pad-x) clamp(80px, 8vw, 120px)',
      background: 'var(--ng-cloud)',
    }}>
      <div className="ng-ctabs-layout" style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start',
      }}>
        {/* FORM column */}
        <div>
          {/* Tab strip */}
          <div role="tablist" style={{
            display: 'flex', gap: 0,
            borderBottom: '1px solid var(--ng-line)',
            marginBottom: 36,
          }}>
            {tabs.map(t => {
              const isA = t.id === active;
              const isG = t.accent === 'green';
              return (
                <button key={t.id} role="tab" aria-selected={isA} onClick={() => setActive(t.id)} style={{
                  padding: '20px 28px', background: 'transparent',
                  border: 'none', marginBottom: -1,
                  borderBottom: `2px solid ${isA ? (isG ? 'var(--ng-green)' : 'var(--ng-blue)') : 'transparent'}`,
                  fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
                  color: isA ? 'var(--ng-ink)' : 'var(--ng-steel)',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                  letterSpacing: '-0.01em',
                }}>
                  <span>{t.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: isA ? (isG ? 'var(--ng-green-700)' : 'var(--ng-blue)') : 'var(--ng-steel)', letterSpacing: '0.04em' }}>{t.sub}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div style={{
            background: '#fff', border: '1px solid var(--ng-line)',
            borderRadius: 'var(--r-xl)', padding: 36, boxShadow: 'var(--shadow-sm)',
          }}>
            {active === 'productos'  && <ProductosFormCT />}
            {active === 'manufactura'    && <MaquilaFormCT />}
            {active === 'industrial' && <IndustrialFormCT />}
          </div>
        </div>

        {/* INFO column */}
        <aside style={{ position: 'sticky', top: 96 }}>
          <div style={{
            background: 'var(--ng-navy)', color: '#fff',
            borderRadius: 'var(--r-xl)', padding: 32,
            marginBottom: 14,
          }}>
            <div className="eyebrow" style={{ color: '#A6C8FF', marginBottom: 14 }}>Canales directos</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '0 0 22px', color: '#fff', letterSpacing: '-0.015em' }}>
              Si prefieres hablar antes.
            </h3>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { ico: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>, label: 'WhatsApp ventas', value: '+52 444 256 5697', sub: '< 24 h hábiles' },
                { ico: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>, label: 'Ventas', value: 'ventas@neugreen.mx', sub: 'Cotizaciones y catálogo' },
                { ico: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>, label: 'Contacto general', value: 'contacto@neugreen.mx', sub: 'Manufactura + industrial' },
                { ico: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Planta SLP', value: 'San Luis Potosí', sub: 'Visita con cita previa' },
              ].map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.10)',
                    color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>{c.ico}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{c.value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>{c.sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'var(--ng-blue-50)',
            border: '1px solid var(--ng-blue-100)',
            borderRadius: 'var(--r-lg)',
            padding: '18px 22px',
            display: 'flex', alignItems: 'flex-start', gap: 12,
            fontSize: 13, color: 'var(--ng-ink)', lineHeight: 1.5,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            <div>
              <strong style={{ display: 'block', marginBottom: 4 }}>Horario de respuesta</strong>
              Lun – Vie · 8:00 – 18:00 CDMX. Solicitudes fuera de horario se atienden el siguiente día hábil.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

// Responsive styles
if (typeof document !== 'undefined' && !document.getElementById('ng-ctabs-responsive')) {
  const s = document.createElement('style');
  s.id = 'ng-ctabs-responsive';
  s.textContent = `
    @media (max-width: 768px) {
      .ng-ctabs-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
      .ng-ctabs-layout aside { position: static !important; }
      .ng-ctabs-2col { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
}

window.ContactoTabs = ContactoTabs;
