<template>
  <div>
    <CreatePost />
  </div>
</template>

<script>
import auth from '@/lib/auth';
import CreatePost from '@/components/post/CreatePost.vue';

export default {
  components: {
    CreatePost,
  },
  mounted() {
    auth.bind(this)('/post');
  },
};
</script>

<style>

</style>
