/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],

  theme: {
    extend: {
      colors: {
          // Brand colors
          primary: {
               DEFAULT: '#3B8BEB',
            light: '#60a5fa',
            dark: '#2563c7',
           
          },

          secondary: {
  
             DEFAULT: '#B23850',
            light: '#cc4a66',
            dark: '#962d43',
          },

          // Neutral backgrounds
          background: {
           DEFAULT: '#e3f0fc',
            alt: '#EEF5FF',
          },

          // Text
          text: {
            DEFAULT: '#8590AA',
            light: '#a3acc2',
            dark: '#67738f',
          },

          // Extra palette colors from the design
          neutral: {
            beige: {
              DEFAULT: '#E7E3D4',
              light: '#f2efe6',
              dark: '#cfc9b4',
            },
          },

          // Utility colors
          surface: '#ffffff',
          border: '#dfe7f2',
        },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      keyframes: {
        flash: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.25 },
        },
      },

      animation: {
        flash: 'flash 1s infinite',
      },
    },
  },

  plugins: [require('flowbite/plugin')],
}