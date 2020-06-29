<template>
  <el-container>
    <AsideNav />
    <el-main>
      <ModifyProfile />
    </el-main>
  </el-container>
</template>

<script>
import auth from '@/lib/auth';
import ModifyProfile from '@/components/user/profile/ModifyProfile.vue';
import AsideNav from '@/components/user/AsideNav.vue';

export default {
  components: {
    ModifyProfile,
    AsideNav,
  },
  mounted() {
    auth.bind(this)('/');
  },
};
</script>

<style scoped>
</style>
