<template>
  <div class="question-container">
    <h1><a :href="`/question/${questionData._id}`">{{ questionData.title }}</a></h1>
    <div class="d-flex">
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span>{{ questionData.view_count }}</span>
      </div>
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'heart']" />
        <span>{{ likes }}</span>
      </div>
      <div class="info-container">
        <font-awesome-icon :icon="['far', 'bookmark']" />
        <span>{{ collections }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';
import { countCollections } from '@/api/collection';

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
      collections: 0,
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
            this.preGetCollections(questionData._id),
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
    },
    async preGetCollections(questionId) {
      const res = await countCollections(questionId);
      this.collections = res.total;
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
