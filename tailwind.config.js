/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0F0F0F",
        jet: "#2A2929",
        gray: "#444342",
        yellow: "#F2D000",
        orange: "#FFB700",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
      },
      fontSize: {
        xxs: "0.65rem", // 你可以調整為你想要的大小
        xxl: "10rem",
      },
    },
    plugins: [],
  },
};
