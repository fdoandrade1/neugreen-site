// ContactoMapa.jsx — mapa de ubicación de la planta Neugreen en SLP
function ContactoMapa() {
  return (
    <section style={{
      padding: '0 var(--section-pad-x) 0',
      background: 'var(--ng-cloud)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', paddingBottom: 48 }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--ng-line)' }}>
          <iframe
            src="https://maps.google.com/maps?q=22.210824,-101.008558&z=16&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Neugreen SLP"
          />
        </div>
        <div style={{
          marginTop: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 13, color: 'var(--ng-steel)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ng-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Prol. Pánfilo Natera 501-A, La Angostura, Mexquitic de Carmona, SLP, CP. 78483
          </div>
          <a
            href="https://maps.app.goo.gl/pCtSSjyaLnZaThWV9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13, fontWeight: 600, color: 'var(--ng-blue)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            Ver en Google Maps
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
window.ContactoMapa = ContactoMapa;
