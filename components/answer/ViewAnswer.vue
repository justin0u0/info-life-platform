<template>
  <div class="container answer-container my-3">
    <AnswerUserInfo
      :answer-data="answerData"
      :is-solved="isSolved"
      :question-data="questionData"
      :current-user-reaction="currentUserReaction"
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
import { countReactions } from '@/api/reaction';
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
    questionData: {
      type: Object,
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
      modifyMode: false,
      currentUserReaction: '',
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  async mounted() {
    this.contentObj = JSON.parse(this.answerData.content);
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetReaction(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
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
    async preGetReaction() {
      const res = await countReactions({ source_type: 'answer', source_id: this.answerData._id });
      console.log(res);
      this.currentUserReaction = (res.current_user_reaction) ? res.current_user_reaction : '';
    },
  },
};
</script>

<style scoped>
.answer-container {
  border: 1px solid #e2e2e2;
}
</style>
