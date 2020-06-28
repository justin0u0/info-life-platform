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
import AnswerUserInfo from '@/components/answer/AnswerUserInfo.vue';

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
  },
};
</script>

<style scoped>
.answer-container {
  border: 1px solid #e2e2e2;
}
</style>
