<template>
  <div class="container">
    <ListTags :current-tag="currentTag" @tag-click="handleTagClick" />
    <div v-infinite-scroll="loadPosts" class="row infinite-list">
      <div
        v-for="post in posts"
        :key="post._id"
        class="col-12 col-md-6 col-lg-4"
      >
        <PreviewCard :post-data="post" />
      </div>
    </div>
    <div v-show="loading" v-loading="loading" class="loading-block" />
  </div>
</template>

<script>
import { getPosts } from '@/api/post';
import ListTags from '@/components/post/ListTags.vue';
import PreviewCard from '@/components/post/PreviewCard.vue';

export default {
  name: 'PostListPosts',
  components: {
    ListTags,
    PreviewCard,
  },
  data() {
    return {
      posts: [],
      totalPosts: 0,
      countPosts: 0,
      currentTag: null,
      currentFilter: {},
      limit: 12,
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
      // Get Posts
      await this.getPostsProcess();
    },
    async handleTagClick(tagId) {
      if (this.currentTag === tagId) return;
      // Set currentTag, currentFilter
      this.currentTag = tagId;
      const filter = {};
      if (tagId !== null) filter.tag_id = tagId;
      this.currentFilter = filter;
      // Reset posts, countPosts
      this.posts = [];
      this.countPosts = 0;
      // Get Posts
      await this.getPostsProcess();
    },
    async loadPosts() {
      if (this.loading === true || this.totalPosts === this.countPosts) return;
      await this.getPostsProcess();
    },
    async getPostsProcess() {
      this.loading = true;
      const { total, data } = await getPosts({ filter: this.currentFilter, limit: this.limit, skip: this.countPosts });
      this.totalPosts = total;
      this.countPosts += data.length;
      this.posts.push(...data);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-block {
  width: 100%;
  height: 30px;
}
</style>
