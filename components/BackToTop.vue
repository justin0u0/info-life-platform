<template>
  <div v-show="visible" class="backtop" :style="{ position, bottom }" @click="scrollTop">
    <i class="el-icon-caret-top" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      position: 'fixed',
      bottom: '20px',
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleBackToTop);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleBackToTop);
  },
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    handleBackToTop(e) {
      const { scrollTop, scrollHeight, offsetHeight } = e.target.scrollingElement;
      this.visible = scrollTop > 0;
      const footerHeight = document.getElementById('footer').getClientRects()[0].height;
      const limitHeight = scrollHeight - footerHeight;
      const viewHeight = offsetHeight;
      const scrollPosition = scrollTop;
      const nowPosition = viewHeight + scrollPosition;
      this.position = (nowPosition < limitHeight) ? 'fixed' : 'absolute';
      this.bottom = (nowPosition < limitHeight) ? '20px' : `${20 + footerHeight}px`;
    },
  },
};
</script>

<style scoped>
.backtop {
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  color: #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
  right: 50px;
  bottom: 20px;
}
</style>
