// ProyectosGaleria.jsx — filterable case gallery
const { useState: useStateP } = React;

const PROJECTS = [
  { id: 1, linea: 'industrial', industria: 'Alimenticio', titulo: 'PTAR procesadora de cárnicos', cliente: 'Cliente confidencial · Bajío', nda: true,
    impacto: '32 %', impactoLabel: 'reducción DBO en 90 días',
    body: 'Rediseño de tren biológico con bioaumentación enzimática. Recuperación de cumplimiento NOM-001 en menos de un trimestre.',
    tags: ['PTAR', 'Bioaumentación', 'NOM-001'] },
  { id: 2, linea: 'maquila', industria: 'Hospitalidad', titulo: 'Lanzamiento marca privada — cadena hotelera', cliente: 'Cliente confidencial · Riviera Maya', nda: true,
    impacto: '8 SKUs', impactoLabel: 'lanzados en 6 meses',
    body: 'Desarrollo de línea completa: desinfectantes, multiusos, lavandería y aromatización. Envase con marca del cliente, COA por lote.',
    tags: ['Marca privada', 'Línea completa', 'Cobertura nacional'] },
  { id: 3, linea: 'industrial', industria: 'Manufactura', titulo: 'Torres de enfriamiento — planta automotriz', cliente: 'Cliente confidencial · Bajío', nda: true,
    impacto: '11 %', impactoLabel: 'ahorro en consumo de agua',
    body: 'Programa de inhibidores + biocida + auditoría microbiológica mensual. Eliminación de paros por incrustación.',
    tags: ['Torres', 'Anti-Legionella', 'Monitoreo continuo'] },
  { id: 4, linea: 'productos', industria: 'Educativo', titulo: 'Universidad pública · campus norte', cliente: 'Universidad SLP', nda: false,
    impacto: '24 edificios', impactoLabel: 'estandarizados con un solo proveedor',
    body: 'Sustitución de proveedor genérico por línea Neugreen profesional. Capacitación a personal de intendencia y dosificación documentada.',
    tags: ['Línea profesional', 'Capacitación', 'Sector público'] },
  { id: 5, linea: 'industrial', industria: 'Cárnicos', titulo: 'Control de olores · rastro municipal', cliente: 'Rastro municipal · SLP', nda: false,
    impacto: '−85 %', impactoLabel: 'quejas vecinales en 60 días',
    body: 'Sistema de dispersión enzimática + neutralizador de H₂S en líneas de drenaje. Documentación regulatoria para inspecciones.',
    tags: ['Control de olores', 'H₂S', 'Sector público'] },
  { id: 6, linea: 'maquila', industria: 'Distribución', titulo: 'Marca privada — distribuidor regional', cliente: 'Cliente confidencial · 4 estados', nda: true,
    impacto: '+ 24 %', impactoLabel: 'margen vs. producto comprado',
    body: 'Migración de catálogo de distribuidor a marca propia. 12 SKUs con etiqueta privada y respaldo regulatorio Neugreen.',
    tags: ['Distribuidor', 'Etiqueta privada', 'Catálogo 12 SKUs'] },
  { id: 7, linea: 'productos', industria: 'Hospitalidad', titulo: 'Cadena de restaurantes · grupo gastronómico', cliente: 'Cliente confidencial · 18 sucursales', nda: true,
    impacto: '−18 %', impactoLabel: 'costo de químico por sucursal',
    body: 'Auditoría de consumo, dosificación corregida y sustitución por línea enzimática para cocinas. ROI en 4 meses.',
    tags: ['Cocinas industriales', 'Enzimáticos', 'Auditoría'] },
  { id: 8, linea: 'industrial', industria: 'Salud', titulo: 'Hospital privado · 220 camas', cliente: 'Cliente confidencial · SLP', nda: true,
    impacto: '0 paros', impactoLabel: 'por insumos en 12 meses',
    body: 'Suministro continuo de DAN, sanitizantes grado farmacéutico y monitoreo microbiológico. Cumplimiento CSG y NOM-016.',
    tags: ['Salud', 'DAN', 'CSG'] },
];

const FILTERS = [
  { id: 'all',         label: 'Todos' },
  { id: 'productos',   label: 'Productos' },
  { id: 'maquila',     label: 'Maquila' },
  { id: 'industrial',  label: 'Industrial' },
];

