/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "primary-white": "var(--primary-white)",
        "primary-black": "var(--primary-black)",

        "foundation-white-darker": "var(--foundation-white-darker)",
        "foundation-brown-darker": "var(--foundation-brown-darker)",

        danger: "var(--danger)",
        muted: "var(--muted)",
      },
      boxShadow: {
        "2xl": "0 0 30px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
