<template>
  <el-container>
    <Login />
  </el-container>
</template>

<script>
import Login from '@/components/Login';

export default {
  components: {
    Login,
  },
};
</script>

<style scoped>
.el-container {
  text-align: center;
  margin: 20px 0;
}
</style>
