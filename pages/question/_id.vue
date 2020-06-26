<template>
  <ViewQuestion :question-id="$route.params.id" />
</template>

<script>
import ViewQuestion from '@/components/question/ViewQuestion.vue';

export default {
  components: {
    ViewQuestion,
  },
};
</script>

<style scoped>
</style>
