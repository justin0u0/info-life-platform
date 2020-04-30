<template>
  <el-container>
    <StudentLogin />
  </el-container>
</template>

<script>
import StudentLogin from '@/components/Login';

export default {
  components: {
    StudentLogin,
  },
};
</script>

<style scoped>
.el-container {
  text-align: center;
  margin: 20px 0;
}
</style>