function ProjectCard({ p }) {
  const isMaq = p.linea === 'maquila';
  const isInd = p.linea === 'industrial';
  const accent = isMaq ? 'green' : 'blue';
  const accentColor = accent === 'green' ? 'var(--ng-green-700)' : 'var(--ng-blue)';
  const accentBg = accent === 'green' ? 'var(--ng-green-50)' : 'var(--ng-blue-50)';

  return (
    <article style={{
      background: '#fff',
      border: '1px solid var(--ng-line)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow)';
      e.currentTarget.style.borderColor = 'var(--ng-blue-100)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'var(--ng-line)';
    }}>
      {/* Visual block — gradient placeholder (no photos delivered) */}
      <div style={{
        height: 180,
        background: isMaq
          ? `linear-gradient(135deg, rgba(65,190,67,.85) 0%, rgba(0,85,184,.65) 100%), repeating-linear-gradient(135deg, #475569 0 10px, #334155 10px 20px)`
          : isInd
          ? `linear-gradient(135deg, rgba(11,27,43,.85) 0%, rgba(0,85,184,.65) 100%), repeating-linear-gradient(135deg, #475569 0 10px, #334155 10px 20px)`
          : `linear-gradient(135deg, rgba(0,85,184,.78) 0%, rgba(65,190,67,.45) 100%), repeating-linear-gradient(135deg, #5A6B82 0 10px, #475569 10px 20px)`,
        position: 'relative',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#fff',
            background: 'rgba(0,0,0,.30)',
            backdropFilter: 'blur(8px)',
            padding: '5px 10px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,.18)',
          }}>{p.industria}</span>
          {p.nda && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'rgba(255,255,255,.75)',
              background: 'rgba(0,0,0,.30)',
              padding: '5px 10px', borderRadius: 6,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,.18)',
            }}>NDA</span>
          )}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36, fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.025em',
          lineHeight: 1,
        }}>
          {p.impacto}
        </div>
      </div>

      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ fontSize: 12, color: accentColor, fontWeight: 700, letterSpacing: '0.04em' }}>{p.impactoLabel}</div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18, fontWeight: 700, margin: 0,
          color: 'var(--ng-ink)',
          letterSpacing: '-0.015em',
          lineHeight: 1.25,
        }}>{p.titulo}</h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', letterSpacing: '0.04em' }}>{p.cliente}</div>
        <p style={{ fontSize: 13, color: 'var(--ng-steel)', margin: 0, lineHeight: 1.55 }}>{p.body}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--ng-line)' }}>
          {p.tags.map((t, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 600,
              padding: '4px 10px', borderRadius: 999,
              background: accentBg, color: accentColor,
              letterSpacing: '0.02em',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProyectosGaleria() {
  const [filter, setFilter] = useStateP('all');
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.linea === filter);

  return (
    <section style={{
      padding: 'clamp(80px, 8vw, 120px) var(--section-pad-x)',
      background: 'var(--ng-mist)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', gap: 32, marginBottom: 36, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 600 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Galería · 8 casos visibles</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 38px)',
              fontWeight: 800, letterSpacing: '-0.02em',
              margin: 0, color: 'var(--ng-ink)', lineHeight: 1.1,
            }}>
              Filtra por línea para acotar.
            </h2>
          </div>

          {/* Filter pills */}
          <div role="tablist" style={{
            display: 'flex', gap: 6,
            padding: 4,
            background: '#fff',
            border: '1px solid var(--ng-line)',
            borderRadius: 999,
          }}>
            {FILTERS.map(f => {
              const isA = filter === f.id;
              return (
                <button key={f.id} role="tab" aria-selected={isA} onClick={() => setFilter(f.id)} style={{
                  padding: '8px 18px', borderRadius: 999,
                  background: isA ? 'var(--ng-blue)' : 'transparent',
                  color: isA ? '#fff' : 'var(--ng-ink)',
                  border: 'none', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', font: 'inherit',
                  transition: 'background .12s ease',
                }}>{f.label}</button>
              );
            })}
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ng-steel)', marginBottom: 24, letterSpacing: '0.04em' }}>
          {visible.length} {visible.length === 1 ? 'caso' : 'casos'} · ordenado por relevancia
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
        }}>
          {visible.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>

        {/* Empty state — only if a filter accidentally returns nothing */}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: 64, color: 'var(--ng-steel)' }}>
            No hay casos visibles para este filtro.
          </div>
        )}
      </div>
    </section>
  );
}

window.ProyectosGaleria = ProyectosGaleria;
