<template>
  <div class="user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <ProfileLink :user-data="answerData.user" />
      <span class="date-info">{{ new Date(answerData.created_at).toLocaleString() }}</span>
      <span> </span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon
        v-show="canEdit"
        class="mx-2 edit-icon"
        :icon="['fas', 'edit']"
        @click="handleEditAnswer"
      />
      <el-button
        v-show="canChooseBestAnswer"
        type="primary"
        icon="el-icon-star-off"
        circle
        class="mx-2"
        @click="handleTogglePostIsPublished"
      />
    </div>
  </div>
</template>

<script>
import { modifyQuestion } from '@/api/question';
import { mapGetters } from 'vuex';
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'AnswerUserInfo',
  components: {
    ProfileLink,
  },
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
    questionUserId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'currentUserId',
      'isLoggedIn',
    ]),
    canChooseBestAnswer() {
      return (!this.isSolved && this.currentUserId === this.questionUserId);
    },
    canEdit() {
      return (this.isLoggedIn && this.currentUserId === this.answerData.user_id);
    },
  },
  methods: {
    async handleTogglePostIsPublished() {
      const message = `確定選定「${this.answerData.user.name}」的回答為最佳解嗎`;
      try {
        await this.$confirm(message, '提醒', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
        });
        await modifyQuestion({ _id: this.questionId, is_solved: true, best_answer_id: this.answerData._id });
        this.$message({
          type: 'success',
          message: '選定成功',
        });
        window.location.reload();
      } catch (error) {
        this.$message({
          type: 'info',
          message: '選定取消',
        });
      }
    },
    handleEditAnswer() {
      this.$emit('edit-answer');
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
.edit-icon {
  cursor: pointer;
}
</style>
