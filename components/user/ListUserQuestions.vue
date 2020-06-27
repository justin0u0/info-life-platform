<template>
  <div class="container ml-3 mt-4">
    <div
      v-for="question in questions"
      :key="question._id"
      class="row"
    >
      <div class="d-flex flex-wrap">
        <div>
          <font-awesome-icon class="text-center mt-2 mx-4" style="font-size:20px" :icon="['far', 'eye']" />
          <p class="text-center">1,211,720</p>
        </div>
        <div>
          <font-awesome-icon class="text-center mt-2 mx-4" style="font-size:20px" :icon="['far', 'heart']" />
          <p class="text-center">1,234</p>
        </div>
        <div>
          <font-awesome-icon class="text-center mt-2 mx-4" style="font-size:20px" :icon="['far', 'bookmark']" />
          <p class="text-center">5,678</p>
        </div>
      </div>
      <div class="question-container ml-3">
        <h1>{{ question.title }}</h1>
        <hr class="featurette-divider">
      </div>
    </div>
    <div class="row justify-content-center">
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
.question-container {
  font-family: '微軟正黑體', sans-serif;
  margin-bottom: 30px;
  min-width: 150px;
}
.question-container h1 {
  font-size: 25.2px;
  color: #292929;
}
.question-container h2 {
  font-family: '微軟正黑體', sans-serif;
  font-size: 18px;
  color: #757575;
}
.featurette-divider {
  margin-top: 2rem;
  margin-bottom: 5px;
}
</style>
