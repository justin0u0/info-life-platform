<template>
  <Viewpost :post-id="$route.params.id" />
</template>

<script>
import Viewpost from '@/components/posts/Viewpost';

export default {
  components: {
    Viewpost,
  },
};
</script>

<style scoped>
</style>
