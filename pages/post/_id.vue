<template>
  <Viewpost :post-id="$route.params.id" />
</template>

<script>
import Viewpost from '@/components/post/ViewPost.vue';

export default {
  components: {
    Viewpost,
  },
};
</script>

<style scoped>
</style>
