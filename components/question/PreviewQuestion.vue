<template>
  <div class="row pt-3 px-3">
    <a class="question-link" :href="`/question/${questionData._id}`">
      <h5 class="col-12 pb-2">{{ questionData.title }}</h5>
    </a>
    <div class="d-flex align-items-center col-12 pt-2 pb-2">
      <div class="qa-tag-list mr-3">
        <button class="btn btn-sm" :style="{ 'background-color': transformColor() }">
          {{ questionData.tag.name }}
        </button>
      </div>
    </div>
    <div class="d-flex col-12">
      <p class="pt-2 question-info">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span class="pr-2">{{ questionData.view_count }}</span>
        <font-awesome-icon :icon="['far', 'comment-alt']" />
        <span class="pr-2">{{ answers }}</span>
        <font-awesome-icon :icon="['far', 'thumbs-up']" />
        <span>{{ likes }}</span>
      </p>
      <div class="ml-auto pt-1">
        <span class="questioner">
          <ProfileLink :user-data="questionData.user" font-size="0.9rem" />
          asked at
        </span>
        <span class="ml-2 question-date">{{ transformDate(questionData.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countReactions } from '@/api/reaction';
import { getAnswers } from '@/api/answer';
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'QuestionPreviewQuestion',
  components: {
    ProfileLink,
  },
  props: {
    questionData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      likes: 0,
      answers: 0,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetReactions(),
      this.preGetAnswers(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetReactions() {
      const res = await countReactions({ source_type: 'question', source_id: this.questionData._id });
      this.likes = res.like;
    },
    async preGetAnswers() {
      const { total } = await getAnswers({
        filter: { question_id: this.questionData._id },
      });
      this.answers = total;
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
.question-link {
  text-decoration-color: black;
}
.question-link h5 {
  font-weight: bold;
  color: #232323;
}
.question-date {
  color: #888888;
  font-size: 0.9rem;
}
.questioner {
  color: #888888;
  font-size: 0.9rem;
  padding-left: 2.5px;
}
.question-info {
  color: #888888;
  font-size: 0.9rem;
}
.qa-tag-list button {
  color: #3c4d85;
  padding: .1rem .3rem;
  margin-right: .5rem;
}
</style>
