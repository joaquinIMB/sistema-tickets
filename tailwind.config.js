/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    `./src/**/*.{js,ts,jsx,tsx,mdx}`,
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "3px 0px 10px rgba(0, 0, 0, 0.3)",
        "4xl": "0px 3px 10px rgba(0, 0, 0, 0.1)",
        "5xl": "0px 3px 10px #00000015",
        "6xl": "0px 1px 8px #0000005",
      },
    },
  },
  plugins: [],
};
