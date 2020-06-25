<template>
  <ViewPost :post-id="$route.params.id" />
</template>

<script>
import ViewPost from '@/components/post/ViewPost.vue';

export default {
  components: {
    ViewPost,
  },
};
</script>

<style scoped>
</style>
