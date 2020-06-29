<template>
  <div v-show="isLoggedIn" class="mt-5">
    <el-card slot="header" class="header">
      <el-button
        type="info"
        plain
        class="w-100"
        @click="handleShowCreateComment"
      >
        <span>我要留言</span>
      </el-button>
      <div v-show="visible" class="pb-3 px-4">
        <CurrentUserInfo class="mb-0" />
        <CreateOrModifyCommentForm ref="form" @submit="handleCreateComment" />
      </div>
    </el-card>
  </div>
</template>

<script>
import CurrentUserInfo from '@/components/user/CurrentUserInfo.vue';
import CreateOrModifyCommentForm from '@/components/comment/CreateOrModifyCommentForm.vue';
import { addComment } from '@/api/comment';
import { mapGetters } from 'vuex';

export default {
  name: 'CommentCreateComment',
  components: {
    CreateOrModifyCommentForm,
    CurrentUserInfo,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'isLoggedIn',
    ]),
  },
  methods: {
    handleShowCreateComment() {
      this.visible = !this.visible;
    },
    async handleCreateComment(data) {
      console.log('[CreateComment:handleCreateComment]: ', data);
      this.$store.dispatch('setIsProcessing', true);
      try {
        await addComment({
          parent_type: 'post',
          parent_id: this.postId,
          content: data.content,
        });
        this.$message({ type: 'success', message: '新增留言成功' });
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
.header {
  color: #505050;
}
.header /deep/ .el-button--info.is-plain:focus,
.header /deep/ .el-button--info.is-plain:hover {
  background: #bbbbbb;
  border-color: #bbbbbb;
}
</style>
