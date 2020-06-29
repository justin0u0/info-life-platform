<template>
  <div>
    <CreateOrModifyAnswerForm
      ref="form"
      :form-data="formData"
      :is-creating="false"
      @cancel="handleCancel"
      @submit="handleModifyAnswer"
    />
  </div>
</template>

<script>
import CreateOrModifyAnswerForm from '@/components/answer/CreateOrModifyAnswerForm.vue';
import { getAnswer, modifyAnswer } from '@/api/answer';

export default {
  name: 'AnswerModifyAnswer',
  components: {
    CreateOrModifyAnswerForm,
  },
  props: {
    answerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
      answer: {
        _id: '',
        user_id: null,
        content: '',
        created_at: null,
      },
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetAnswer(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetAnswer() {
      const res = await getAnswer(this.answerId);
      this.answer = res;
      this.$refs.form.setContent(res.content);
    },
    handleCancel() {
      this.$emit('cancel');
    },
    async handleModifyAnswer(data) {
      console.log('[AnswerModifyAnswer:handleModifyAnswer]: ', data);
      try {
        this.$store.dispatch('setIsProcessing', true);
        await modifyAnswer({ _id: this.answer._id, ...data });
        this.$message({ type: 'success', message: '儲存修改成功', duration: 1000 });
        this.$emit('modify-answer', data);
        this.$store.dispatch('setIsProcessing', false);
      } catch (error) {
        console.log(error);
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
