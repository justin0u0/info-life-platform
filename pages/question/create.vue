<template>
  <div>
    <CreateQuestion />
  </div>
</template>

<script>
import auth from '@/lib/auth';
import CreateQuestion from '@/components/question/CreateQuestion.vue';

export default {
  components: {
    CreateQuestion,
  },
  mounted() {
    auth.bind(this)('/question');
  },
};
</script>

<style>

</style>
