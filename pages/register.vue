<template>
  <el-container>
    <!-- <StudentRegister :department-list="departmentList" /> -->
    <Register />
  </el-container>
</template>

<script>
import Register from '@/components/Register';
// import { getDepartments } from '@/api/department';

export default {
  components: {
    Register,
  },
  // async asyncData() {
  //   const { data } = await getDepartments({
  //     filter: { type: 'teaching' },
  //     limit: 0, // No limit
  //   });
  //   return {
  //     departmentList: data,
  //   };
  // },
};
</script>

<style scoped>
.el-container {
  margin: 20px 0;
}
</style>
