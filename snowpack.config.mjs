// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import('snowpack').SnowpackUserConfig } */
export default {
  mount: {
    'src': '/',
    'html': '/',
    'assets': '/assets',
    'scss': '/css',
    'ttl': '/ttl'
  },
  plugins: [
    '@snowpack/plugin-sass'
  ],
  packageOptions: {
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
};
