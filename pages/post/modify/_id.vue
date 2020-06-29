<template>
  <div class="modify-container">
    <ModifyPost :post-id="$route.params.id" />
  </div>
</template>

<script>
import auth from '@/lib/auth';
import ModifyPost from '@/components/post/ModifyPost.vue';

export default {
  components: {
    ModifyPost,
  },
  mounted() {
    auth.bind(this)('/post');
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
