import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-black': '#000000',
        'background-dark': '#0b0b0b',
        'red': '#ff6c6c',
        'red-bright': '#ff8a8a',
        'white': '#e0e0e0',
        'white-transparent': '#e0e0e0c5',
        'white-2': '#929292',
        'code-blue': '#5088ee',
        'code-gray': '#616161',
        'code-green': '#88eb88',
        'code-orange': '#d6a241'
      },
    }
  }
} satisfies Config;
