<template>
  <div class="jumbotron qa-background">
    <div class="container d-flex align-items-center">
      <div class="qa-total">
        <p>共<span class="qa-total-number">{{ totalQuestions }}</span>則提問</p>
        <p>共<span class="qa-total-number">{{ totalAnswers }}</span>個回答</p>
      </div>
      <div class="card ml-auto qa-card">
        <div class="card-body">
          <span>
            世上總會有一個人<br>
            知曉你問題的答案
          </span>
        </div>
        <div class="card-footer d-flex">
          <div class="w-50 text-center ask-question">
            <a href="/question/create">
              <font-awesome-icon :icon="['fas', 'question']" />
              <br>
              提問
            </a>
          </div>
          <div class="w-50 text-center ml-auto answer-question" @click="handleTagClick">
            <font-awesome-icon :icon="['far', 'comment-alt']" />
            <br>
            回答
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestions } from '@/api/question';
import { getAnswers } from '@/api/answer';

export default {
  data() {
    return {
      totalQuestions: 0,
      totalAnswers: 0,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetQuestionsTotal(),
      this.preGetAnswersTotal(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetQuestionsTotal() {
      const { total } = await getQuestions({});
      this.totalQuestions = total;
    },
    async preGetAnswersTotal() {
      const { total } = await getAnswers({});
      this.totalAnswers = total;
    },
    async handleTagClick() {
      const tag = { name: '未解決', filter: { is_solved: false }, sort: { created_at: -1 } };
      this.$emit('tag-click', tag);
    },
  },
};
</script>

<style scoped>
.qa-background {
  background-image: url('/assets/qa_background.jpg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
}
.qa-total {
  font-size: 2rem;
  font-weight: bolder;
}
.qa-total-number {
  display: inline-block;
  width: 3em;
  text-align: right;
  margin-right: 1em;
}
.qa-card {
  opacity: 0.7;
  height: 300px;
  border: none;
  border-radius: 0.5rem;
}
.qa-card .card-body {
  background-color: #d8b58f;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.qa-card .card-footer {
  border: none;
}
a {
  color: black;
  text-decoration: none;
}
.answer-question:hover {
  cursor: pointer;
  opacity: 0.7;
}
.ask-question:hover {
  cursor: pointer;
  opacity: 0.7;
}
</style>
