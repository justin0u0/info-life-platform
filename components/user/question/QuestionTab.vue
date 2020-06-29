<template>
  <div>
    <el-tabs type="card" @tab-click="handleToggleTab">
      <el-tab-pane label="已解決">
        <ListUserQuestions ref="question" :is-solved="true" />
      </el-tab-pane>
      <el-tab-pane label="未解決">
        <ListUserQuestions ref="draft" :is-solved="false" />
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
