<template>
  <div class="modify-container">
    <PostsModify />
  </div>
</template>

<script>
import PostsModify from '@/components/posts/Modify';

export default {
  components: {
    PostsModify,
  },
  asyncData({ params }) {
    return {
      id: params.id,
    };
  },
};
</script>

<style scoped>
.modify-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
