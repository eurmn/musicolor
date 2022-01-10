import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({})],

  // procuro uma configuração que remova o path absoluto da build final,
  // por enquanto, estou removendo manualmente.
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    ssr: false,
    floc: false,
    paths: {
      base: dev ? '' : '/musicolor',
    },
    appDir: 'app_',
  },
};

export default config;
