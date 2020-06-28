<template>
  <div class="container">
    <ProgressBar />
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8 d-flex justify-content-center">
        <div class="question-container">
          <h1 class="question-title">{{ question.title }}</h1>
          <UserInfo
            :user-data="user"
            :question-data="question"
            :current-user-reaction="currentUserReaction"
          />
          <Editor :content-data="contentObj" />
          <ListAnswers :question-id="questionId" />
          <CreateAnswer :question-id="questionId" />
        </div>
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script>
import { getQuestion } from '@/api/question';
import { countReactions } from '@/api/reaction';
import Editor from '@/components/editor/ViewEditor.vue';
import BackToTop from '@/components/BackToTop.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import UserInfo from '@/components/question/UserInfo.vue';
import CreateAnswer from '@/components/question/CreateAnswer.vue';
import ListAnswers from '@/components/question/ListAnswers.vue';

export default {
  name: 'QuestionViewQuestion',
  components: {
    Editor,
    BackToTop,
    ProgressBar,
    UserInfo,
    CreateAnswer,
    ListAnswers,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
      currentUserReaction: '',
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetQuestion(),
      this.preGetReaction(),
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
    async preGetReaction() {
      const res = await countReactions({ source_type: 'question', source_id: this.questionId });
      console.log(res);
      this.currentUserReaction = (res.current_user_reaction) ? res.current_user_reaction : '';
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
