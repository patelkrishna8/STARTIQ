/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090a0f',
        surface: {
          50: '#1e2230',
          100: '#161925',
          200: '#11141e',
          300: '#0d0f17',
          DEFAULT: '#11141e',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          accent: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.15)',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          neutral: '#64748b',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.15)',
        'subtle-amber': '0 0 20px -5px rgba(245, 158, 11, 0.15)',
        'subtle-rose': '0 0 20px -5px rgba(239, 68, 68, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
