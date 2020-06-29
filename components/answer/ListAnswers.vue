<template>
  <div class="pt-4">
    <hr>
    <h5 class="font-weight-bold pt-1">{{ totalAnswers }} 個回答</h5>
    <div
      v-for="answer in answers"
      :key="answer._id"
      class="mt-4"
    >
      <ViewAnswer
        :answer-data="answer"
        :question-id="questionId"
        :is-solved="isSolved"
        :question-user-id="questionUserId"
      />
    </div>
  </div>
</template>

<script>
import { getAnswers } from '@/api/answer';
import ViewAnswer from '@/components/answer/ViewAnswer.vue';

export default {
  name: 'AnswerListAnswers',
  components: {
    ViewAnswer,
  },
  props: {
    questionId: {
      type: String,
      required: true,
    },
    isSolved: {
      type: Boolean,
      required: true,
    },
    questionUserId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      answers: [],
      totalAnswers: 0,
      countAnswers: 0,
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
      const { total, data } = await getAnswers({
        filter: { question_id: this.questionId },
        limit: this.limit,
        skip: this.countAnswers,
      });
      this.totalAnswers = total;
      this.countAnswers += data.length;
      this.answers.push(...data);
    },
  },
};
</script>

<style scoped>
</style>
