<template>
  <div class="question-page">
    <Jumbotron />
    <div class="container mx-5">
      <ListTags :current-tag="currentTag" @tag-click="handleTagClick" />
      <!-- <div v-infinite-scroll="loadQuestions" class="row infinite-list"> -->
      <div
        v-for="question in questions"
        :key="question._id"
      >
        <PreviewQuestion :question-data="question" />
      </div>
      <!-- </div> -->
      <div v-show="loading" v-loading="loading" class="loading-block" />
    </div>
  </div>
</template>

<script>
import { getQuestions } from '@/api/question';
import Jumbotron from '@/components/questions/Jumbotron.vue';
import ListTags from '@/components/questions/ListTags.vue';
import PreviewQuestion from '@/components/questions/PreviewQuestion.vue';

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
      currentTag: { name: '最新', filter: {}, sort: { updated_at: -1 } },
      limit: 20,
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
  width: 100%;
  height: 30px;
}
.question-page {
  font-family: '微軟正黑體', sans-serif;
}
</style>
