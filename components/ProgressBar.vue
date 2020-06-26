<template>
  <div v-show="visible" class="progressbar text-center" :style="{ right: progress }" />
</template>

<script>
export default {
  data() {
    return {
      progress: '100%',
      visible: false,
      firstEvent: true,
      firstProgressValue: null,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      const { scrollHeight, offsetHeight, scrollTop } = e.target.scrollingElement;
      const progressValue = ((scrollTop + offsetHeight) / scrollHeight) * 100;
      if (this.firstEvent) {
        this.firstEvent = false;
        this.firstProgressValue = progressValue;
      }
      this.visible = progressValue > this.firstProgressValue + 3;
      this.progress = `${100 - progressValue}%`;
    },
  },
};
</script>

<style scoped>
.progressbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background-color: #409eff;
  transition: right 0.1s ease;
  z-index: 10;
}
</style>
