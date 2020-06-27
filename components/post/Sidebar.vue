<template>
  <div style="display: none">
    <div>
      <font-awesome-icon v-if="currentUserLike === false" :icon="['far', 'heart']" @click="handleReaction" />
      <font-awesome-icon v-if="currentUserLike === true" :icon="['fas', 'heart']" @click="handleReaction" />
    </div>
    <div>
      <font-awesome-icon :icon="['far', 'bookmark']" />
    </div>
  </div>
</template>

<script>
import { addReaction, removeReaction } from '@/api/reaction';

export default {
  props: {
    currentUserLike: {
      type: Boolean,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userLike: false,
    };
  },
  watch: {
    currentUserLike: {
      immediate: true,
      handler(currentUserLike) {
        this.userLike = currentUserLike;
      },
    },
  },
  methods: {
    async handleReaction() {
      if (this.userLike === true) {
        try {
          await removeReaction({ source_type: 'post', source_id: this.postId });
          this.userLike = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await addReaction({ type: 'like', source_type: 'post', source_id: this.postId });
          this.userLike = true;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* TODO: CSS sidebar */
</style>
