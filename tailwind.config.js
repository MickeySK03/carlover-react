/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      fontFamily: {
        sans: ["Kanit"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  // plugins: [require("daisyui")],
  // daisyui: {
  //   theme: false,
  //   darkTheme: "light",
  //   base: true,
  //   styled: true,
  //   utils: true,
  //   rtl: true,
  //   prefix: "",
  //   logs: true,
  // },
};
