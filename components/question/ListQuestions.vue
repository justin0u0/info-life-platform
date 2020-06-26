<template>
  <div class="question-page">
    <Jumbotron />
    <div class="container">
      <ListTags :current-tag="currentTag" @tag-click="handleTagClick" />
      <transition-group
        v-infinite-scroll="loadQuestions"
        name="question"
        tag="div"
        class="infinte-list"
      >
        <div
          v-for="question in questions"
          :key="question._id"
          class="question-card"
        >
          <PreviewQuestion :question-data="question" />
        </div>
      </transition-group>
      <div v-show="loading" v-loading="loading" class="loading-block" />
    </div>
  </div>
</template>

<script>
import { getQuestions } from '@/api/question';
import Jumbotron from '@/components/question/Jumbotron.vue';
import ListTags from '@/components/question/ListTags.vue';
import PreviewQuestion from '@/components/question/PreviewQuestion.vue';

export default {
  components: {
    Jumbotron,
    ListTags,
    PreviewQuestion,
  },
  data() {
    return {
      questions: [],
      totalQuestions: 0,
      countQuestions: 0,
      currentTag: { name: '最新', filter: {}, sort: { created_at: -1 } },
      limit: 10,
      loading: false,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetQuestions(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetQuestions() {
      // Get Questions
      await this.getQuestionsProcess();
    },
    async handleTagClick(tag) {
      console.log('click ', tag);
      if (this.currentTag === tag) return;
      this.currentTag = tag;
      this.questions = [];
      this.countQuestions = 0;
      // Get Questions
      await this.getQuestionsProcess();
    },
    async loadQuestions() {
      if (this.loading === true || this.totalQuestions === this.countQuestions) return;
      await this.getQuestionsProcess();
    },
    async getQuestionsProcess() {
      if (this.loading === true) return;
      this.loading = true;
      const { total, data } = await getQuestions({ filter: this.currentTag.filter, limit: this.limit, skip: this.countQuestions });
      this.totalQuestions = total;
      this.countQuestions += data.length;
      this.questions.push(...data);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-block {
  margin-top: 10px;
  width: 100%;
  height: 30px;
}
.question-page {
  font-family: '微軟正黑體', sans-serif;
}
.container {
  max-width: 700px;
}
.question-card {
  border-top: 1px solid #e2e2e2;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
}
.question-card:last-child {
  border-bottom: 1px solid #e2e2e2;
}
.question-enter-active, .question-leave-active {
  transition: all 1s;
}
.question-enter, .question-leave-to {
  opacity: 0;
}
</style>
