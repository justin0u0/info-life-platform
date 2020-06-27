<template>
  <div class="container">
    <ProgressBar />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8 d-flex justify-content-center">
        <div class="question-container">
          <h1 class="question-title">{{ question.title }}</h1>
          <UserInfo :user-data="user" :date-data="question.created_at" />
          <Editor :content-data="contentObj" />
        </div>
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script>
import { getQuestion } from '@/api/question';
import Editor from '@/components/editor/ViewEditor.vue';
import BackToTop from '@/components/BackToTop.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import UserInfo from '@/components/common/UserInfo.vue';

export default {
  name: 'QuestionViewQuestion',
  components: {
    Editor,
    BackToTop,
    ProgressBar,
    UserInfo,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // progress: '100%',
      question: {
        _id: null,
        user_id: null,
        tag_id: null,
        title: '',
        content: '',
        cover: null,
        published_at: null,
        share_count: 0,
        view_count: 0,
        created_at: 0,
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
      this.preGetQuestion(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetQuestion() {
      const res = await getQuestion(this.questionId);
      this.question = res;
      this.user = res.user;
      this.contentObj = JSON.parse(res.content);
      try {
        await this.$axios.get(res.cover.file_url);
        this.coverUrl = res.cover.file_url;
      } catch (error) {
        this.coverUrl = '/assets/previewCardDefaultImage.jpg';
      }
      console.log('[QuestionViewQuestion:preGetQuestion]: ', this.contentObj);
    },
  },
};
</script>

<style scoped>
.question-title {
  font-size: 40px;
  line-height: 48px;
  font-weight: 400;
}
.question-container {
  max-width: 720px;
}
</style>
