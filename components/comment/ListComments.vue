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
    <transition name="comments" mode="out-in">
      <div v-show="commentsVisible">
        <transition-group name="comment" tag="div">
          <div
            v-for="comment in comments"
            :key="comment._id"
          >
            <div class="user-container">
              <el-avatar size="medium" src="/assets/img_avatar.png" />
              <div class="d-flex flex-column ml-3">
                <ProfileLink :user-data="comment.user" />
                <span class="date-container">{{ new Date(comment.created_at).toLocaleString() }}</span>
              </div>
            </div>
            <ViewEditor font-size="16px" :content-data="JSON.parse(comment.content)" />
            <el-divider />
          </div>
        </transition-group>
        <div
          v-show="countComments < totalComments"
          class="w-100 text-center load-more-container"
          @click="loadMoreComments"
        >
          <i v-if="loading" class="el-icon-loading" />
          <i v-else class="el-icon-download" />
        </div>
      </div>
    </transition>
  </el-card>
</template>

<script>
import { getComments } from '@/api/comment';
import ViewEditor from '@/components/editor/ViewEditor.vue';
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'CommentListComments',
  components: {
    ViewEditor,
    ProfileLink,
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
      limit: 5,
      totalComments: 0,
      countComments: 0,
      commentsVisible: false,
      loading: false,
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
      this.loading = true;
      const { total, data } = await getComments({
        filter: {
          parent_type: 'post',
          parent_id: this.postId,
        },
        limit: this.limit,
      });
      this.totalComments = total;
      this.comments = data;
      this.countComments = data.length;
      this.loading = false;
    },
    handleControlVisible() {
      this.commentsVisible = !this.commentsVisible;
      this.$refs.controlVisibleButton.$el.blur();
    },
    async loadMoreComments() {
      if (this.loading || this.countComments === this.totalComments) return;
      this.loading = true;
      const { data } = await getComments({
        filter: {
          parent_type: 'post',
          parent_id: this.postId,
        },
        limit: this.limit,
        skip: this.countComments,
      });
      this.comments.push(...data);
      this.countComments += data.length;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.comments-container {
  margin-top: 50px;
}

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

.comments-enter-active,
.comments-leave-active,
.comment-enter-active,
.comment-leave-active {
  transition: max-height 0.3s ease-in;
  max-height: 500px;
}
.comments-enter,
.comments-leave-to,
.comment-enter,
.comment-leave-to {
  max-height: 0;
  transition: max-height 0.25s ease-out;
  overflow: hidden;
}

.load-more-container {
  font-size: 21px;
  margin-top: -12px;
  margin-bottom: -8px;
}
.load-more-container:hover {
  cursor: pointer;
  background-color: #f3f3f3;
}
</style>
