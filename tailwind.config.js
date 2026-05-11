import { brandColors } from './src/config/brand.js';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neugreen: brandColors,
      },
      fontFamily: {
        sans: ['"Fixel Text"', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        industrial: '0 24px 70px rgba(0, 31, 83, 0.12)',
      },
      backgroundImage: {
        'grid-blue':
          'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
