<template>
  <div class="question-container">
    <h1><a :href="`/question/${questionData._id}`">{{ questionData.title }}</a></h1>
    <div class="d-flex">
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span>{{ questionData.view_count }}</span>
      </div>
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'thumbs-up']" />
        <span>{{ likes }}</span>
      </div>
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'thumbs-down']" />
        <span>{{ dislikes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';

export default {
  name: 'UserQuestionInfo',
  props: {
    questionData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
    };
  },
  watch: {
    questionData: {
      immediate: true,
      async handler(questionData) {
        if (questionData && questionData._id) {
          this.$store.dispatch('setIsProcessing', true);
          await Promise.all([
            this.preGetReactions(questionData._id),
          ]);
          this.$store.dispatch('setIsProcessing', false);
        }
      },
    },
  },
  methods: {
    async preGetReactions(questionId) {
      const res = await countReactions({ source_type: 'question', source_id: questionId });
      this.likes = res.like;
      this.dislikes = res.dislike;
    },
  },
};
</script>

<style scoped>
a {
  color: #292929;
}
.question-container {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
}
.question-container h1 {
  font-size: 21.2px;
  font-weight: 600;
  color: #292929;
}
.question-container h2 {
  font-size: 17px;
  color: #757575;
}
.info-container {
  text-align: center;
  font-size: 14px;
  color: #696969;
  margin-right: 1rem;
  margin-top: 10px;
}
.icon-size {
  height: 16px;
  width: 16px
}
</style>
