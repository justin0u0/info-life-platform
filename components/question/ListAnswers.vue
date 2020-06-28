<template>
  <div class="answer-page">
    <!-- <Jumbotron /> -->
    <div class="container">
      <!-- <transition-group
        v-infinite-scroll="loadAnswers"
        name="answer"
        tag="div"
        class="infinte-list"
      > -->
      <div
        v-for="answer in answers"
        :key="answer._id"
        class="answer-card"
      >
        {{ totalAnswers }}
        <Answer :answer-data="answer" />
      </div>
      <!-- </transition-group> -->
      <div v-show="loading" v-loading="loading" class="loading-block" />
    </div>
  </div>
</template>

<script>
import { getAnswers } from '@/api/answer';
import Jumbotron from '@/components/question/Jumbotron.vue';
import Answer from '@/components/question/Answer.vue';

export default {
  name: 'QuestionListAnswer',
  components: {
    Jumbotron,
    Answer,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      answers: [],
      totalAnswers: 0,
      countAnswers: 0,
      currentTag: { name: '最新', filter: {}, sort: { created_at: -1 } },
      limit: 10,
      loading: false,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetAnswers(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetAnswers() {
      // Get Questions
      await this.getAnswersProcess();
    },
    async handleTagClick(tag) {
      console.log('click ', tag);
      if (this.currentTag === tag) return;
      this.currentTag = tag;
      this.answers = [];
      this.countAnswers = 0;
      // Get Questions
      await this.getAnswersProcess();
    },
    async loadAnswers() {
      if (this.loading === true || this.totalAnswers === this.countAnswers) return;
      await this.getAnswersProcess();
    },
    async getAnswersProcess() {
      if (this.loading === true) return;
      this.loading = true;
      const { total, data } = await getAnswers({ filter: { question_id: this.questionId }, limit: this.limit, skip: this.countAnswers });
      this.totalAnswers = total;
      this.countAnswers += data.length;
      this.answers.push(...data);
      console.log(this.questionId);
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
.answer-page {
  font-family: '微軟正黑體', sans-serif;
}
.container {
  max-width: 700px;
}
.answer-card {
  border-top: 1px solid #e2e2e2;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
}
.answer-card:last-child {
  border-bottom: 1px solid #e2e2e2;
}
/* .question-enter-active, .question-leave-active {
  transition: all 1s;
}
.question-enter, .question-leave-to {
  opacity: 0;
} */
</style>
