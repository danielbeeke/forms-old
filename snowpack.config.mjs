// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import('snowpack').SnowpackUserConfig } */
export default {
  mount: {
    'src': '/js',
    'html': '/',
    'assets': '/assets',
    'scss': '/css',
    'ttl': '/ttl',
    '../rdf-form/build/js': '/js'
  },
  plugins: [
    '@snowpack/plugin-sass'
  ],
  devOptions: {
    secure: true
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
