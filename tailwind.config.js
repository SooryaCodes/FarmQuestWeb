/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this path includes your TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-light-dark)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}

