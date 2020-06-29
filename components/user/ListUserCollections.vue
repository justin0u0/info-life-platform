<template>
  <div class="row mx-5">
    <div
      v-for="post in posts"
      :key="post._id"
      class="col-12"
    >
      <PreviewCard :post-data="post" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCollections } from '@/api/collection';
import PreviewCard from '@/components/user/UserPostPreview.vue';

export default {
  name: 'UserListUserCollections',
  components: {
    PreviewCard,
  },
  data() {
    return {
      posts: [],
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
      const { data } = await getCollections({
        filter: {
          user_id: this.currentUser._id,
        },
      });
      this.posts = data.map((datum) => datum.post);
    },
  },
};
</script>

<style scoped>
</style>
