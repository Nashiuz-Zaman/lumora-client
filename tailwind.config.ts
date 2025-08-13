/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xs": "360px",
        xs: "480px",
        "2md": "850px",
        "2lg": "1100px",
        "3xl": "1700px",
        "4xl": "1920px",
      },
      transitionDuration: {
        default: "150ms",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      colors: {
        primary: "#9333ea",
        primaryDark: "#6F2794",
      },
    },
  },
  plugins: [],
};

export default config;
