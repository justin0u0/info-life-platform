<template>
  <el-container>
    <AsideNav />
    <el-main>
      <ViewProfile />
    </el-main>
  </el-container>
</template>

<script>
import auth from '@/lib/auth';
import ViewProfile from '@/components/user/profile/ViewProfile.vue';
import AsideNav from '@/components/user/AsideNav.vue';

export default {
  components: {
    ViewProfile,
    AsideNav,
  },
  mounted() {
    auth.bind(this)('/');
  },
};
</script>

<style scoped>
</style>
