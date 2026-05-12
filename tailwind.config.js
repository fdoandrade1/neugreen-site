import { brandColors } from './src/config/brand.js';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ng: brandColors },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 16px rgba(14,58,95,0.08)',
        lift:  '0 8px 32px rgba(14,58,95,0.14)',
        hero:  '0 24px 80px rgba(14,58,95,0.20)',
      },
      backgroundImage: {
        'grid-white': 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        'grid-dark':  'linear-gradient(rgba(14,58,95,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,58,95,.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
