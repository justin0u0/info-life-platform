<template>
  <div class="container create-post-container">
    <div class="title-container">
      <h1>新增文章草稿</h1>
    </div>
    <CreateOrModifyPostForm ref="form" @submit="handleCreatePost" />
  </div>
</template>

<script>
import { addPost } from '@/api/post';
import CreateOrModifyPostForm from '@/components/post/CreateOrModifyPostForm.vue';

export default {
  name: 'PostCreatePost',
  components: {
    CreateOrModifyPostForm,
  },
  methods: {
    async handleCreatePost(data) {
      console.log('[CreatePost:handleCreatePost]: ', data);
      this.$store.dispatch('setIsProcessing', true);
      try {
        const isValid = await this.$refs.form.validateForm();
        if (isValid) {
          await addPost(data);
          // TODO: Redirect to /user/post
          this.$message({ type: 'success', message: '新增文章草稿成功' });
          this.$router.push({ path: '/post' });
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

.title-container {
  padding-left: 100px;
  margin-bottom: 30px;
}
.title-container h1 {
  font-size: 24px;
  color: #232323;
}
</style>
