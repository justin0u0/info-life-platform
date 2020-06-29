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
        v-if="userReaction === 'like'"
        class="mx-2 edit-icon"
        :icon="['fas', 'thumbs-up']"
        @click="handleReaction('like')"
      />
      <font-awesome-icon
        v-else
        class="ml-2 edit-icon"
        :icon="['far', 'thumbs-up']"
        @click="handleReaction('like')"
      />
      <span class="pr-2">{{ likes }}</span>
      <font-awesome-icon
        v-if="userReaction === 'dislike'"
        class="mx-2 edit-icon"
        :icon="['fas', 'thumbs-down']"
        @click="handleReaction('dislike')"
      />
      <font-awesome-icon
        v-else
        class="ml-2 edit-icon"
        :icon="['far', 'thumbs-down']"
        @click="handleReaction('dislike')"
      />
      <span class="pr-2">{{ dislikes }}</span>
      <font-awesome-icon
        v-show="canEdit"
        class="mx-2 edit-icon"
        :icon="['fas', 'edit']"
        @click="handleEditAnswer"
      />
      <font-awesome-icon
        v-show="canEdit"
        class="mx-2 edit-icon"
        :icon="['fas', 'trash']"
        @click="handleDeleteAnswer"
      />
      <el-button
        v-show="canChooseBestAnswer"
        type="primary"
        icon="el-icon-star-off"
        circle
        class="mx-2"
        @click="handleTogglePostIsPublished"
      />
      <font-awesome-icon
        v-show="isBestAnswer"
        class="check-icon mx-2"
        :icon="['far', 'check-circle']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
<<<<<<< HEAD
import { modifyQuestion } from '@/api/question';
import { removeAnswer } from '@/api/answer';
import { addReaction, removeReaction, countReactions } from '@/api/reaction';
=======
>>>>>>> dev
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
    questionData: {
      type: Object,
      required: true,
    },
    isSolved: {
      type: Boolean,
      required: true,
    },
    currentUserReaction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userReaction: '',
      likes: 0,
      dislikes: 0,
    };
  },
  computed: {
    ...mapGetters([
      'currentUserId',
      'isLoggedIn',
    ]),
    canChooseBestAnswer() {
      return (!this.isSolved && this.currentUserId === this.questionData.user_id);
    },
    canEdit() {
      return (this.isLoggedIn && this.currentUserId === this.answerData.user_id);
    },
    isBestAnswer() {
      return this.questionData.best_answer_id === this.answerData._id;
    },
  },
  watch: {
    currentUserReaction: {
      immediate: true,
      handler(currentUserReaction) {
        this.userReaction = currentUserReaction;
      },
    },
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetReactions(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetReactions() {
      const res = await countReactions({ source_type: 'answer', source_id: this.answerData._id });
      this.likes = res.like;
      this.dislikes = res.dislike;
    },
    async handleTogglePostIsPublished() {
      const message = `確定選定「${this.answerData.user.name}」的回答為最佳解嗎`;
      try {
        await this.$confirm(message, '提醒', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
        });
        await modifyQuestion({ _id: this.questionData._id, is_solved: true, best_answer_id: this.answerData._id });
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
    async handleDeleteAnswer() {
      const message = '確定刪除自己的回答嗎';
      try {
        await this.$confirm(message, '提醒', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
        });
        await removeAnswer(this.answerData._id);
        this.$message({
          type: 'success',
          message: '刪除成功',
        });
        window.location.reload();
      } catch (error) {
        this.$message({
          type: 'info',
          message: '刪除取消',
        });
      }
    },
    async handleReaction(reaction) {
      if (reaction === 'like') {
        if (this.userReaction === 'like') this.likes -= 1;
        else this.likes += 1;
      } else if (this.userReaction === 'dislike') {
        this.dislikes -= 1;
      } else {
        this.dislikes += 1;
      }
      await removeReaction({
        source_type: 'answer',
        source_id: this.answerData._id,
      });
      const initialReaction = this.userReaction;
      this.userReaction = '';
      if (initialReaction !== reaction) {
        await addReaction({
          source_type: 'answer',
          source_id: this.answerData._id,
          type: reaction,
        });
        this.userReaction = reaction;
      }
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
.edit-icon:hover {
  opacity: 0.6;
  cursor: pointer;
}
.check-icon {
  color: #67C23A;
  font-size: 2rem;
}
</style>
