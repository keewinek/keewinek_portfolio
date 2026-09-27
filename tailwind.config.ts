import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components,lib}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces: one cool-neutral family, off-black instead of #000.
        "ink": "#0c0c0e",
        "surface": "#141417",
        "surface-2": "#1c1c20",
        "line": "#2a2a30",
        // Text
        "fg": "#ededee",
        "muted": "#a3a3ab",
        "subtle": "#83838c",
        // The single brand accent.
        "red": "#ff6c6c",
        "red-bright": "#ff8a8a",
        "red-deep": "#e04f55",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        // Shape rule: interactive controls are pills, containers use `card`, inputs use `field`.
        card: "1.25rem",
        field: "0.875rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      zIndex: {
        // z-index scale: nav 40, mobile menu 45, grain 60.
        nav: "40",
        menu: "45",
        grain: "60",
      },
    },
  },
} satisfies Config;
