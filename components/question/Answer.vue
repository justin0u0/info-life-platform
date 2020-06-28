<template>
  <div class="container answer-container my-3">
    <AnswerUserInfo :answer-data="answerData" />
    <div class="pb-3">
      <Editor :content-data="contentObj" />
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/ViewEditor.vue';
import AnswerUserInfo from '@/components/question/AnswerUserInfo.vue';

export default {
  name: 'QuestionAnswer',
  components: {
    Editor,
    AnswerUserInfo,
  },
  props: {
    answerData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      contentObj: {},
    };
  },
  mounted() {
    this.contentObj = JSON.parse(this.answerData.content);
  },
  methods: {
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString().concat(` ${d.toLocaleTimeString('it-IT')}`);
    },
    // transformColor() {
    //   const hex = this.answerData.tag.color.toString(16);
    //   const hexColor = '#'.concat(hex);
    //   return hexColor;
    // },
  },
};
</script>

<style scoped>
/* .answer-link {
  text-decoration-color: black;
}
.answer-link h5 {
  font-weight: bold;
  color: #232323;
}
.answer-date {
  color: #888;
  font-size: 0.9rem;
}
.answerer {
  color: #888;
  font-size: 0.9rem;
  padding-left: 2.5px;
}
.answerer a {
  color: rgba(64, 158, 255, 0.8);
}
.answerer a:hover {
  color: rgb(64, 158, 255);
}
.answer-info {
  color: #888;
  font-size: 0.9rem;
}
.qa-tag-list button {
  color: rgb(60, 77, 133);
  padding: .1rem .3rem;
  margin-right: .5rem;
} */
.answer-container {
  border: 1px solid #e2e2e2;
}
</style>
