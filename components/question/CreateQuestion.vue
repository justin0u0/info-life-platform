<template>
  <div class="container create-question-container">
    <div class="title-container">
      <h1>新增文章草稿</h1>
    </div>
    <CreateOrModifyQuestionForm ref="form" @submit="handleCreateQuestion" />
  </div>
</template>

<script>
import { addQuestion } from '@/api/question';
import CreateOrModifyQuestionForm from '@/components/question/CreateOrModifyQuestionForm.vue';

export default {
  name: 'QuestionCreateQuestion',
  components: {
    CreateOrModifyQuestionForm,
  },
  methods: {
    async handleCreateQuestion(data) {
      console.log('[CreateQuestion:handleCreateQuestion]: ', data);
      this.$store.dispatch('setIsProcessing', true);
      try {
        const isValid = await this.$refs.form.validateForm();
        if (isValid) {
          await addQuestion(data);
          // TODO: Redirect to /user/question
          this.$message({ type: 'success', message: '新增文章草稿成功' });
          this.$router.push({ path: '/question' });
        }
        this.$store.dispatch('setIsProcessing', false);
      } catch (error) {
        this.$store.dispatch('setIsProcessing', false);
        this.$message({ type: 'error', message: error.message });
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .create-question-container {
    min-width: 100%;
  }
}

.title-container {
  padding-left: 100px;
  margin-bottom: 30px;
}
.title-container h1 {
  font-size: 24px;
  color: #232323;
}
</style>
