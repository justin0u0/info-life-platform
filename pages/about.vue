<template>
  <el-container class="justify-content-center">
    <AboutUs />
  </el-container>
</template>

<script>
import AboutUs from '@/components/about/Index.vue';

export default {
  components: {
    AboutUs,
  },
};
</script>

<style scoped>
.el-container {
  margin: 20px 0;
  text-align: center;
}
</style>
