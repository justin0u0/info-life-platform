<template>
  <div v-show="visible" class="progressbar text-center" :style="{right: progress}">
    <!-- {{ title }} -->
  </div>
</template>

<script>
export default {
  // props: {
  //   title: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      progress: '100%',
      visible: true,
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
      const fullHeight = e.target.scrollingElement.scrollHeight;
      const viewHeight = e.target.scrollingElement.offsetHeight;
      const scrollPosition = e.target.scrollingElement.scrollTop;
      const progressValue = ((scrollPosition + viewHeight) / fullHeight) * 100;
      // const progressValuePercentage = `${100 - progressValue}%`;
      this.visible = progressValue > 37.5;
      this.progress = `${100 - progressValue}%`;
      // console.log(this.visible);
      // console.log(scrollPosition);
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
  background-color: rgb(64, 158, 255);
  transition: right 0.1s ease;
  z-index: 2;
}
</style>
