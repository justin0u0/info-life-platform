<template>
  <div>
    <el-tabs type="card" @tab-click="handleToggleTab">
      <el-tab-pane label="已發佈">
        <ListUserPosts ref="post" :is-published="true" />
      </el-tab-pane>
      <el-tab-pane label="草稿">
        <ListUserPosts ref="draft" :is-published="false" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ListUserPosts from '@/components/user/ListUserPosts.vue';

export default {
  components: {
    ListUserPosts,
  },
  methods: {
    async handleToggleTab(tab) {
      const target = (tab.label === '已發佈') ? this.$refs.post : this.$refs.draft;
      this.$store.dispatch('setIsProcessing', true);
      await Promise.all([
        target.preGetPosts(),
      ]);
      this.$store.dispatch('setIsProcessing', false);
    },
  },
};
</script>

<style scoped>

</style>
