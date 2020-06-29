<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <ProfileLink :user-data="userData" :font-weight="600" />
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
    <LoginRegisterDialog ref="dialog" />
  </div>
</template>

<script>
import { addReaction, removeReaction } from '@/api/reaction';
import { addCollection, removeCollection } from '@/api/collection';
import ProfileLink from '@/components/user/ProfileLink.vue';
import { mapGetters } from 'vuex';
import LoginRegisterDialog from '@/components/LoginRegisterDialog.vue';


export default {
  name: 'PosrUserInfo',
  components: {
    ProfileLink,
    LoginRegisterDialog,
  },
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
  computed: {
    ...mapGetters([
      'currentUserId',
      'isLoggedIn',
    ]),
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
      if (this.isLoggedIn) {
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
      } else {
        this.$message({
          type: 'error',
          message: '尚未登入',
          duration: 1500,
        });
        console.log('[AnswerUserInfo:handleDialogOpen]');
        this.$refs.dialog.handleDialogOpen();
      }
    },
    async handleCollection() {
      if (this.isLoggedIn) {
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
      } else {
        this.$message({
          type: 'error',
          message: '尚未登入',
          duration: 1500,
        });
        console.log('[AnswerUserInfo:handleDialogOpen]');
        this.$refs.dialog.handleDialogOpen();
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
</style>
