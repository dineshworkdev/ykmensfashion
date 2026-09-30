/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF1DF',
          light:   '#FDF7F0',
          card:    '#FFFBF6',
          dark:    '#F2E3CE',
        },
        forest:       '#183D35', // Deep Forest
        teal:         '#4F8F87', // Muted Teal
        'dusty-blue': '#71899A', // Dusty Blue
        butter:       '#4F8F87', // Muted Teal — primary UI accent (replaces yellow)
        'burnt-orange':'#C96845', // Burnt Orange
        coral:        '#D96B5F', // Coral
        terracotta:   '#B9654E', // Terracotta
        sage:         '#A8B99A', // Soft Sage
        burgundy:     '#754447', // Muted Burgundy
        'warm-brown': '#3A302A', // Warm Brown
        espresso:     '#241B16', // Deep Espresso Ink
        ink:          '#241B16',
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
        sans:    ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        hand:    ['Caveat', 'cursive'],
      },
      letterSpacing: {
        label:  '0.14em',
        wide:   '0.06em',
        widest: '0.22em',
      },
      boxShadow: {
        // Mature editorial shadows replacing crude comic block shadows
        retro:     '0 2px 8px -2px rgba(36, 27, 22, 0.08), 0 1px 2px -1px rgba(36, 27, 22, 0.04)',
        'retro-md':'0 4px 14px -3px rgba(36, 27, 22, 0.10), 0 2px 4px -2px rgba(36, 27, 22, 0.05)',
        'retro-lg':'0 10px 25px -4px rgba(36, 27, 22, 0.12), 0 4px 8px -3px rgba(36, 27, 22, 0.06)',
        'retro-xl':'0 16px 36px -6px rgba(36, 27, 22, 0.14), 0 6px 12px -4px rgba(36, 27, 22, 0.08)',
        'retro-white':'0 4px 14px -3px rgba(255, 241, 223, 0.25)',
        'retro-coral':'0 4px 14px -3px rgba(217, 107, 95, 0.3)',
        'retro-butter':'0 4px 14px -3px rgba(79, 143, 135, 0.3)',
        editorial: '0 20px 40px -15px rgba(36, 27, 22, 0.12)',
        subtle:    '0 1px 3px rgba(36, 27, 22, 0.06)',
      },
      borderWidth: {
        '1': '1px',
        '1.5': '1.5px',
        '2': '2px',
        '3': '3px',
      },
      transitionTimingFunction: {
        retro: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
}
