<template>
  <div class="container">
    <el-card>
      <Editor :content-data.sync="contentObj" />
    </el-card>
    <div class="mt-3 d-flex justify-content-end">
      <el-button @click="handleModifyPost">儲存</el-button>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/ModifyPostEditor.vue';
import { getPost, modifyPost } from '@/api/post';

export default {
  name: 'PostModifyPost',
  components: {
    Editor,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
      contentObj: {},
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
      this.contentObj = JSON.parse(res.content);
      console.log('[PostsModifyPost:preGetPost]: ', this.contentObj);
    },
    async handleModifyPost() {
      const { type, content } = this.contentObj;
      const contentStr = JSON.stringify({ type, content });
      console.log('[handleModifyPost]: ', contentStr);
      try {
        this.$store.dispatch('setIsProcessing', true);
        await modifyPost({ _id: this.post._id, content: contentStr });
        this.$message({ type: 'success', message: '儲存貼文成功' });
        this.$router.push(`/post/${this.post._id}`);
        this.$store.dispatch('setIsProcessing', false);
      } catch (error) {
        this.$message({ type: 'error', message: '儲存貼文失敗' });
        this.$store.dispatch('setIsProcessing', false);
      }
    },
  },
};
</script>

<style scoped>
</style>
