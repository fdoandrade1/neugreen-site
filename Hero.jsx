// Hero.jsx — homepage hero with animated orbit/atom visual centered on the Neugreen drop.
// Left: copy + CTAs + trust row. Right: animated SVG (3 tilted orbits, atoms doing
// animateMotion, drop in center) with 3 floating stat cards.

function OrbitVisual() {
  // 3 tilted ellipses. Each orbit is split into BACK + FRONT arcs so the drop
  // sits visually inside the molecular sphere.
  //
  // Layer order (z, bottom → top):
  //   1. Back half of all 3 orbits
  //   2. Drop
  //   3. Front half of all 3 orbits
  //   4. Atoms (always on top, on hidden full-ellipse motion paths)
  const ORBITS = [
    { id: 1, rot: -22, rx: 190, ry: 70,
      strokeColor: 'rgba(0,85,184,0.55)', strokeColorFront: 'rgba(0,85,184,0.85)',
      sw: 1.6, dash: null },
    { id: 2, rot:  28, rx: 160, ry: 55,
      strokeColor: 'rgba(65,190,67,0.55)', strokeColorFront: 'rgba(65,190,67,0.95)',
      sw: 1.6, dash: null },
    { id: 3, rot:  72, rx: 180, ry: 85,
      strokeColor: 'rgba(0,85,184,0.35)', strokeColorFront: 'rgba(0,85,184,0.55)',
      sw: 1.4, dash: '3 5' },
  ];

  // Helper: paths in the original frame, then the surrounding <g> rotates them
  const backArc  = (rx, ry) => `M ${250 - rx} 250 A ${rx} ${ry} 0 0 1 ${250 + rx} 250`;
  const frontArc = (rx, ry) => `M ${250 - rx} 250 A ${rx} ${ry} 0 0 0 ${250 + rx} 250`;
  const fullEll  = (rx, ry) => `M ${250 - rx} 250 A ${rx} ${ry} 0 1 0 ${250 + rx} 250 A ${rx} ${ry} 0 1 0 ${250 - rx} 250 Z`;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 640, aspectRatio: '1', margin: '0 auto' }}>
      {/* Soft halo behind drop */}
      <div style={{
        position: 'absolute', inset: '28% 28%',
        background: 'radial-gradient(circle, rgba(65,190,67,.12) 0%, rgba(0,85,184,.08) 60%, transparent 80%)',
        borderRadius: '50%',
        filter: 'blur(10px)',
      }}></div>

      <svg viewBox="30 30 440 440" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
        {/* ───────── LAYER 1 — BACK arcs (all 3 orbits) ───────── */}
        {ORBITS.map(o => (
          <g key={`back-${o.id}`} transform={`rotate(${o.rot} 250 250)`}>
            <path d={backArc(o.rx, o.ry)}
                  fill="none"
                  stroke={o.strokeColor}
                  strokeWidth={o.sw}
                  strokeDasharray={o.dash || undefined}/>
          </g>
        ))}

        {/* ───────── LAYER 2 — DROP ───────── */}
        <g transform="translate(250 250)">
          {/* subtle ground shadow */}
          <ellipse cx="0" cy="144" rx="75" ry="7" fill="rgba(0,85,184,0.08)"/>

          {/* drop outline — scaled 1.25× from original */}
          <path
            d="M 0 -138
               C 62 -75, 98 -12, 98 38
               A 98 98 0 1 1 -98 38
               C -98 -12, -62 -75, 0 -138 Z"
            fill="rgba(255,255,255,0.92)"
            stroke="#0055b8"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* inner highlight stroke */}
          <path
            d="M -28 -25 C -35 10, -28 38, -13 53"
            fill="none"
            stroke="#0055b8"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        {/* ───────── LAYER 3 — FRONT arcs (all 3 orbits) ───────── */}
        {ORBITS.map(o => (
          <g key={`front-${o.id}`} transform={`rotate(${o.rot} 250 250)`}>
            <path d={frontArc(o.rx, o.ry)}
                  fill="none"
                  stroke={o.strokeColorFront}
                  strokeWidth={o.sw}
                  strokeDasharray={o.dash || undefined}/>
          </g>
        ))}

        {/* ───────── LAYER 4 — Atoms on hidden motion paths ─────────
            Each atom's opacity is animated in sync with its motion so it dims
            when traveling on the BACK half of the ellipse (t = 0 → 0.5) and
            stays full strength on the FRONT half (t = 0.5 → 1).
            For the full-ellipse motion path, the first arc covers the top
            (back) half of the unrotated ellipse, the second arc the bottom
            (front) half. */}
        {/* Orbit 1 — large blue, solid dot */}
        <g transform="rotate(-22 250 250)">
          <path id="ng-orbit-1" d={fullEll(190, 70)} fill="none" stroke="none"/>
          <circle r="7" fill="#0055b8">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#ng-orbit-1"/>
            </animateMotion>
            <animate attributeName="r" values="7;8;7" dur="9s" repeatCount="indefinite"/>
            <animate attributeName="opacity"
                     dur="9s" repeatCount="indefinite"
                     keyTimes="0;0.68;0.73;0.79;0.84;1"
                     values="1;1;0.15;0.15;1;1"/>
          </circle>
          <circle r="3" fill="#0055b8">
            <animateMotion dur="9s" begin="-4.5s" repeatCount="indefinite">
              <mpath href="#ng-orbit-1"/>
            </animateMotion>
            <animate attributeName="opacity"
                     dur="9s" begin="-4.5s" repeatCount="indefinite"
                     keyTimes="0;0.68;0.73;0.79;0.84;1"
                     values="0.55;0.55;0.1;0.1;0.55;0.55"/>
          </circle>
        </g>

        {/* Orbit 2 — green ring + dot */}
        <g transform="rotate(28 250 250)">
          <path id="ng-orbit-2" d={fullEll(160, 55)} fill="none" stroke="none"/>
          <circle r="6.5" fill="none" stroke="#41BE43" strokeWidth="2.5">
            <animateMotion dur="7s" repeatCount="indefinite">
              <mpath href="#ng-orbit-2"/>
            </animateMotion>
            <animate attributeName="opacity"
                     dur="7s" repeatCount="indefinite"
                     keyTimes="0;0.68;0.73;0.79;0.84;1"
                     values="1;1;0.15;0.15;1;1"/>
          </circle>
          <circle r="3" fill="#41BE43">
            <animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite">
              <mpath href="#ng-orbit-2"/>
            </animateMotion>
            <animate attributeName="opacity"
                     dur="7s" begin="-3.5s" repeatCount="indefinite"
                     keyTimes="0;0.68;0.73;0.79;0.84;1"
                     values="0.7;0.7;0.12;0.12;0.7;0.7"/>
          </circle>
        </g>

        {/* Orbit 3 — white ring with blue stroke (dashed orbit) */}
        <g transform="rotate(72 250 250)">
          <path id="ng-orbit-3" d={fullEll(180, 85)} fill="none" stroke="none"/>
          <circle r="7" fill="#fff" stroke="#0055b8" strokeWidth="2.5">
            <animateMotion dur="11s" repeatCount="indefinite">
              <mpath href="#ng-orbit-3"/>
            </animateMotion>
            <animate attributeName="opacity"
                     dur="11s" repeatCount="indefinite"
                     keyTimes="0;0.68;0.73;0.79;0.84;1"
                     values="1;1;0.15;0.15;1;1"/>
          </circle>
        </g>
      </svg>

      {/* ─── Floating stat cards (HTML, absolutely positioned over SVG) ─── */}
      <div className="ng-hero-float" style={{
        position: 'absolute', top: '-4%', left: '14%',
        background: '#fff', border: '1px solid var(--ng-line)',
        borderRadius: 14, padding: '14px 20px',
        boxShadow: 'var(--shadow)', zIndex: 2,
        animation: 'ng-float-a 6s ease-in-out infinite',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1, color: 'var(--ng-blue)', letterSpacing: '-0.02em' }}>+120</div>
        <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginTop: 4 }}>SKUs disponibles</div>
      </div>

      <div className="ng-hero-float" style={{
        position: 'absolute', top: '42%', right: '-4%',
        background: '#fff', border: '1px solid var(--ng-line)',
        borderRadius: 14, padding: '14px 20px',
        boxShadow: 'var(--shadow)', zIndex: 2,
        animation: 'ng-float-b 7s ease-in-out infinite',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1, color: 'var(--ng-green-700)', letterSpacing: '-0.02em' }}>24 h</div>
        <div style={{ fontSize: 12, color: 'var(--ng-steel)', marginTop: 4 }}>Respuesta local SLP</div>
      </div>

      <div className="ng-hero-float" style={{
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
    <>
    <style>{`
      @media (max-width: 1024px) {
        .ng-hero-grid { gap: clamp(24px, 4vw, 48px) !important; }
      }
      @media (max-width: 768px) {
        .ng-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        .ng-hero-grid h1 { font-size: 32px !important; }
        .ng-hero-ctas { flex-direction: column !important; }
        .ng-hero-ctas button { width: 100% !important; justify-content: center !important; }
        .ng-hero-orbit { max-width: 360px !important; margin: 0 auto !important; }
        .ng-hero-float { display: none !important; }
      }
    `}</style>
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

      <div className="ng-hero-grid" style={{
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

          <div className="ng-hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
        <div className="ng-hero-orbit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <OrbitVisual />
        </div>
      </div>
    </section>
    </>
  );
}

window.Hero = Hero;
