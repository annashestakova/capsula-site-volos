import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#FAF7F2",
        milk:     "#F5F0E8",
        sand:     "#E8DFD0",
        taupe:    "#C4B49A",
        mink:     "#9E8B75",
        espresso: "#3D2B1F",
        blush:    "#E8C4B8",
        rose:     "#C9897A",
        lavender: "#B8AECF",
        sage:     "#A8B5A0",
        gold:     "#C9A96E",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-jost)", "system-ui", "sans-serif"],
        accent:  ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "8xl": ["6rem",   { lineHeight: "1.05" }],
        "9xl": ["8rem",   { lineHeight: "1" }],
        "10xl":["10rem",  { lineHeight: "0.95" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "7rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "grain": "grain 8s steps(10) infinite",
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":       { transform: "translateY(-12px) rotate(1deg)" },
          "66%":       { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":       { transform: "translate(-2%, -3%)" },
          "20%":       { transform: "translate(3%, 2%)" },
          "30%":       { transform: "translate(-1%, 4%)" },
          "40%":       { transform: "translate(2%, -1%)" },
          "50%":       { transform: "translate(-3%, 3%)" },
          "60%":       { transform: "translate(1%, -2%)" },
          "70%":       { transform: "translate(-2%, 1%)" },
          "80%":       { transform: "translate(3%, -3%)" },
          "90%":       { transform: "translate(-1%, 2%)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
