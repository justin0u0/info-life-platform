<template>
  <el-container>
    <AsideNav />
    <el-main>
      <div class="container post-container">
        <PostTab />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import auth from '@/lib/auth';
import AsideNav from '@/components/user/AsideNav.vue';
import PostTab from '@/components/user/post/PostTab.vue';

export default {
  components: {
    AsideNav,
    PostTab,
  },
  mounted() {
    auth.bind(this)('/');
  },
};
</script>

<style scoped>
.post-container {
  max-width: 960px;
}
</style>
