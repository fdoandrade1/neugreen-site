// CTAStrip.jsx — pre-footer azul CTA strip
function CTAStrip() {
  return (
    <section style={{ padding: '0 var(--section-pad-x) 80px', background: 'var(--ng-cloud)' }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        background: 'var(--ng-blue)',
        color: '#fff',
        borderRadius: 'var(--r-xl)',
        padding: '52px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 32,
        flexWrap: 'wrap',
        boxShadow: '0 20px 50px -20px rgba(0,63,197,.4)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -40, top: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(65,190,67,.18)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}></div>

        <div style={{ position: 'relative' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 800,
            margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.15,
            color: '#fff',
          }}>
            ¿Listo para reducir paros y químico residual?
          </h3>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,.85)',
            margin: 0, maxWidth: 560, lineHeight: 1.5,
          }}>
            Diagnóstico técnico sin costo · planta propia SLP · respuesta 24 h hábiles.
          </p>
          <div style={{
            display: 'flex', gap: 24, marginTop: 16,
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'rgba(255,255,255,.7)',
            flexWrap: 'wrap',
          }}>
            <span>ventas@neugreen.mx</span>
            <span>+52 444 256 5697</span>
            <span>www.neugreen.mx</span>
          </div>
        </div>

        <a href="https://wa.me/524442565697" target="_blank" rel="noopener" style={{
          background: 'var(--ng-green)', color: '#fff',
          fontWeight: 700, fontSize: 15, padding: '18px 28px',
          borderRadius: 'var(--r-lg)', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          boxShadow: '0 12px 30px -10px rgba(65,190,67,.55)',
          flexShrink: 0, textDecoration: 'none',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.7-3.3-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.1 3.2 5.2 4.5 1.9.8 2.7.9 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 .5C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.7L.4 23.5l5.9-1.6c1.7.9 3.7 1.4 5.7 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5"/></svg>
          WhatsApp directo
        </a>
      </div>
    </section>
  );
}

window.CTAStrip = CTAStrip;
