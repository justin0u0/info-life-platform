<template>
  <div class="container">
    <ProgressBar :title="post.title" />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <h1 class="post-title">{{ post.title }}</h1>
        <h2 class="post-subtitle">{{ post.subtitle }}</h2>
        <div class="post-cover" :style="{ backgroundImage: `url(${coverUrl})` }"></div>
        <Editor :content-data="contentObj" />
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script>
import { getPost } from '@/api/post';
import Editor from '@/components/editor/ViewPostEditor.vue';
import BackToTop from '@/components/BackToTop.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'PostViewPost',
  components: {
    Editor,
    BackToTop,
    ProgressBar,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // progress: '100%',
      post: {
        _id: null,
        user_id: null,
        tag_id: null,
        title: '',
        subtitle: '',
        content: '',
        cover: null,
        published_at: null,
        share_count: 0,
        view_count: 0,
      },
      contentObj: {},
      coverUrl: '/assets/previewCardDefaultImage.jpg',
      heartShow: false,
      bookmarkShow: false,
      likes: 0,
      collects: 0,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetPost(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetPost() {
      const res = await getPost(this.postId);
      this.post = res;
      this.contentObj = JSON.parse(res.content);
      try {
        await this.$axios.get(res.cover.fileUrl);
        this.coverUrl = res.cover.file_url;
      } catch (error) {
        this.coverUrl = '/assets/previewCardDefaultImage.jpg';
      }
      console.log('[PostViewPost:preGetPost]: ', this.contentObj);
    },
    // calcProgress() {
    //   const { contentEl } = this.$refs;
    //   const fullHeight = contentEl.scrollHeight;
    //   const viewHeight = contentEl.offsetHeight;
    //   const scrollPosition = contentEl.scrollTop;
    //   const progressValue = ((scrollPosition + viewHeight) / fullHeight) * 100;
    //   const progressValuePercentage = `${100 - progressValue}%`;
    //   this.progress = progressValuePercentage;
    // },
  },
};
</script>

<style scoped>
.post-title {
  font-size: 40px;
  line-height: 48px;
  font-weight: 400;
}
.post-cover {
  position: relative;
  display: flex;
  height: 300px;
  width: 100%;
  margin-top: 56px;
  overflow-y: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 0.1em;
}
.post-subtitle {
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0;
  font-weight: 300;
  color: #777;
}
</style>
