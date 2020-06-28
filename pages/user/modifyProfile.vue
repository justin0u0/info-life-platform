<template>
  <el-container>
    <AsideNav />
    <el-main>
      <ModifyProfile />
    </el-main>
  </el-container>
</template>

<script>
import ModifyProfile from '@/components/user/ModifyProfile.vue';
import AsideNav from '@/components/user/AsideNav.vue';

export default {
  components: {
    ModifyProfile,
    AsideNav,
  },
};
</script>

<style scoped>
</style>
