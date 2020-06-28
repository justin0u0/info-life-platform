<template>
  <div class="container answer-container my-3">
    <AnswerUserInfo :answer-data="answerData" :question-id="questionId" :is-solved="isSolved" />
    <div class="pb-3">
      <Editor :content-data="contentObj" />
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/ViewEditor.vue';
import AnswerUserInfo from '@/components/answer/UserInfo.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AnswerViewAnswer',
  components: {
    Editor,
    AnswerUserInfo,
  },
  props: {
    answerData: {
      type: Object,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    isSolved: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      contentObj: {},
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  mounted() {
    this.contentObj = JSON.parse(this.answerData.content);
  },
  methods: {
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString().concat(` ${d.toLocaleTimeString('it-IT')}`);
    },
    // questionGetSolved() {
    //   this.$emit('question-solved');
    // },
  },
};
</script>

<style scoped>
.answer-container {
  border: 1px solid #e2e2e2;
}
</style>
