<template>
  <div class="post-container">
    <h1>{{ postData.title }}</h1>
    <h2>{{ postData.subtitle }}</h2>
    <div class="d-flex">
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span>{{ postData.view_count }}</span>
      </div>
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'heart']" />
        <span>{{ likes }}</span>
      </div>
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'bookmark']" />
        <span>{{ collections }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';
import { countCollections } from '@/api/collection';

export default {
  name: 'UserPostInfo',
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      likes: 0,
      collections: 0,
    };
  },
  watch: {
    postData: {
      immediate: true,
      async handler(postData) {
        if (postData && postData._id) {
          this.$store.dispatch('setIsProcessing', true);
          await Promise.all([
            this.preGetReactions(postData._id),
            this.preGetCollections(postData._id),
          ]);
          this.$store.dispatch('setIsProcessing', false);
        }
      },
    },
  },
  methods: {
    async preGetReactions(postId) {
      const res = await countReactions({ source_type: 'post', source_id: postId });
      this.likes = res.like;
    },
    async preGetCollections(postId) {
      const res = await countCollections(postId);
      this.collections = res.total;
    },
  },
};
</script>

<style scoped>
.post-container {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
}
.post-container h1 {
  font-size: 21.2px;
  font-weight: 600;
  color: #292929;
}
.post-container h2 {
  font-size: 17px;
  color: #757575;
}
.info-container {
  text-align: center;
  font-size: 14px;
  color: #696969;
  margin-right: 1rem;
  margin-top: 10px;
}
.icon-size {
  height: 16px;
  width: 16px
}
</style>
