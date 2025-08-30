import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
        colors: {
            'background-black': '#000000',
            'red': '#ff6c6c',
            'white': '#e0e0e0',
            'white-transparent': '#e0e0e0c5',
            'white-2': '#929292',
            'code-blue': '#5088ee',
            'code-gray': '#616161',
            'code-green': '#88eb88',
            'code-orange': '#d6a241'
        }
    }
}
} satisfies Config;
