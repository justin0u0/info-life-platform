<template>
  <div v-show="isLoggedIn" class="mt-5">
    <hr>
    <div>
      <h4 class="pb-2 answer-font">我要回答</h4>
      <div class="create-answer-container pb-3 px-4">
        <CurrentUserInfo v-if="isLoggedIn" />
        <CreateOrModifyAnswerForm ref="form" :is-creating="true" @submit="handleCreateAnswer" />
      </div>
    </div>
  </div>
</template>

<script>
import { addAnswer } from '@/api/answer';
import CreateOrModifyAnswerForm from '@/components/answer/CreateOrModifyAnswerForm.vue';
import CurrentUserInfo from '@/components/user/CurrentUserInfo.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AnswerCreateAnswer',
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
  computed: {
    ...mapGetters([
      'currentUser',
      'isLoggedIn',
    ]),
  },
  methods: {
    async handleCreateAnswer(data) {
      console.log('[CreateAnswer:handleCreateAnswer]: ', data);
      this.$store.dispatch('setIsProcessing', true);
      try {
        await addAnswer({ question_id: this.questionId, ...data });
        this.$message({ type: 'success', message: '新增回答成功' });
        // TODO: fix me
        window.location.reload();
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
