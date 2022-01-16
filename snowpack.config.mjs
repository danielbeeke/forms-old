// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import('snowpack').SnowpackUserConfig } */
export default {
  mount: {
    'src': '/js',
    'html': '/',
    'assets': '/assets',
    'scss': '/css',
    'ttl': '/ttl'
  },
  plugins: [
    '@snowpack/plugin-sass'
  ],
  packageOptions: {
    namedExports: ["static-params/strict"],

  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  routes: [
    { 
      match: 'routes', 
      src: '.*', 
      dest: '/index.html',
    },
  ],
  buildOptions: {
    out: 'docs'
  },
};
