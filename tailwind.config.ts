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

type Accum = {
  [key: string]: string;
};

const accum: Accum = range(0, 1000).reduce((acc, px) => {
  acc[`${px}`] = `${px / 10}rem`;
  return acc;
}, {} as Accum);

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      ...accum,
    },
    colors: {
      primary: "#E26521",
      star: "#FFB800",
      white: "#FFF",
      naver: "#2bd400",
      kakao: "#FEE500",
      gray: {
        10: "#F3F3F3",
        20: "#E6E6E6",
        30: "#B3B3B3",
        40: "#7D7D7D",
        50: "#4D4D4D",
        60: "#333",
      },
      black: "#030303",
      error: "#FF5B56",
    },
    fontSize: {
      12: "1.2rem",
      14: "1.4rem",
      16: "1.6rem",
      18: "1.8rem",
      20: "2rem",
      28: "2.8rem",
      32: "3.2rem",
      36: "3.6rem",
      45: "4.5rem",
    },
    lineHeight: {
      15: "1.5rem",
      18: "1.8rem",
      21: "2.1rem",
      24: "2.4rem",
      27: "2.7rem",
      28: "2.8rem",
      30: "3rem",
      42: "4.2rem",
      48: "4.8rem",
      54: "5.4rem",
      67.5: "6.75rem",
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
      10: "1rem",
      30: "3rem",
      50: "5rem",
      100: "10rem",
      full: "1000rem",
    },
    boxShadow: {
      main: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
    },
  },
  plugins: [],
};
export default config;
