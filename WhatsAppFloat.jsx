// WhatsAppFloat.jsx — botón flotante de WhatsApp global
function WhatsAppFloat() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <>
      <a
        href="https://www.neugreen.mx/whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp-float"
        aria-label="Escríbenos por WhatsApp"
        title="Escríbenos por WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: hovered
            ? '0 8px 28px rgba(37,211,102,0.55)'
            : '0 4px 16px rgba(37,211,102,0.40)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.766.462 3.422 1.268 4.864L2 22l5.293-1.245A9.961 9.961 0 0 0 12.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.215a8.197 8.197 0 0 1-4.185-1.146l-.3-.177-3.142.739.757-3.067-.196-.316A8.21 8.21 0 1 1 12.004 20.215z"/>
        </svg>
      </a>
      <div style={{
        position: 'fixed',
        bottom: 34,
        right: 88,
        zIndex: 9998,
        background: 'rgba(11,27,43,0.88)',
        color: '#fff',
        fontSize: 12,
        fontWeight: 600,
        padding: '6px 12px',
        borderRadius: 6,
        whiteSpace: 'nowrap',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(6px)',
        transition: 'opacity 0.18s ease, transform 0.18s ease',
        pointerEvents: 'none',
      }}>
        Escríbenos por WhatsApp
      </div>
    </>
  );
}
window.WhatsAppFloat = WhatsAppFloat;
