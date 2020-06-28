<template>
  <div class="mt-5">
    <hr>
    <div>
      <h4 class="pb-2">我要回答</h4>
      <div class="create-answer-container pb-3 px-4">
        <CurrentUserInfo />
        <CreateOrModifyAnswerForm ref="form" @submit="handleCreateAnswer" />
      </div>
    </div>
  </div>
</template>

<script>
import { addAnswer } from '@/api/answer';
import CreateOrModifyAnswerForm from '@/components/question/CreateOrModifyAnswerForm.vue';
import CurrentUserInfo from '@/components/CurrentUserInfo.vue';

export default {
  name: 'QuestionCreateAnswer',
  components: {
    CreateOrModifyAnswerForm,
    CurrentUserInfo,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async handleCreateAnswer(data) {
      console.log('[CreateAnswer:handleCreateAnswer]: ', data);
      this.$store.dispatch('setIsProcessing', true);
      try {
        const isValid = await this.$refs.form.validateForm();
        if (isValid) {
          await addAnswer({ question_id: this.questionId, ...data });
          this.$message({ type: 'success', message: '新增回答成功' });
          // TODO: fix me
          window.location.reload();
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
  .create-post-container {
    min-width: 100%;
  }
}
.create-answer-container {
  border: 1px solid #DCDFE6;
}
</style>
