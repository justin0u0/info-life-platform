<template>
  <div class="modify-container">
    <ModifyQuestion :question-id="$route.params.id" />
  </div>
</template>

<script>
import auth from '@/lib/auth';
import ModifyQuestion from '@/components/question/ModifyQuestion.vue';

export default {
  components: {
    ModifyQuestion,
  },
  mounted() {
    auth.bind(this)('/question');
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
