<template>
  <div>
    <el-tabs type="card" @tab-click="handleToggleTab">
      <el-tab-pane label="已解決">
        <ListUserQuestions ref="isSolved" :is-solved="true" />
      </el-tab-pane>
      <el-tab-pane label="未解決">
        <ListUserQuestions ref="unSolved" :is-solved="false" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ListUserQuestions from '@/components/user/question/ListUserQuestions.vue';

export default {
  name: 'UserQuestionQuestionTab',
  components: {
    ListUserQuestions,
  },
  methods: {
    async handleToggleTab(tab) {
      const target = (tab.label === '已解決') ? this.$refs.isSolved : this.$refs.unSolved;
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
