// ProductLines.jsx — light grid of 6 product-line cards
function ProductLineCard({ icon, title, body, items, accent }) {
  const isGreen = accent === 'green';
  return (
    <div className="ng-card-light" style={{
      background: 'var(--ng-white)',
      border: '1px solid var(--ng-line)',
      borderRadius: 'var(--r-lg)',
      padding: 28,
      transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 48, height: 48,
        background: isGreen ? 'var(--ng-green-50)' : 'var(--ng-blue-50)',
        color: isGreen ? 'var(--ng-green-700)' : 'var(--ng-blue)',
        borderRadius: 'var(--r)',
        display: 'grid', placeItems: 'center',
        marginBottom: 18,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 700,
        margin: '0 0 8px',
        color: 'var(--ng-ink)',
        letterSpacing: '-0.01em',
      }}>{title}</h3>
      <p style={{
        fontSize: 14, lineHeight: 1.55,
        color: 'var(--ng-steel)', margin: '0 0 14px',
      }}>{body}</p>
      <ul style={{
        margin: 0, padding: 0, listStyle: 'none',
        fontSize: 13, color: 'var(--ng-ink)', lineHeight: 1.7,
      }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

const I = {
  droplet: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/></svg>,
  flask:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v3H9z"/><path d="M9 6v4l-5 9a2 2 0 0 0 1.8 2.9H18.2A2 2 0 0 0 20 19l-5-9V6"/><path d="M7 14h10"/></svg>,
  spray:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v6H9z"/><path d="M9 9l-3 4v8h12v-8l-3-4"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="3" r="1"/><circle cx="6" cy="4" r="1"/></svg>,
  shirt:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.4 6.4 16 4l-4 3-4-3-4.4 2.4L6 11l2-1v11h8V10l2 1 2.4-4.6Z"/></svg>,
  broom:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 8 12 15"/><path d="M14 17 9 22h11l-1-7-5 2Z"/><path d="M14 5l5-1 1 4-5 1Z"/></svg>,
  shield:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>,
};

function ProductLines() {
  const lines = [
    { icon: I.flask, title: 'Enzimáticos', body: 'Para grasas, olores y materia orgánica en cocinas industriales.', items: ['Desengrasante 5L / 20L', 'Bioactivador trampas', 'Eliminador de olor'], accent: 'green' },
    { icon: I.shield, title: 'Desinfectantes', body: 'Sanitización de superficies y procesos con cumplimiento COFEPRIS.', items: ['Cuaternarios', 'Ácido peracético', 'Sanitizantes alimenticios'], accent: 'blue' },
    { icon: I.droplet, title: 'Multiusos', body: 'Limpiadores concentrados para piso, vidrio y superficies generales.', items: ['Aromatizante', 'Limpiavidrios', 'Multiusos concentrado'], accent: 'blue' },
    { icon: I.shirt, title: 'Lavandería', body: 'Línea completa para lavandería industrial y hotelera.', items: ['Detergente líquido', 'Suavizante', 'Blanqueador'], accent: 'blue' },
    { icon: I.broom, title: 'Jarciería', body: 'Mopas, escobas, fibras, trapeadores y consumibles.', items: ['Mopas microfibra', 'Cubetas', 'Fibras + esponjas'], accent: 'green' },
    { icon: I.spray, title: 'Consumibles', body: 'Dispensadores, garrafas, dosificadores y empaque.', items: ['Garrafas 5L / 20L / 200L', 'Dosificadores', 'Etiqueta privada'], accent: 'blue' },
  ];

  return (
    <section style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>01 · Productos de línea</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', color: 'var(--ng-ink)' }}>
              120+ SKUs activos.<br/>Inventario, no catálogo.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--ng-steel)', maxWidth: 560, margin: 0, lineHeight: 1.55 }}>
              Seis familias para limpieza profesional, lavandería y cocinas industriales. Stock activo en planta SLP — entrega 48 h FOB.
            </p>
          </div>
          <button style={{
            background: 'transparent', color: 'var(--ng-blue)',
            border: '1px solid var(--ng-blue)',
            fontWeight: 700, fontSize: 14, padding: '12px 22px',
            borderRadius: 'var(--r)', cursor: 'pointer',
          }}>Ver catálogo completo</button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {lines.map((l, i) => <ProductLineCard key={i} {...l} />)}
        </div>
      </div>
    </section>
  );
}

window.ProductLines = ProductLines;
