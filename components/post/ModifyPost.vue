<template>
  <div class="container">
    <div class="title-container">
      <h1>修改文章</h1>
    </div>
    <CreateOrModifyPostForm
      ref="form"
      :form-data="formData"
      @submit="handleModifyPost"
    />
  </div>
</template>

<script>
import CreateOrModifyPostForm from '@/components/post/CreateOrModifyPostForm.vue';
import { getPost, modifyPost } from '@/api/post';

export default {
  name: 'PostModifyPost',
  components: {
    CreateOrModifyPostForm,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        title: '',
        subtitle: '',
        tag_id: '',
      },
      post: {
        _id: '',
        user_id: null,
        tag_id: null,
        title: '',
        subtitle: '',
        content: '',
        is_published: null,
        created_at: null,
      },
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetPost(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetPost() {
      const res = await getPost(this.postId);
      this.post = res;
      this.formData.title = res.title;
      this.formData.subtitle = res.subtitle;
      this.formData.tag_id = res.tag_id;
      this.$refs.form.setContent(res.content);
    },
    async handleModifyPost(data) {
      console.log('[PostModifyPost:handleModifyPost]: ', data);
      try {
        const isValid = await this.$refs.form.validateForm();
        if (isValid) {
          this.$store.dispatch('setIsProcessing', true);
          await modifyPost({ _id: this.post._id, ...data });
          this.$message({ type: 'success', message: '儲存貼文成功' });
          this.$router.push(`/post/${this.post._id}`);
          this.$store.dispatch('setIsProcessing', false);
        }
      } catch (error) {
        this.$message({ type: 'error', message: '儲存貼文失敗' });
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
