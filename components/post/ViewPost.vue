<template>
  <!--
  <div class="container mw-100 mx-0 px-0 background">
    <div class="row mx-0 pb-3">
      <div class="like-collect col-2 d-flex justify-content-center align-items-center flex-column">
        <div class="py-2 sticky-top">
          <font-awesome-icon v-if="!heartShow" :icon="['far', 'heart']" size="2x" :style="{color: 'black'}" @click="modifyHeartState" />
          <font-awesome-icon v-if="heartShow" :icon="['fas', 'heart']" size="2x" :style="{color: 'black'}" @click="modifyHeartState" />
          <span class="align-top font-weight-bold likes">{{ likes }}</span>
        </div>
        <div class="py-2 sticky-offset sticky-top">
          <font-awesome-icon v-if="!bookmarkShow" :icon="['far', 'bookmark']" size="2x" :style="{color: 'black'}" @click="modifyBookmarkState" />
          <font-awesome-icon v-if="bookmarkShow" :icon="['fas', 'bookmark']" size="2x" :style="{color: 'black'}" @click="modifyBookmarkState" />
          <span class="align-top font-weight-bold likes">{{ collects }}</span>
        </div>
      </div>
      <div class="article col-8">
        <div class="text-center">
          <h1>{{ post.title }}</h1>
        </div>
        <div class="text-center">
          <h2>{{ post.subtitle }}</h2>
        </div>
        <div class="content">
          {{ post.content }}
        </div>
      </div>
      <div class="list col-2">
        list
      </div>
    </div>
  </div>
  -->
  <div class="container">
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

export default {
  name: 'PostViewPost',
  components: {
    Editor,
    BackToTop,
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
    modifyHeartState() {
      this.heartShow = !this.heartShow;
      this.likes = (this.heartShow) ? this.likes + 1 : this.likes - 1;
    },
    modifyBookmarkState() {
      this.bookmarkShow = !this.bookmarkShow;
      this.collects = (this.bookmarkShow) ? this.collects + 1 : this.collects - 1;
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
