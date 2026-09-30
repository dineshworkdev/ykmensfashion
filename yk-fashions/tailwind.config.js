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
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans:    ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        hand:    ['Caveat', 'cursive'],
      },
      letterSpacing: {
        label:  '0.12em',
        wide:   '0.06em',
        widest: '0.20em',
      },
      boxShadow: {
        retro:     '3px 3px 0px #241B16',
        'retro-md':'4px 4px 0px #241B16',
        'retro-lg':'6px 6px 0px #241B16',
        'retro-xl':'8px 8px 0px #241B16',
        'retro-white':'4px 4px 0px #FFF1DF',
        'retro-coral':'4px 4px 0px #D96B5F',
        'retro-butter':'4px 4px 0px #4F8F87',
      },
      borderWidth: {
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
