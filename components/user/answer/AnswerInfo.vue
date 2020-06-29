<template>
  <div class="answer-container">
    <h1><a :href="`/question/${answerData.question_id}`">{{ answerData.question.title }}</a></h1>
    <div class="d-flex align-items-center pt-2 pb-2">
      <div class="qa-tag-list mr-3">
        <button
          class="btn btn-sm"
          :style="{ 'background-color': transformColor() }"
        >
          {{ answerData.question.tag.name }}
        </button>
      </div>
      <div class="ml-auto pt-1">
        <span>
          <ProfileLink :user-data="answerData.question.user" />
          asked at
        </span>
        <span class="ml-2 post-date">{{ transformDate(answerData.question.created_at) }}</span>
      </div>
    </div>
    <div class="d-flex">
      <div class="ml-auto pt-1">
        <span>
          <ProfileLink :user-data="answerData.user" />
          answered at
        </span>
        <span class="ml-2 post-date">{{ transformDate(answerData.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'UserAnswerAnswerInfo',
  components: {
    ProfileLink,
  },
  props: {
    answerData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString().concat(` ${d.toLocaleTimeString('it-IT')}`);
    },
    transformColor() {
      const hex = this.answerData.question.tag.color.toString(16);
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
.answer-container {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
}
.answer-container h1 {
  font-size: 21.2px;
  font-weight: 600;
  color: #292929;
}
.answer-container h2 {
  font-size: 17px;
  color: #757575;
}
.answerer {
  color : #696969;
}
.answerer a:hover {
  color: #409eff;
}
.answer-date {
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
