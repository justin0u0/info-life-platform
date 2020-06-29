<template>
  <div class="container answer-container my-3">
    <AnswerUserInfo
      :answer-data="answerData"
      :question-id="questionId"
      :is-solved="isSolved"
      :question-user-id="questionUserId"
      @edit-answer="setIsModifying"
    />
    <div v-show="!isModifying" class="pb-3">
      <Editor ref="editor" :content-data="contentObj" />
    </div>
    <div v-show="isModifying" class="py-3">
      <ModifyAnswer
        :answer-id="answerData._id"
        @modify-answer="handleModifyAnswer"
        @cancel="setNotModifying"
      />
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
      isModifying: false,
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
    handleModifyAnswer({ content }) {
      const contentObj = JSON.parse(content);
      this.$refs.editor.setContent(contentObj);
      this.isModifying = false;
    },
    setIsModifying() {
      this.isModifying = true;
    },
    setNotModifying() {
      this.isModifying = false;
    },
  },
};
</script>

<style scoped>
.answer-container {
  border: 1px solid #e2e2e2;
}
</style>
