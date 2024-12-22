/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "480px", // 添加一个更小的断点
      sm: "640px", // 默认小屏幕
      md: "768px", // 默认中屏幕
      lg: "1024px", // 默认大屏幕
      xl: "1280px", // 默认超大屏幕
      xl2: '1400px',
      "2xl": "1536px", // 默认特大屏幕
      "3xl": "1920px", // 自定义更大的断点
    },
  },
  plugins: [],
};
