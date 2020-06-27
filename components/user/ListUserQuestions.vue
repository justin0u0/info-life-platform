<template>
  <div class="container list-questions-container mt-4">
    <div
      v-for="question in questions"
      :key="question._id"
      class="row"
    >
      <div v-if="question !== questions[0]" class="divider" />
      <div class="question-container">
        <h1>{{ question.title }}</h1>
        <div class="d-flex">
          <div class="info-container">
            <font-awesome-icon :icon="['far', 'eye']" />
            <span>1234</span>
          </div>
          <div class="info-container">
            <font-awesome-icon :icon="['far', 'heart']" />
            <span>1234</span>
          </div>
          <div class="info-container">
            <font-awesome-icon :icon="['far', 'bookmark']" />
            <span>1234</span>
          </div>
        </div>
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

export default {
  name: 'UserListUserQuestions',
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
  min-width: 150px;
}
.question-container h1 {
  font-size: 21.2px;
  font-weight: 600;
  color: #292929;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
.info-container {
  text-align: center;
  font-size: 14px;
  color: #696969;
  margin-right: 1rem;
  margin-top: 10px;
}
</style>
