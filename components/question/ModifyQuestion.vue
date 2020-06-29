<template>
  <div class="container">
    <div class="title-container">
      <h1>修改問題</h1>
    </div>
    <CreateOrModifyQuestionForm
      ref="form"
      :form-data="formData"
      @submit="handleModifyQuestion"
    />
  </div>
</template>

<script>
import CreateOrModifyQuestionForm from '@/components/question/CreateOrModifyQuestionForm.vue';
import { getQuestion, modifyQuestion } from '@/api/question';

export default {
  name: 'QuestionModifyquestion',
  components: {
    CreateOrModifyQuestionForm,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        title: '',
        tag_id: '',
      },
      question: {
        _id: '',
        user_id: null,
        tag_id: null,
        title: '',
        content: '',
        created_at: null,
      },
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetQuestion(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetQuestion() {
      const res = await getQuestion(this.questionId);
      this.question = res;
      this.formData.title = res.title;
      this.formData.tag_id = res.tag_id;
      this.$refs.form.setContent(res.content);
    },
    async handleModifyQuestion(data) {
      console.log('[QuestionModifyQuestion:handleModifyQuestion]: ', data);
      try {
        const isValid = await this.$refs.form.validateForm();
        if (isValid) {
          this.$store.dispatch('setIsProcessing', true);
          await modifyQuestion({ _id: this.question._id, ...data });
          this.$message({ type: 'success', message: '儲存修改成功', duration: 1000 });
          this.$router.push(`/question/${this.question._id}`);
          this.$store.dispatch('setIsProcessing', false);
        }
      } catch (error) {
        this.$message({ type: 'error', message: '儲存修改失敗', duration: 1000 });
        this.$store.dispatch('setIsProcessing', false);
      }
    },
  },
};
</script>

<style scoped>
.title-container {
  padding-left: 100px;
  margin-bottom: 30px;
}
.title-container h1 {
  font-size: 24px;
  color: #232323;
}
</style>
