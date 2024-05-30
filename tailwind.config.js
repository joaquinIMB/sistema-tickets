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
        "3xl": "0 5px 3px 0px #00000008",
      },
      transition: {
        "3s": "all 0.3s ease",
      },
    },
  },
  plugins: [],
};
