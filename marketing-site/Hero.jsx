// Hero.jsx — homepage hero with animated orbit/atom visual centered on the Neugreen drop.
// Left: copy + CTAs + trust row. Right: animated SVG (3 tilted orbits, atoms doing
// animateMotion, drop in center) with 3 floating stat cards.

function OrbitVisual() {
  // 3 tilted ellipses. Each renders the orbit line + a satellite atom doing animateMotion.
  // Two of the orbits get a second smaller dot to feel busier without being chaotic.
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, aspectRatio: '1', margin: '0 auto' }}>
      {/* Soft halo behind drop */}
      <div style={{
        position: 'absolute', inset: '28% 28%',
        background: 'radial-gradient(circle, rgba(65,190,67,.12) 0%, rgba(0,85,184,.08) 60%, transparent 80%)',
        borderRadius: '50%',
        filter: 'blur(10px)',
      }}></div>

      <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
        {/* ─────────── ORBIT 1 — large, tilted -22°, blue ─────────── */}
        <g transform="rotate(-22 250 250)">
          <path id="ng-orbit-1"
                d="M 60 250 A 190 70 0 1 0 440 250 A 190 70 0 1 0 60 250 Z"
                fill="none" stroke="rgba(0,85,184,0.45)" strokeWidth="1.4"/>
          <circle r="7" fill="#0055b8">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#ng-orbit-1"/>
            </animateMotion>
            <animate attributeName="r" values="7;8;7" dur="9s" repeatCount="indefinite"/>
          </circle>
          <circle r="3" fill="#0055b8" opacity="0.55">
            <animateMotion dur="9s" begin="-4.5s" repeatCount="indefinite">
              <mpath href="#ng-orbit-1"/>
            </animateMotion>
          </circle>
        </g>

        {/* ─────────── ORBIT 2 — medium, tilted 28°, green ─────────── */}
        <g transform="rotate(28 250 250)">
          <path id="ng-orbit-2"
                d="M 90 250 A 160 55 0 1 0 410 250 A 160 55 0 1 0 90 250 Z"
                fill="none" stroke="rgba(65,190,67,0.55)" strokeWidth="1.4"/>
          <circle r="6.5" fill="none" stroke="#41BE43" strokeWidth="2.5">
            <animateMotion dur="7s" repeatCount="indefinite">
              <mpath href="#ng-orbit-2"/>
            </animateMotion>
          </circle>
          <circle r="3" fill="#41BE43" opacity="0.7">
            <animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite">
              <mpath href="#ng-orbit-2"/>
            </animateMotion>
          </circle>
        </g>

        {/* ─────────── ORBIT 3 — wider, tilted 72°, blue dashed ─────────── */}
        <g transform="rotate(72 250 250)">
          <path id="ng-orbit-3"
                d="M 70 250 A 180 85 0 1 0 430 250 A 180 85 0 1 0 70 250 Z"
                fill="none" stroke="rgba(0,85,184,0.30)" strokeWidth="1.2"
                strokeDasharray="3 5"/>
          <circle r="7" fill="#fff" stroke="#0055b8" strokeWidth="2.5">
            <animateMotion dur="11s" repeatCount="indefinite">
              <mpath href="#ng-orbit-3"/>
            </animateMotion>
          </circle>
        </g>

        {/* ─────────── DROP — Neugreen symbol simplified ─────────── */}
        <g transform="translate(250 250)">
          {/* subtle ground shadow */}
          <ellipse cx="0" cy="115" rx="60" ry="6" fill="rgba(0,85,184,0.08)"/>

          {/* drop outline */}
          <path
            d="M 0 -110
               C 50 -60, 78 -10, 78 30
               A 78 78 0 1 1 -78 30
               C -78 -10, -50 -60, 0 -110 Z"
            fill="rgba(255,255,255,0.92)"
            stroke="#0055b8"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* inner highlight stroke */}
          <path
            d="M -22 -20 C -28 8, -22 30, -10 42"
            fill="none"
            stroke="#0055b8"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
      </svg>

      {/* ─── Floating stat cards (HTML, absolutely positioned over SVG) ─── */}
      <div style={{
        position: 'absolute', top: '-4%', left: '14%',
        background: '#fff', border: '1px solid var(--ng-line)',
        borderRadius: 14, padding: '14px 20px',
        boxShadow: 'var(--shadow)', zIndex: 2,
        animation: 'ng-float-a 6s ease-in-out infinite',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1, color: 'var(--ng-blue)', letterSpacing: '-0.02em' }}>+120</div>
        <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginTop: 4 }}>SKUs disponibles</div>
      </div>

      <div style={{
        position: 'absolute', top: '42%', right: '-4%',
        background: '#fff', border: '1px solid var(--ng-line)',
        borderRadius: 14, padding: '14px 20px',
        boxShadow: 'var(--shadow)', zIndex: 2,
        animation: 'ng-float-b 7s ease-in-out infinite',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1, color: 'var(--ng-green-700)', letterSpacing: '-0.02em' }}>24 h</div>
        <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginTop: 4 }}>Respuesta local SLP</div>
      </div>

      <div style={{
        position: 'absolute', bottom: '-2%', left: '24%',
        background: '#fff', border: '1px solid var(--ng-line)',
        borderRadius: 14, padding: '14px 20px',
        boxShadow: 'var(--shadow)', zIndex: 2,
        animation: 'ng-float-a 8s ease-in-out infinite reverse',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1, color: 'var(--ng-blue)', letterSpacing: '-0.02em' }}>+15</div>
        <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginTop: 4 }}>Años de experiencia</div>
      </div>

      {/* float keyframes — injected once */}
      <style>{`
        @keyframes ng-float-a {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ng-float-b {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}

function Hero({ eyebrow, title, lead, ctaPrimary, ctaSecondary, onCtaClick }) {
  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(80px, 9vw, 128px) var(--section-pad-x) clamp(64px, 7vw, 96px)',
      background: 'var(--ng-cloud)',
      overflow: 'hidden',
    }}>
      {/* corner accent — subtle radial */}
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,85,184,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}></div>

      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        gap: 'clamp(40px, 6vw, 96px)',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* LEFT — copy + CTAs */}
        <div>
          <div style={{
            fontSize: 12, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--ng-blue)', marginBottom: 20,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 14px',
            background: 'var(--ng-blue-50)',
            borderRadius: 999,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--ng-green)',
              boxShadow: '0 0 0 4px rgba(65,190,67,.18)',
            }}></span>
            {eyebrow}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5.2vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            margin: '0 0 22px',
            color: 'var(--ng-ink)',
            textWrap: 'balance',
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--ng-steel)',
            maxWidth: 540,
            margin: '0 0 36px',
          }}>
            {lead}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => onCtaClick && onCtaClick('primary')}
                    data-lead-source="hero-primary"
                    style={{
                      background: 'var(--ng-blue)', color: '#fff',
                      fontFamily: 'var(--font-text)', fontWeight: 700, fontSize: 15,
                      padding: '16px 28px', borderRadius: 'var(--r-lg)',
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 12px 30px -10px rgba(0,85,184,.5)',
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                    }}>
              {ctaPrimary || 'Habla con un asesor técnico'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => onCtaClick && onCtaClick('secondary')}
                    data-lead-source="hero-secondary"
                    style={{
                      background: '#fff',
                      color: 'var(--ng-ink)',
                      border: '1px solid var(--ng-line)',
                      fontFamily: 'var(--font-text)', fontWeight: 700, fontSize: 15,
                      padding: '16px 28px', borderRadius: 'var(--r-lg)',
                      cursor: 'pointer',
                    }}>
              {ctaSecondary || 'Conoce nuestras líneas'}
            </button>
          </div>

          {/* trust row */}
          <div style={{
            display: 'flex', gap: 24, flexWrap: 'wrap',
            marginTop: 56, paddingTop: 28,
            borderTop: '1px solid var(--ng-line)',
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ng-steel)', fontWeight: 600,
          }}>
            <span>COFEPRIS</span>
            <span>NOM-001</span>
            <span>FDA / EPA</span>
            <span>Planta SLP</span>
          </div>
        </div>

        {/* RIGHT — animated orbit visual */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <OrbitVisual />
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
