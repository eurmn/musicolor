const dev = process.env.NODE_ENV === 'development';

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily: {
      ttw: ['Titillium Web', 'sans-serif'],
    },
  },

  plugins: [],
};

module.exports = config;
