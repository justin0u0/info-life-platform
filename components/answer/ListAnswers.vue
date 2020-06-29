<template>
  <div class="pt-4">
    <hr>
    <h5 class="font-weight-bold pt-1">{{ totalAnswers }} 個回答</h5>
    <div
      v-for="(answer, index) in answers"
      :key="answer._id"
      class="mt-4"
    >
      <ViewAnswer
        :answer-data="answer"
        :is-solved="isSolved"
        :question-data="questionData"
        @delete-answer="handleDeleteAnswer(index)"
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
    questionData: {
      type: Object,
      required: true,
    },
    isSolved: {
      type: Boolean,
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
  watch: {
    questionData: {
      immediate: true,
      handler(questionData) {
        if (questionData._id !== null) {
          this.preGetAnswers();
        }
      },
    },
  },
  methods: {
    async preGetAnswers() {
      // Get Questions
      await this.getAnswersProcess();
    },
    async getAnswersProcess() {
      const { total, data } = await getAnswers({
        filter: { question_id: this.questionData._id },
        limit: this.limit,
        skip: this.countAnswers,
      });
      this.totalAnswers = total;
      this.countAnswers += data.length;
      this.answers.push(...data);
    },
    handleDeleteAnswer(index) {
      this.answers.splice(index, 1);
    },
  },
};
</script>

<style scoped>
</style>
