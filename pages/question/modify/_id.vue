<template>
  <div class="modify-container">
    <ModifyQuestion :question-id="$route.params.id" />
  </div>
</template>

<script>
import ModifyQuestion from '@/components/question/ModifyQuestion.vue';

export default {
  components: {
    ModifyQuestion,
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
