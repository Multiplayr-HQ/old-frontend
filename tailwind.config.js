const colors = require("tailwindcss/colors");
const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Epilogue"', "sans-serif"],
      rubik: ['"Rubik"', "sans-serif"],
      poppins: ['"Poppins"', "sans-serif"],
      inter: ['"Inter-Roman"', "sans-serif"],
    },
    extend: {
      colors: {
        ...defaultColors,
        gray: colors.neutral,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        emerald: colors.emerald,
        sky: colors.sky,
        lime: colors.lime,
        orange: colors.orange,
        cyan: colors.cyan,
        primary: "#b5fe1b",
        primary1: "#b5fe1b",
        background: "#181A22",

        dark2:"#1e293b",
        dark3:"#334155",
        bgbody:"#0f172a",
        secondery:"#334150",
        // primary:{soft : "#334150",},
        
      },
      boxShadow: {
        homogen: "0 0 10px 3px rgba(0,0,0,0.5)",
      },
      brightness: {
        300: "3",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
