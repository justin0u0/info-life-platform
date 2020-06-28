<template>
  <el-container>
    <AsideNav />
    <el-main>
      <PersonalProfile />
    </el-main>
  </el-container>
</template>

<script>
import PersonalProfile from '@/components/user/PersonalProfile.vue';
import AsideNav from '@/components/user/AsideNav.vue';

export default {
  components: {
    PersonalProfile,
    AsideNav,
  },
};
</script>

<style scoped>
</style>
