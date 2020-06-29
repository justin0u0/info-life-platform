<template>
  <div>
    <el-tabs type="card">
      <el-tab-pane label="已回答">
        <ListUserAnswers />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ListUserAnswers from '@/components/user/answer/ListUserAnswers.vue';

export default {
  name: 'UserAnswerAnswerTab',
  components: {
    ListUserAnswers,
  },
};
</script>

<style scoped>

</style>
