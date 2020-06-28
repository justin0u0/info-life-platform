<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ userData.name }} &lt; {{ userData.username }} &gt;</a>
      <span class="date-info">{{ new Date(infoData.created_at).toLocaleString() }}</span>
      <span> </span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon v-if="userReaction !== 'like'" class="mx-2" :icon="['far', 'thumbs-up']" @click="handleReaction('like')" />
      <font-awesome-icon v-if="userReaction === 'like'" class="mx-2" :icon="['fas', 'thumbs-up']" @click="handleReaction('like')" />
      <font-awesome-icon v-if="userReaction !== 'dislike'" class="mx-2" :icon="['far', 'thumbs-down']" @click="handleReaction('dislike')" />
      <font-awesome-icon v-if="userReaction === 'dislike'" class="mx-2" :icon="['fas', 'thumbs-down']" @click="handleReaction('dislike')" />
      <ShareNetwork
        network="facebook"
        :url="$route.path"
        :title="infoData.title"
        :quote="infoData.title"
      >
        <font-awesome-icon class="mx-2" :icon="['fab', 'facebook-square']" />
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
import { addReaction, removeReaction } from '@/api/reaction';
// import { addCollection, removeCollection } from '@/api/collection';

export default {
  name: 'QuestionUserInfo',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    infoData: {
      type: Object,
      required: true,
    },
    currentUserReaction: {
      type: String,
      required: true,
    },
    type: {
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
    async preGetShareCount() {
      const res = await this.$axios.get('https://graph.facebook.com/', {
        params: {
          id: this.$route.path,
          fields: 'og_object{engagement}',
        },
      });
      const { count } = res.og_object.engagement;
      this.share_count = count;
    },
    async handleReaction(reaction) {
      if (this.userReaction === '') {
        await addReaction({ type: reaction, source_type: this.type, source_id: this.infoData._id });
        this.userReaction = reaction;
      } else if (this.userReaction === 'like') {
        await removeReaction({ source_type: this.type, source_id: this.infoData._id });
        if (reaction === 'like') {
          this.userReaction = '';
        } else {
          await addReaction({ type: reaction, source_type: this.type, source_id: this.infoData._id });
          this.userReaction = reaction;
        }
      } else { // this.userReaction = dislike
        await removeReaction({ source_type: this.type, source_id: this.infoData._id });
        if (reaction === 'like') {
          await addReaction({ type: reaction, source_type: this.type, source_id: this.infoData._id });
          this.userReaction = reaction;
        } else {
          this.userReaction = '';
        }
      }
      console.log(this.userReaction);
    },
  },
  head() {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: 'https://rudrastyh.com/wp-content/uploads/2016/08/facebook-apps-list-add-new-app.jpg' },
      ],
    };
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
</style>
