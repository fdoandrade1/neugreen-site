import { navigateTo } from '../utils/navigation.js';

const variants = {
  primary: 'bg-ng-green text-white hover:bg-ng-lime border-ng-green hover:border-ng-lime shadow-sm',
  outline: 'bg-transparent text-ng-navy hover:bg-ng-navy hover:text-white border-ng-navy',
  ghost:   'bg-white/12 text-white hover:bg-white/20 border-white/20',
  dark:    'bg-ng-navy text-white hover:bg-ng-blue border-ng-navy hover:border-ng-blue shadow-sm',
  light:   'bg-white text-ng-navy hover:bg-ng-mist border-white shadow-sm',
};

export default function Button({ href, children, variant = 'primary', className = '', icon, type = 'button' }) {
  const base = `focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`;

  if (!href) return <button type={type} className={base}>{icon}{children}</button>;

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a className={base} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {icon}{children}
      </a>
    );
  }

  return (
    <a className={base} href={href} onClick={(e) => { e.preventDefault(); navigateTo(href); }}>
      {icon}{children}
    </a>
  );
}
