export default function SectionHeader({ eyebrow, title, description, align = 'left', className = '' }) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-black leading-tight text-neugreen-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-8 text-neugreen-steel sm:text-lg">{description}</p>}
    </div>
  );
}
