<template>
  <div class="question-container">
    <h1><a :href="`/question/${questionData._id}`">{{ questionData.title }}</a></h1>
    <div class="d-flex align-items-center pt-2 pb-2">
      <div class="qa-tag-list mr-3">
        <button
          class="btn btn-sm"
          :style="{ 'background-color': transformColor() }"
        >
          {{ questionData.tag.name }}
        </button>
      </div>
    </div>
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
      <div class="ml-auto pt-1">
        <span class="questioner">
          <a href="#">{{ questionData.user.name }}</a> asked at
        </span>
        <span class="ml-2 question-date">{{ transformDate(questionData.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';

export default {
  name: 'UserQuestionQuestionInfo',
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
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString().concat(` ${d.toLocaleTimeString('it-IT')}`);
    },
    transformColor() {
      const hex = this.questionData.tag.color.toString(16);
      const hexColor = '#'.concat(hex);
      return hexColor;
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
.questioner {
  color : #696969;
}
.questioner a:hover {
  color: #409eff;
}
.question-date {
  color: #696969;
}
.info-container {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-right: 1rem;
  margin-top: 10px;
}
.icon-size {
  height: 16px;
  width: 16px
}
.qa-tag-list button {
  color: #3c4d85;
  padding: .1rem .3rem;
  margin-right: .5rem;
}
</style>
