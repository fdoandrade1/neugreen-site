const paths = {
  arrow: 'M5 12h14M13 5l7 7-7 7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6L6 18',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z M5 19l2-2M17 7l2-2',
  shield: 'M12 3l7 3v5c0 4.5-2.9 8.4-7 10-4.1-1.6-7-5.5-7-10V6l7-3z',
  kitchen: 'M7 3v18M5 3v5a2 2 0 0 0 4 0V3M15 3h2v18M15 3c-1.5 2.4-1.5 5.5 0 8',
  drop: 'M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z',
  air: 'M4 8h10a3 3 0 1 0-3-3M4 13h14a3 3 0 1 1-3 3M4 18h7',
  auto: 'M5 14l1.5-4.5A3 3 0 0 1 9.3 7h5.4a3 3 0 0 1 2.8 2.5L19 14M4 14h16v5H4v-5zM7 19v2M17 19v2M7 16h.01M17 16h.01',
  enzyme: 'M8 5c5 0 8 3 8 8 0 4-3 6-6 6-2.8 0-5-2.2-5-5 0-3 2-5 5-5 2 0 4 1 5 3M16 4v4h4',
  tools: 'M14 7l3-3 3 3-3 3-3-3zM4 20l7-7M6 5l13 13M5 4l3 3',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z',
  mail: 'M4 5h16v14H4V5zM4 7l8 6 8-6',
  check: 'M20 6L9 17l-5-5',
};

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 2 }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  );
}
