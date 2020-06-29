<template>
  <div class="preview d-flex">
    <div class="col-3">
      <a :href="`/post/${postData._id}`">
        <div
          class="image-container"
          :style="{ backgroundImage: `url(${coverUrl})` }"
        />
      </a>
    </div>
    <div class="px-1 col-9">
      <a class="title-link" :href="`/post/${postData._id}`">
        <h5 class="title mb-2">{{ postData.title }}</h5>
      </a>
      <div class="d-flex my-2 pt-3">
        <div class="mr-2">
          <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png" alt="user image">
        </div>
        <div class="ml-2">
          <p class="mb-1">{{ postData.user.username }}</p>
          <p class="mb-1">{{ transformDate(postData.created_at) }}</p>
        </div>
        <div class="ml-auto mt-2">
          <p>
            <font-awesome-icon :icon="['far', 'heart']" />
            <span>{{ likes }}</span>
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';

export default {
  name: 'PostPreviewCard',
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      coverUrl: '/assets/previewCardDefaultImage.jpg',
      likes: 0,
    };
  },
  watch: {
    postData: {
      immediate: true,
      async handler(postData) {
        // Update coverUrl
        try {
          await this.$axios.get(postData.cover.file_url);
          this.coverUrl = postData.cover.file_url;
        } catch (error) {
          this.coverUrl = '/assets/previewCardDefaultImage.jpg';
        }
      },
    },
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetReactions(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetReactions() {
      const res = await countReactions({ source_type: 'post', source_id: this.postData._id });
      this.likes = res.like;
    },
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.preview {
  margin-bottom: 20px;
}
.image-container {
  position: relative;
  display: flex;
  height: 200px;
  width: 100%;
  align-items: center;
  overflow-y: hidden;
  background-size: cover;
  background-position: center;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}
.user-image {
  height: 50px;
  width: 50px;
}
.title { color: black; }
.subtitle { color: #777; }
.title-link { text-decoration-color: black; }
</style>
