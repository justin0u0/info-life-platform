<template>
  <el-card class="comments-container">
    <div slot="header" class="header">
      <el-button
        ref="controlVisibleButton"
        type="info"
        plain
        class="w-100"
        @click="handleControlVisible"
      >
        <span>{{ commentsVisible ? '隱藏留言' : '顯示留言' }}({{ totalComments }})</span>
      </el-button>
    </div>
    <transition name="comment" mode="out-in">
      <div v-show="commentsVisible">
        <div
          v-for="comment in comments"
          :key="comment._id"
        >
          <div class="user-container">
            <el-avatar size="medium" src="/assets/img_avatar.png" />
            <div class="d-flex flex-column ml-3">
              <span>{{ comment.user.name }}</span>
              <span class="date-container">{{ new Date(comment.created_at).toLocaleString() }}</span>
            </div>
          </div>
          <ViewEditor font-size="16px" :content-data="JSON.parse(comment.content)" />
          <el-divider />
        </div>
      </div>
    </transition>
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
      commentsVisible: false,
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
    handleControlVisible() {
      this.commentsVisible = !this.commentsVisible;
      this.$refs.controlVisibleButton.$el.blur();
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  color: #505050;
}
.user-container {
  display: flex;
  align-items: center;
}
.date-container {
  font-size: 0.85em;
  color: #6f6f6f;
}
.header /deep/ .el-button--info.is-plain:focus,
.header /deep/ .el-button--info.is-plain:hover {
  background: #bbbbbb;
  border-color: #bbbbbb;
}

.comment-enter-active,
.comment-leave-active {
  transition: max-height 0.3s ease-in;
  max-height: 500px;
}
.comment-enter,
.comment-leave-to {
  max-height: 0;
  transition: max-height 0.25s ease-out;
  overflow: hidden;
}
</style>
