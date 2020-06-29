<template>
  <div class="container list-questions-container mt-4">
    <div
      v-for="question in questions"
      :key="question._id"
      class="row"
    >
      <div class="col-12">
        <div v-if="question !== questions[0]" class="divider" />
        <QuestionInfo :question-data="question" />
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <el-pagination
        layout="prev, pager, next"
        :total="totalQuestions"
        :page-size="limit"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getQuestionsByCurrentUser } from '@/api/question';
import QuestionInfo from '@/components/user/question/QuestionInfo.vue';

export default {
  name: 'UserQuestionListUserQuestions',
  components: {
    QuestionInfo,
  },
  props: {
    isSolved: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      questions: [],
      totalQuestions: 0,
      limit: 6,
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
      const { total, data } = await getQuestionsByCurrentUser({
        filter: { is_solved: this.isSolved },
        limit: this.limit,
      });
      this.totalQuestions = total;
      this.questions = data;
    },
    async handleCurrentChange(page) {
      console.log('[UserListUserQuestions:handleCurrentChange]: ', page);
      this.$store.dispatch('setIsProcessing', true);
      const { data } = await getQuestionsByCurrentUser({
        filter: { is_solved: this.isSolved },
        limit: this.limit,
        skip: (page - 1) * this.limit,
      });
      this.questions = data;
      this.$store.dispatch('setIsProcessing', false);
    },
  },
};
</script>

<style scoped>
.list-questions-container {
  max-width: 960px;
}
.question-container {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
  min-width: 150px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
