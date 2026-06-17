/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0B2D6B',
          green: '#16A334',
          surface: '#F3F5F7',
          text: '#1F2937',
        },
        ink: '#0A0A0A',
        muted: '#6B7280',
        line: '#E5E7EB',
        canvas: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)',
        focus: '0 0 0 3px rgba(11,45,107,0.12)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
