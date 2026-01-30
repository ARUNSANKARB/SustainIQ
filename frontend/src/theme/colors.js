// Design tokens & color system
export const colors = {
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
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  info: "#2196f3",
  dark: {
    bg: "#0f172a",
    surface: "#1e293b",
    border: "#334155",
  },
  light: {
    bg: "#f8fafc",
    surface: "#ffffff",
    border: "#e2e8f0",
  }
};

export const gradients = {
  eco: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)",
  ecoLight: "linear-gradient(135deg, #a5d6a7 0%, #66bb6a 50%, #4caf50 100%)",
  subtle: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(165, 214, 167, 0.05) 100%)",
};

export const shadows = {
  glass: "0 8px 32px rgba(31, 38, 135, 0.15)",
  glassDark: "0 8px 32px rgba(0, 0, 0, 0.3)",
  glow: "0 0 20px rgba(76, 175, 80, 0.3)",
  glowLarge: "0 0 40px rgba(76, 175, 80, 0.4)",
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
};

export const borderRadius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};
