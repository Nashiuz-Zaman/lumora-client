/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
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
      primary: "#6F2794",
      secondary: "#EF6705",
      secondaryLight: "#FA8232",
      primaryTrans: "rgba(112,39,148,0.70)",
      secondaryTrans: "rgba(239,102,5,0.70)",
      primaryDark: "#41075F",
      primaryLight: "#F8EAFE",
      tertiary: "#26278D",
      tertiaryDark: "#0B142F",
      textMain: "#2B2B2B",
      "lightborder-1": "#E4E7E9",
      textDark: "#191C1F",
    },
  },
};
export const plugins = [];
