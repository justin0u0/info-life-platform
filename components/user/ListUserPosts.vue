<template>
  <div class="container list-posts-container mt-4">
    <div
      v-for="(post, index) in posts"
      :key="post._id"
      class="row"
    >
      <div v-if="post !== posts[0]" class="divider" />
      <div class="col-lg-9">
        <PostInfo :post-data="post" />
      </div>
      <div class="col-lg-3 col-sm-12">
        <PostButton
          :post-data="post"
          :is-published="isPublished"
          @toggle-is-published="handleTogglePostIsPublished(post._id, post.title, index)"
        />
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <el-pagination
        layout="prev, pager, next"
        :total="totalPosts"
        :page-size="limit"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getPostsByCurrentUser, modifyIsPublished } from '@/api/post';
import PostInfo from '@/components/user/PostInfo.vue';
import PostButton from '@/components/user/PostButton.vue';

export default {
  name: 'UserListUserPosts',
  components: {
    PostInfo,
    PostButton,
  },
  props: {
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      posts: [],
      totalPosts: 0,
      limit: 6,
      loading: false,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetPosts(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetPosts() {
      const { total, data } = await getPostsByCurrentUser({
        filter: { is_published: this.isPublished },
        limit: this.limit,
      });
      this.totalPosts = total;
      this.posts = data;
    },
    async handleCurrentChange(page) {
      console.log('[UserListUserPosts:handleCurrentChange]: ', page);
      this.$store.dispatch('setIsProcessing', true);
      const { data } = await getPostsByCurrentUser({
        filter: { is_published: this.isPublished },
        limit: this.limit,
        skip: (page - 1) * this.limit,
      });
      this.posts = data;
      this.$store.dispatch('setIsProcessing', false);
    },
    async handleTogglePostIsPublished(postId, title, index) {
      const messages = [
        {
          message: `確定要發佈「${title}」?`,
          successMessage: '發佈成功',
          cancelMessage: '發佈取消',
        },
        {
          message: `確定要將「${title}」存入草稿?`,
          successMessage: '存入草稿成功',
          cancelMessage: '取消存入草稿',
        },
      ];
      const { message, successMessage, cancelMessage } = messages[Number(this.isPublished)];
      try {
        await this.$confirm(message, '提醒', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
        });
        await modifyIsPublished({ _id: postId, is_published: !this.isPublished });
        this.posts.splice(index, 1);
        this.$message({
          type: 'success',
          message: successMessage,
        });
      } catch (error) {
        this.$message({
          type: 'info',
          message: cancelMessage,
        });
      }
    },
  },
};
</script>

<style scoped>
.list-posts-container {
  max-width: 960px;
}
.post-container {
  min-width: 150px;
  max-width: 800px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
