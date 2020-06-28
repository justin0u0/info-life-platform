<template>
  <el-card>
    <div slot="header">
      <span>顯示留言({{ totalComments }})</span>
    </div>
    <div
      v-for="comment in comments"
      :key="comment._id"
    >
      <ViewEditor :content-data="JSON.parse(comment.content)" />
    </div>
  </el-card>
</template>

<script>
import { getComments } from '@/api/comment';
import ViewEditor from '@/components/editor/ViewEditor.vue';

export default {
  name: 'CommentListComments',
  components: {
    ViewEditor,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      totalComments: 0,
      countComments: 0,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetComments(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetComments() {
      const { total, data } = await getComments({
        filter: {
          parent_type: 'post',
          parent_id: this.postId,
        },
      });
      this.totalComments = total;
      this.comments = data;
      this.countComments = data.length;
    },
  },
};
</script>

<style scoped>

</style>
