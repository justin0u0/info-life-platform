<template>
  <el-container>
    <!-- <StudentRegister :department-list="departmentList" /> -->
    <StudentRegister  />
  </el-container>
</template>

<script>
import StudentRegister from '@/components/Register';
// import { getDepartments } from '@/api/department';

export default {
  components: {
    StudentRegister,
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