<template>
  <div
    v-loading.fullscreen="isProcessing"
    class="layout infolife-font"
    :element-loading-text="processTitle"
  >
    <div class="wrapper">
      <Header />
      <nuxt class="nuxt" />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Default',
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters([
      'isProcessing',
      'processTitle',
    ]),
  },
};
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

#__nuxt, #__layout, .layout {
  height: 100%;
}

.wrapper {
  position: relative;
  min-height: 100%;
  /* Related to footer height */
  margin-bottom: -200px;
  padding-bottom: 200px;
}

.footer {
  background-color: #041a30;
  color: white;
  height: 200px;
}

.nuxt {
  /* Distance from footer */
  margin-bottom: 20px;
}
.infolife-font {
  font-family: custom-sans-serif, sans-serif;
}

@media (max-width: 768px) {
  .footer {
    height: 400px;
  }
  .wrapper {
    margin-bottom: -400px;
    padding-bottom: 400px;
  }
}
@font-face {
  font-family: custom-sans-serif;
  src: local("微軟正黑體"), local("Microsoft JhengHei");
  unicode-range: U+4E00-9FFF;
}
@font-face {
  font-family: custom-sans-serif;
  src: local('Lucida Grande'), local(Segoe UI);
  unicode-range: U+00-024F;
}
</style>
