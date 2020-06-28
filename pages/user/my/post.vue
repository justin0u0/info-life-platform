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
import AsideNav from '@/components/user/AsideNav.vue';
import PostTab from '@/components/user/PostTab.vue';

export default {
  components: {
    AsideNav,
    PostTab,
  },
};
</script>

<style scoped>
.post-container {
  max-width: 1000px;
}
</style>
