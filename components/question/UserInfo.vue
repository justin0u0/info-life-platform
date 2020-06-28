<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ userData.name }} &lt; {{ userData.username }} &gt;</a>
      <span class="date-info">{{ new Date(questionData.created_at).toLocaleString() }}</span>
      <span> </span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon
        v-if="userReaction === 'like'"
        class="mx-2 pointer"
        :icon="['fas', 'thumbs-up']"
        @click="handleReaction('like')"
      />
      <font-awesome-icon
        v-else
        class="mx-2 pointer"
        :icon="['far', 'thumbs-up']"
        @click="handleReaction('like')"
      />
      <font-awesome-icon
        v-if="userReaction === 'dislike'"
        class="mx-2 pointer"
        :icon="['fas', 'thumbs-down']"
        @click="handleReaction('dislike')"
      />
      <font-awesome-icon
        v-else
        class="mx-2 pointer"
        :icon="['far', 'thumbs-down']"
        @click="handleReaction('dislike')"
      />
      <ShareNetwork
        network="facebook"
        :url="$route.path"
        :title="questionData.title"
        :quote="questionData.title"
      >
        <font-awesome-icon class="mx-2 pointer" :icon="['fab', 'facebook-square']" />
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
import { addReaction, removeReaction } from '@/api/reaction';

export default {
  name: 'QuestionUserInfo',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    questionData: {
      type: Object,
      required: true,
    },
    currentUserReaction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      shareCount: 0,
      userReaction: '',
    };
  },
  watch: {
    currentUserReaction: {
      immediate: true,
      handler(currentUserReaction) {
        this.userReaction = currentUserReaction;
      },
    },
  },
  methods: {
    async handleReaction(reaction) {
      await removeReaction({
        source_type: 'question',
        source_id: this.questionData._id,
      });
      this.userReaction = '';
      if (this.userReaction !== reaction) {
        await addReaction({
          source_type: 'question',
          source_id: this.questionData._id,
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
  margin-top: 30px;
  margin-bottom: 45px;
}
.user-info {
  font-family: "宋體", sans-serif;
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
.pointer {
  cursor: pointer;
}
</style>
