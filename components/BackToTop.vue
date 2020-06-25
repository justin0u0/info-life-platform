<template>
  <div class="backtop" @click="scrollTop">
    <i class="el-icon-caret-top" />
  </div>
</template>

<script>
export default {
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
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
