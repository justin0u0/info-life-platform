<template>
  <div>
    <el-tabs type="card" @tab-click="handleToggleTab">
      <el-tab-pane label="我的問題">
        <ListUserAnswers ref="question" :is-solved="true" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ListUserAnswers from '@/components/user/ListUserAnswers.vue';

export default {
  components: {
    ListUserAnswers,
  },
  methods: {
    async handleToggleTab(tab) {
      const target = (tab.label === '已解決') ? this.$refs.question : this.$refs.draft;
      this.$store.dispatch('setIsProcessing', true);
      await Promise.all([
        target.preGetQuestions(),
      ]);
      this.$store.dispatch('setIsProcessing', false);
    },
  },
};
</script>

<style scoped>

</style>
