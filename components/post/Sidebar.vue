<template>
  <div>
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
  methods: {
    async handleReaction() {
      if (this.currentUserLike === true) {
        await removeReaction({ source_type: 'post', source_id: this.postId });
        this.currentUserLike = false;
      } else {
        await addReaction({ type: 'like', source_type: 'post', source_id: this.postId });
        this.currentUserLike = true;
      }
    },
  },
};
</script>

<style scoped>

</style>
