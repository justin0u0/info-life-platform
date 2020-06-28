<template>
  <div class="answer-page pt-4">
    <hr>
    <h5 class="font-weight-bold pt-1">{{ totalAnswers }} 個回答</h5>
    <div
      v-for="answer in answers"
      :key="answer._id"
      class="answer-card mt-4"
    >
      <Answer :answer-data="answer" />
    </div>
  </div>
</template>

<script>
import { getAnswers } from '@/api/answer';
import Answer from '@/components/question/Answer.vue';

export default {
  name: 'QuestionListAnswer',
  components: {
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
.answer-page {
  font-family: '微軟正黑體', sans-serif;
}
.container {
  max-width: 700px;
}
</style>
