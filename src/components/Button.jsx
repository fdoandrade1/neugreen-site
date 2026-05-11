import { navigateTo } from '../utils/navigation.js';

const variants = {
  primary:
    'bg-neugreen-green text-neugreen-ink hover:bg-white hover:text-neugreen-blue border-neugreen-green',
  secondary:
    'bg-white text-neugreen-blue hover:bg-neugreen-mist border-white',
  outline:
    'bg-transparent text-neugreen-blue hover:bg-neugreen-blue hover:text-white border-neugreen-blue',
  dark:
    'bg-neugreen-blue text-white hover:bg-neugreen-navy border-neugreen-blue',
};

export default function Button({ href, children, variant = 'primary', className = '', icon, type = 'button' }) {
  const classes = `focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-bold transition duration-200 ${variants[variant]} ${className}`;

  if (!href) {
    return (
      <button type={type} className={classes}>
        {icon}
        {children}
      </button>
    );
  }

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a className={classes} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {icon}
        {children}
      </a>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        navigateTo(href);
      }}
    >
      {icon}
      {children}
    </a>
  );
}
