<template>
  <div class="container list-posts-container mt-4">
    <div
      v-for="post in posts"
      :key="post._id"
      class="row"
    >
      <div v-if="post !== posts[0]" class="divider" />
      <div class="post-container">
        <h1>{{ post.title }}</h1>
        <h2>{{ post.subtitle }}</h2>
        <div class="d-flex">
          <div class="info-container">
            <font-awesome-icon :icon="['far', 'eye']" />
            <span>1234</span>
          </div>
          <div class="info-container">
            <font-awesome-icon :icon="['far', 'heart']" />
            <span>1234</span>
          </div>
          <div class="info-container">
            <font-awesome-icon :icon="['far', 'bookmark']" />
            <span>1234</span>
          </div>
        </div>
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
import { getPostsByCurrentUser } from '@/api/post';

export default {
  name: 'UserListUserPosts',
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
  },
};
</script>

<style scoped>
.list-posts-container {
  max-width: 960px;
}
.post-container {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
  min-width: 150px;
  max-width: 800px;
}
.post-container h1 {
  font-size: 21.2px;
  font-weight: 600;
  color: #292929;
}
.post-container h2 {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
  font-size: 17px;
  color: #757575;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
.info-container {
  text-align: center;
  font-size: 14px;
  color: #696969;
  margin-right: 1rem;
  margin-top: 10px;
}
</style>
