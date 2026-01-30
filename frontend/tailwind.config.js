/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f5e9",
          100: "#c8e6c9",
          200: "#a5d6a7",
          300: "#81c784",
          400: "#66bb6a",
          500: "#4caf50",
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32",
          900: "#1b5e20",
        },
        sustainable: {
          light: "#a5d6a7",
          main: "#4caf50",
          dark: "#1b5e20",
          accent: "#66bb6a",
        },
      },
      backgroundImage: {
        "gradient-eco": "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)",
        "gradient-eco-light": "linear-gradient(135deg, #a5d6a7 0%, #66bb6a 50%, #4caf50 100%)",
        "gradient-subtle": "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(165, 214, 167, 0.05) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in",
        "slide-in-up": "slideInUp 0.6s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(31, 38, 135, 0.15)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.3)",
        "glow": "0 0 20px rgba(76, 175, 80, 0.3)",
        "glow-lg": "0 0 40px rgba(76, 175, 80, 0.4)",
      },
      fontFamily: {
        "display": ["Inter", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
  darkMode: "class",
}
