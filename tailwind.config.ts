import type { Config } from "tailwindcss";

const range = (start: number, end: number) => {
  let arr = [];
  let length = end - start;
  for (let i = 0; i <= length; i++) {
    arr[i] = start;
    start++;
  }
  return arr;
};

const accum = range(0, 1000).reduce((acc, px) => {
  acc[`${px}`] = `${px / 10}rem`;
  return acc;
}, {});

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#E26521",
      star: "#FFB800",
      white: "#FFF",
      gray: {
        10: "#F3F3F3",
        20: "#E6E6E6",
        30: "#B3B3B3",
        40: "#7D7D7D",
        50: "#4D4D4D",
        60: "#333",
      },
      black: "#030303",
    },
    fontSize: {
      12: "0.75rem",
      16: "1rem",
      18: "1.125rem",
      20: "1.25rem",
      28: "1.75rem",
      32: "2rem",
      36: "2.25rem",
      45: "2.8125rem",
    },
    lineHeight: {
      18: "1.125rem",
      24: "1.5rem",
      27: "1.6875rem",
      28: "1.75rem",
      30: "1.875rem",
      42: "2.625rem",
      48: "3rem",
      54: "3.375rem",
      67.5: "4.2188rem",
    },
    fontFamily: {
      sans: ["Pretendard"],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
    borderRadius: {
      10: "0.625rem",
      30: "1.875rem",
      100: "6.25rem",
      full: "9999px",
    },
    boxShadow: {
      main: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
    },
  },
  plugins: [],
};
export default config;
