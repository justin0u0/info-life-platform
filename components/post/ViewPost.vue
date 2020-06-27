<template>
  <div class="container">
    <ProgressBar />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <h1 class="post-title">{{ post.title }}</h1>
        <h2 class="post-subtitle">{{ post.subtitle }}</h2>
        <UserInfo :user-data="user" :info-data="post" />
        <div class="post-cover" :style="{ backgroundImage: `url(${coverUrl})` }"></div>
        <Editor :content-data="contentObj" />
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script>
import { getPost, increaseViewCount } from '@/api/post';
import Editor from '@/components/editor/ViewEditor.vue';
import BackToTop from '@/components/BackToTop.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import UserInfo from '@/components/common/UserInfo.vue';

export default {
  name: 'PostViewPost',
  components: {
    Editor,
    BackToTop,
    ProgressBar,
    UserInfo,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: {
        _id: null,
        user_id: null,
        tag_id: null,
        title: '',
        subtitle: '',
        content: '',
        cover: null,
        created_at: null,
        published_at: null,
        share_count: 0,
        view_count: 0,
      },
      user: {
        _id: null,
        username: '',
        name: '',
        avatar: null,
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
    setTimeout(this.handleIncreaseViewCount, 30000);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetPost() {
      const res = await getPost(this.postId);
      this.post = res;
      this.user = res.user;
      this.contentObj = JSON.parse(res.content);
      try {
        await this.$axios.get(res.cover.file_url);
        this.coverUrl = res.cover.file_url;
      } catch (error) {
        this.coverUrl = '/assets/previewCardDefaultImage.jpg';
      }
      console.log('[PostViewPost:preGetPost]: ', this.contentObj);
    },
    async handleIncreaseViewCount() {
      const { success } = await increaseViewCount(this.postId);
      if (success === true) this.view_count += 1;
    },
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
