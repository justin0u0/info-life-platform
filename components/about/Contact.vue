<template>
  <div class="container feedback-container justify-content-center mt-4">
    <el-form
      ref="form"
      :model="form"
      label-width="50px"
    >
      <el-form-item class="w-100" label="信箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item class="w-100" label="想法">
        <el-input v-model="form.content" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="d-flex justify-content-center">
      <el-button type="info" @click="handleCreateFeedback">送出</el-button>
    </div>
  </div>
</template>

<script>
import { addFeedback } from '@/api/feedback';

export default {
  data() {
    return {
      form: {
        email: '',
        content: '',
      },
    };
  },
  methods: {
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(email).toLowerCase());
    },
    async handleCreateFeedback() {
      try {
        this.$store.dispatch('setIsProcessing', true);
        const { email, content } = this.form;
        if (!email || !this.validateEmail(email)) throw new Error('Invalid email');
        if (!content || typeof content !== 'string' || content.trim() === '') throw new Error('Invalid content');
        await addFeedback(email, content);
        this.$message({ type: 'success', message: '感謝您的回覆！' });
        this.form = { email: '', content: '' };
        this.$refs.form.resetFields();
        this.$store.dispatch('setIsProcessing', false);
      } catch (error) {
        console.error(error);
        this.$message({ type: 'error', message: '新增回應失敗' });
        this.$store.dispatch('setIsProcessing', false);
      }
    },
  },
};
</script>

<style scoped>
.feedback-container {
  max-width: 768px;
}
</style>
