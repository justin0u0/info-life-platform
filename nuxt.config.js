import webpack from 'webpack';

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'InfoLife',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
    ],
  },
  /**
   * Process Env Config
   */
  env: {
    baseUrl: process.env.NODE_ENV === 'dev' ? 'http://localhost:7001' : 'http://54.174.162.111:7001',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/editor.min.css',
    '@/assets/css/highlight.scss',
    '@/assets/scss/all.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '@/plugins/bootstrap.js',
      ssr: false,
    },
    '@/plugins/font-awesome',
    {
      src: '@/plugins/localStorage.js',
      ssr: false,
    },
    {
      src: '@/plugins/vue-infinite-scroll.js',
      ssr: false,
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-fontawesome',
    '@nuxtjs/axios',
    'vue-social-sharing/nuxt',
  ],
  /*
  ** fontawesome
  */
  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    vendor: ['jquery', 'bootstrap'],
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    extend(/* config, ctx */) {
    },
  },
};
