<template>
  <div class="card preview-card">
    <a :href="`/post/${postData._id}`">
      <div
        class="card-image-container"
        :style="{ backgroundImage: `url(${coverUrl})` }"
      />
    </a>
    <div class="card-body px-1">
      <a class="card-title-link" :href="`/post/${postData._id}`">
        <h5 class="card-title mb-2">{{ postData.title }}</h5>
      </a>
      <h6 class="card-subtitle my-2">{{ transformSubtitle(postData.subtitle) }}</h6>
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
            <font-awesome-icon :icon="['far', 'eye']" />
            <span>{{ postData.view_count }}</span>
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
    transformSubtitle(subtitle) {
      return subtitle.slice(0, 100).concat('...');
    },
  },
};
</script>

<style scoped>
.preview-card {
  /* font-family: custom-sans-serif, sans-serif; */
  border: none;
  margin-bottom: 20px;
}
.card-image-container {
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
.card-title { color: black; }
.card-subtitle { color: #777; }
.card-title-link { text-decoration-color: black; }
</style>
