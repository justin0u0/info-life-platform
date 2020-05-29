<template>
  <div>
    <div class="container mt-4">
      <nav class="my-2">
        <a
          v-for="tag in tags"
          :key="tag._id"
          class="mx-md-2 mx-1"
          @click="handleGetPosts(tag._id)"
        >
          {{ tag.name }}
        </a>
      </nav>
    </div>
    <div class="container mt-4">
      <div class="row">
        <template v-for="post in posts">
          <Card :key="post._id" :post-data="post" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/posts/Card';

export default {
  components: {
    Card,
  },
  data() {
    return {
      total: 0,
      posts: [],
      tags: [],
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetPosts(),
      this.preGetTags(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetPosts() {
      const post = {
        title: 'It\'s is a beautiful world!',
        subtitle: 'If I told you to aim to create 30 Perfect Days, could you? How long would it take? Thirty days? Six months? Ten years? Never?',
        view_count: 1,
        created_at: 1590732188846,
        user: {
          username: 'username',
          avatar: null,
        },
      };
      const posts = [];
      for (let i = 0; i < 10; i += 1) {
        posts.push({ _id: `${i}`, ...post, content: `post #${i}` });
      }
      const res = { total: 20, data: posts };
      this.posts = res.data;
      this.total = res.total;
    },
    async preGetTags() {
      const tags = [
        { _id: '1234', name: '全部', color: 0 },
        { _id: '1234', name: '技術文章', color: 0 },
        { _id: '1234', name: '出國交換', color: 0 },
        { _id: '1234', name: '實習工作', color: 0 },
        { _id: '1234', name: '學習課業', color: 0 },
        { _id: '1234', name: '生活分享', color: 0 },
      ];
      this.tags = tags;
    },
    async handleGetPosts(tagId) {
      console.log('[handleGetPosts]: ', tagId);
    },
  },
};
</script>

<style scoped>
a {
  color: #999;
  font-family: "微軟正黑體", sans-serif;
  font-weight: bold;
  letter-spacing: 0.1rem;
}
a:hover {
  color: #000;
  text-decoration: none;
}
</style>
