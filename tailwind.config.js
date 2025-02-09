/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      colors: {
        'text': '#000000',
        'background': '#ffffff',
        'primary': '#f47427',
        'secondary': '#f47427',
        'accent': '#f47427',
        'cards': '#f47427'
       },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        bebasNeue: ['Bebas Neue', 'sans-serif'],
        assistant: ['Assistant', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
};
