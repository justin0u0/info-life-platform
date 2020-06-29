<template>
  <el-container class="justify-content-center">
    <Register />
  </el-container>
</template>

<script>
import Register from '@/components/Register';

export default {
  components: {
    Register,
  },
};
</script>

<style scoped>
.el-container {
  margin: 20px 0;
}
</style>
