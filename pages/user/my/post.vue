<template>
  <el-container>
    <AsideNav />
    <el-main>
      <div class="container post-container">
        <el-tabs type="card">
          <el-tab-pane label="已發佈">
            <ListUserPosts :is-published="true" />
          </el-tab-pane>
          <el-tab-pane label="草稿">
            <ListUserPosts :is-published="false" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AsideNav from '@/components/user/AsideNav.vue';
import ListUserPosts from '@/components/user/ListUserPosts.vue';

export default {
  components: {
    AsideNav,
    ListUserPosts,
  },
};
</script>

<style scoped>
.post-container {
  max-width: 960px;
}
</style>
