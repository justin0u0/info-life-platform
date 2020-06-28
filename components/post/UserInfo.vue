<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ userData.name }} &lt; {{ userData.username }} &gt;</a>
      <span class="date-info">{{ new Date(postData.created_at).toLocaleString() }}</span>
      <span> </span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon
        v-if="userLike === true"
        class="mx-2 icon-decoration"
        :icon="['fas', 'heart']"
        @click="handleReaction"
      />
      <font-awesome-icon
        v-else
        class="mx-2 icon-decoration"
        :icon="['far', 'heart']"
        @click="handleReaction"
      />
      <ShareNetwork
        network="facebook"
        :url="$route.path"
        :title="postData.title"
        :quote="postData.title"
      >
        <font-awesome-icon class="mx-2 icon-decoration" :icon="['fab', 'facebook-square']" />
      </ShareNetwork>
      <font-awesome-icon
        v-if="userCollect === true"
        class="mx-2 icon-decoration"
        :icon="['fas', 'bookmark']"
        @click="handleCollection"
      />
      <font-awesome-icon
        v-else
        class="mx-2 icon-decoration"
        :icon="['far', 'bookmark']"
        @click="handleCollection"
      />
    </div>
  </div>
</template>

<script>
import { addReaction, removeReaction } from '@/api/reaction';
import { addCollection, removeCollection } from '@/api/collection';

export default {
  name: 'PosrUserInfo',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    postData: {
      type: Object,
      required: true,
    },
    currentUserLike: {
      type: Boolean,
      required: true,
    },
    currentUserCollect: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      shareCount: 0,
      userLike: false,
      userCollect: false,
    };
  },
  watch: {
    currentUserLike: {
      immediate: true,
      handler(currentUserLike) {
        this.userLike = currentUserLike;
      },
    },
    currentUserCollect: {
      immediate: true,
      handler(currentUserCollect) {
        this.userCollect = currentUserCollect;
      },
    },
  },
  methods: {
    async handleReaction() {
      if (this.userLike === true) {
        try {
          await removeReaction({ source_type: 'post', source_id: this.postData._id });
          this.userLike = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await addReaction({ type: 'like', source_type: 'post', source_id: this.postData._id });
          this.userLike = true;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async handleCollection() {
      if (this.userCollect === true) {
        try {
          await removeCollection(this.postData._id);
          this.userCollect = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await addCollection(this.postData._id);
          this.userCollect = true;
        } catch (error) {
          console.log(error);
        }
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
.icon-decoration:hover {
  cursor: pointer;
  opacity: 0.6;
}
</style>
