<template>
  <el-container>
    <UserAsideNav />
    <el-main>
    </el-main>
  </el-container>
</template>

<script>
import auth from '@/lib/auth';
import UserAsideNav from '@/components/user/AsideNav.vue';

export default {
  components: {
    UserAsideNav,
  },
  mounted() {
    auth.bind(this)('/');
  },
};
</script>

<style>

</style>
