<template>
  <div class="container">
    <ListTags />
    <div class="row">
      <div
        v-for="post in posts"
        :key="post._id"
        class="col-12 col-md-6 col-lg-4"
      >
        <PreviewCard :post-data="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { getPosts } from '@/api/post';
import ListTags from '@/components/posts/ListTags.vue';
import PreviewCard from '@/components/posts/PreviewCard.vue';

export default {
  name: 'PostsListPosts',
  components: {
    ListTags,
    PreviewCard,
  },
  data() {
    return {
      posts: [],
      totalPosts: 0,
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
      const { data } = await getPosts({ limit: 12 });
      this.totalPosts = data.length;
      this.posts = data;
    },
  },
};
</script>

<style scoped>
</style>
