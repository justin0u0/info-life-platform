<template>
  <div class="container">
    <div
      v-for="post in posts"
      :key="post._id"
      class="row"
    >
      <div class="col-12 post-container">
        <h1>{{ post.title }}</h1>
        <h2>{{ post.subtitle }}</h2>
      </div>
    </div>
    <div class="row justify-content-center">
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
.post-container {
  font-family: '微軟正黑體', sans-serif;
  margin-bottom: 30px;
}
.post-container h1 {
  font-size: 25.2px;
  color: #292929;
}
.post-container h2 {
  font-family: '微軟正黑體', sans-serif;
  font-size: 18px;
  color: #757575;
}
</style>
