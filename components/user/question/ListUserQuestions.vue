<template>
  <div class="container list-questions-container mt-4">
    <div
      v-for="question in questions"
      :key="question._id"
      class="row"
    >
      <div v-if="question !== questions[0]" class="divider" />
      <div class="col-lg-10">
        <QuestionInfo :question-data="question" />
      </div>
      <div class="col-lg-2 col-12">
        <QuestionButton
          :question-id="question._id"
          @delete-question="handleDeleteQuestion(question._id, question.title, index)"
        />
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
import { getQuestionsByCurrentUser, removeQuestion } from '@/api/question';
import QuestionInfo from '@/components/user/question/QuestionInfo.vue';
import QuestionButton from '@/components/user/question/QuestionButton.vue';

export default {
  name: 'UserQuestionListUserQuestions',
  components: {
    QuestionInfo,
    QuestionButton,
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
    async handleDeleteQuestion(questionId, title, index) {
      try {
        await this.$confirm(`確定要刪除「${title}」?`, '提醒', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await removeQuestion(questionId);
        this.questions.splice(index, 1);
        this.$message({
          type: 'success',
          message: '刪除成功',
        });
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消刪除',
        });
      }
    },
  },
};
</script>

<style scoped>
.list-questions-container {
  max-width: 960px;
}
.question-container {
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
