<template>
  <div class="preview row my-2">
    <div class="col-12 col-md-3">
      <a :href="`/post/${postData._id}`">
        <div
          class="image-container"
          :style="{ backgroundImage: `url(${coverUrl})` }"
        />
      </a>
    </div>
    <div class="col-12 col-md-9 d-flex flex-column">
      <a class="title-link mt-1" :href="`/post/${postData._id}`">
        <h4 class="title">{{ postData.title }}</h4>
      </a>
      <h5 class="subtitle">{{ postData.subtitle }}</h5>
      <div class="d-flex mt-auto user-info">
        <div class="mr-2">
          <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png" alt="user image">
        </div>
        <div class="ml-2">
          <p class="mb-1 questioner">
            <a href="#">{{ postData.user.name }}</a>
          </p>
          <p class="mb-1">{{ transformDate(postData.created_at) }}</p>
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
.questioner a {
  color: rgba(64, 158, 255, 0.8);
}
.questioner a:hover {
  color: rgb(64, 158, 255);
}
.title { color: black; }
.subtitle { color: #777; }
.title-link { text-decoration-color: black; }
.user-info { color: #777; }
</style>
