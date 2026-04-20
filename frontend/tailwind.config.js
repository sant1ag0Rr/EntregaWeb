/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pitch: "#0d5c3f",
        field: "#117a53",
        sand: "#f4efe4",
        ink: "#0f172a",
        accent: "#f59e0b"
      },
      boxShadow: {
        panel: "0 24px 60px -24px rgba(15, 23, 42, 0.35)"
      },
      backgroundImage: {
        "stadium-glow":
          "radial-gradient(circle at top, rgba(245,158,11,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(17,122,83,0.22), transparent 28%)"
      }
    }
  },
  plugins: []
};
