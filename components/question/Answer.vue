<template>
  <div class="row pt-3 px-3">
    <!-- <a class="answer-link" :href="`/answer/${answerData._id}`">
      <h5 class="col-12 pb-2">{{ answerData.title }}</h5>
    </a> -->
    <!-- <div class="d-flex align-items-center col-12 pt-2 pb-2">
      <div class="qa-tag-list mr-3">
        <button class="btn btn-sm" :style="{ 'background-color': transformColor() }">{{ answerData.tag.name }}</button>
      </div>
    </div> -->
    <div class="d-flex col-12">
      <!-- TODO: answer-info api-->
      <!-- <p class="pt-2 answer-info">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span class="pr-2">28</span>
        <font-awesome-icon :icon="['far', 'comment-alt']" />
        <span class="pr-2">7</span>
        <font-awesome-icon :icon="['far', 'heart']" />
        <span>43</span>
      </p> -->
      <div class="ml-auto pt-1">
        <span class="answerer">
          <a href="#">{{ answerData.user.name }}</a> asked at
          <Editor :content-data="contentObj" />
        </span>
        <!-- <span class="ml-2 answer-date">{{ transformDate(answerData.created_at) }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/ViewEditor.vue';

export default {
  name: 'QuestionAnswer',
  components: {
    Editor,
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
.answer-link {
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
}
</style>
