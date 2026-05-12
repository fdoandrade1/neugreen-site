export default function SectionHeader({ eyebrow, title, description, align = 'left', className = '', dark = false }) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? 'text-ng-lime' : ''}`}>{eyebrow}</p>}
      <h2 className={`display mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${dark ? 'text-white' : 'text-ng-ink'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-8 sm:text-lg ${dark ? 'text-white/65' : 'text-ng-steel'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
