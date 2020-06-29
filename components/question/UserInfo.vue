<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <ProfileLink :user-data="userData" :font-weight="600" />
      <span class="date-info">{{ new Date(questionData.created_at).toLocaleString() }}</span>
      <span>&nbsp;</span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon
        v-if="userReaction === 'like'"
        class="mx-2 icon-decoration"
        :icon="['fas', 'thumbs-up']"
        @click="handleReaction('like')"
      />
      <font-awesome-icon
        v-else
        class="mx-2 icon-decoration"
        :icon="['far', 'thumbs-up']"
        @click="handleReaction('like')"
      />
      <font-awesome-icon
        v-if="userReaction === 'dislike'"
        class="mx-2 icon-decoration"
        :icon="['fas', 'thumbs-down']"
        @click="handleReaction('dislike')"
      />
      <font-awesome-icon
        v-else
        class="mx-2 icon-decoration"
        :icon="['far', 'thumbs-down']"
        @click="handleReaction('dislike')"
      />
      <ShareNetwork
        network="facebook"
        :url="$route.path"
        :title="questionData.title"
        :quote="questionData.title"
      >
        <font-awesome-icon class="mx-2 icon-decoration" :icon="['fab', 'facebook-square']" />
      </ShareNetwork>
      <a v-if="isAuthor" :href="`/question/modify/${questionData._id}`" class="edit">
        <font-awesome-icon class="mx-2" :icon="['fas', 'edit']" />
      </a>
    </div>
  </div>
</template>

<script>
import { addReaction, removeReaction } from '@/api/reaction';
import { mapGetters } from 'vuex';
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'QuestionUserInfo',
  components: {
    ProfileLink,
  },
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
  computed: {
    ...mapGetters([
      'currentUser',
      'isLoggedIn',
    ]),
    isAuthor() {
      return (this.isLoggedIn
        && this.currentUser.name === this.userData.name
        && this.currentUser.username === this.userData.username);
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
  methods: {
    async handleReaction(reaction) {
      await removeReaction({
        source_type: 'question',
        source_id: this.questionData._id,
      });
      const initialReaction = this.userReaction;
      this.userReaction = '';
      if (initialReaction !== reaction) {
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
.icon-decoration:hover {
  cursor: pointer;
  opacity: 0.6;
}
.edit {
  color: black;
}
</style>
