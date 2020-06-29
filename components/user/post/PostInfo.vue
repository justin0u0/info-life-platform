<template>
  <div class="post-container">
    <h1><a :href="`/post/${postData._id}`">{{ postData.title }}</a></h1>
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
      <div class="ml-auto pt-1">
        <ProfileLink :user-data="postData.user" />
        <span class="ml-2 post-date">{{ transformDate(postData.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';
import { countCollections } from '@/api/collection';
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'UserPostPostInfo',
  components: {
    ProfileLink,
  },
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
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString().concat(` ${d.toLocaleTimeString('it-IT')}`);
    },
  },
};
</script>

<style scoped>
a {
  color: #292929;
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
.post-date {
  color: #696969;
}
.info-container {
  text-align: center;
  font-size: 14px;
  color: #888888;
  margin-right: 1rem;
  margin-top: 10px;
}
.icon-size {
  height: 16px;
  width: 16px
}
</style>
