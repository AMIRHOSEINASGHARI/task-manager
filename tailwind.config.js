/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        p_blue: "#3b82f6",
        s_blue: "#dbeafe",
        p_slate: "#64748b",
        s_slate: "#e2e8f0",
        p_green: "#22c55e",
        s_green: "#bbf7d0",
        p_orange: "#f97316",
        s_orange: "#fed7aa",
        p_gray: "#4b5563",
        s_gray: "#e5e7eb",
      },
    },
    fontFamily: {
      montserrat: "Montserrat",
    },
  },
  plugins: [],
};
