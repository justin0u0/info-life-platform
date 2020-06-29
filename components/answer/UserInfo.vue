<template>
  <div class="user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ answerData.user.name }} &lt; {{ answerData.user.username }} &gt;</a>
      <span class="date-info">{{ new Date(answerData.created_at).toLocaleString() }}</span>
      <span> </span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon class="mx-2" :icon="['fas', 'edit']" />
      <el-button v-show="ableToChooseBestAnswer()" type="primary" icon="el-icon-star-off" circle class="mx-2" @click="handleTogglePostIsPublished()"></el-button>
    </div>
  </div>
</template>

<script>
import { modifyQuestion } from '@/api/question';

export default {
  name: 'AnswerUserInfo',
  props: {
    answerData: {
      type: Object,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    isSolved: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // is_solved: false,
    };
  },
  methods: {
    async handleTogglePostIsPublished() {
      const message = `確定選定${this.answerData.user.name}的回答為最佳解嗎`;
      const successMessage = '發佈成功';
      const cancelMessage = '發佈取消';
      try {
        await this.$confirm(message, '提醒', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
        });
        await modifyQuestion({ _id: this.questionId, is_solved: true, best_answer_id: this.answerData._id });
        // this.$emit('question-solved');
        this.$message({
          type: 'success',
          message: successMessage,
        });
        window.location.reload();
      } catch (error) {
        this.$message({
          type: 'info',
          message: cancelMessage,
        });
      }
    },
    ableToChooseBestAnswer() {
      return !this.isSolved;
    },
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  margin-top: 15px;
  margin-bottom: 10px;
}
.user-info {
  font-size: 16px;
  font-weight: 600;
  color: #3f3f3f;
}
.date-info {
  font-size: 15px;
  font-weight: 500;
  color: #4f4f4f;
}
.user-image {
  height: 50px;
  width: 50px;
}
.icon-container {
  font-size: 20px;
}
</style>
