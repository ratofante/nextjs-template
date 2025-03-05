// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.js", // Make sure this path is correct
    },
    autoprefixer: {},
  },
};

export default config;
