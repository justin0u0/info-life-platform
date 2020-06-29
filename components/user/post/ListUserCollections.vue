<template>
  <div class="mx-4">
    <el-tabs type="card">
      <el-tab-pane label="已收藏">
        <div
          v-for="post in posts"
          :key="post._id"
          class="mx-2"
        >
          <div v-if="post !== posts[0]" class="divider" />
          <CollectionPreview :post-data="post" />
        </div>
        <div class="row justify-content-center mt-5">
          <el-pagination
            layout="prev, pager, next"
            :total="totalPosts"
            :page-size="limit"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCollections } from '@/api/collection';
import CollectionPreview from '@/components/user/post/CollectionPreview.vue';

export default {
  name: 'UserPostListUserCollections',
  components: {
    CollectionPreview,
  },
  data() {
    return {
      posts: [],
      totalPosts: 0,
      limit: 6,
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      await this.preGetCollections(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetCollections() {
      const { total, data } = await getCollections({
        filter: { user_id: this.currentUser._id },
        limit: this.limit,
      });
      this.posts = data.map((datum) => datum.post);
      this.totalPosts = total;
    },
    async handleCurrentChange(page) {
      console.log('[UserListUserCollections:handleCurrentChange]: ', page);
      this.$store.dispatch('setIsProcessing', true);
      const { data } = await getCollections({
        filter: { user_id: this.currentUser._id },
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
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
