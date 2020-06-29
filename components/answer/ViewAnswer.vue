<template>
  <div class="container answer-container my-3">
    <AnswerUserInfo
      :answer-data="answerData"
      :question-id="questionId"
      :is-solved="isSolved"
      :question-user-id="questionUserId"
      @edit-answer="handleEditAnswer"
    />
    <div v-if="!modifyMode" class="pb-3">
      <Editor :content-data="contentObj" />
    </div>
    <div v-else class="py-3">
      <ModifyAnswer :answer-id="answerData._id" @show-answer="handleShowAnswer" />
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/ViewEditor.vue';
import AnswerUserInfo from '@/components/answer/UserInfo.vue';
import ModifyAnswer from '@/components/answer/ModifyAnswer.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AnswerViewAnswer',
  components: {
    Editor,
    AnswerUserInfo,
    ModifyAnswer,
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
    questionUserId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      contentObj: {},
      modifyMode: false,
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
    handleEditAnswer() {
      this.modifyMode = true;
    },
    handleShowAnswer() {
      this.modifyMode = false;
    },
  },
};
</script>

<style scoped>
.answer-container {
  border: 1px solid #e2e2e2;
}
</style>
