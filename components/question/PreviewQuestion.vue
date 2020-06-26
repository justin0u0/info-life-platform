<template>
  <div class="row pt-3 px-3">
    <h5 class="col-12 pb-2">{{ questionData.title }}</h5>
    <div class="d-flex align-items-center col-12 pt-2 pb-2">
      <div class="qa-tag-list mr-3">
        <button class="btn btn-sm" :style="{ 'background-color': transformColor() }">{{ questionData.tag.name }}</button>
      </div>
    </div>
    <div class="d-flex col-12">
      <!-- TODO: question-info api-->
      <p class="pt-2 question-info">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span class="pr-2">28</span>
        <font-awesome-icon :icon="['far', 'comment-alt']" />
        <span class="pr-2">7</span>
        <font-awesome-icon :icon="['far', 'heart']" />
        <span>43</span>
      </p>
      <div class="ml-auto pt-1">
        <span class="questioner">
          <a href="#">{{ questionData.user.name }}</a> asked at
        </span>
        <span class="ml-2 question-date">{{ transformDate(questionData.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString().concat(' ').concat(d.toLocaleTimeString('it-IT'));
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
h5 {
  font-weight: bold;
}
.question-date {
  color: #888;
  font-size: 0.9rem;
}
.questioner {
  color: #888;
  font-size: 0.9rem;
  padding-left: 2.5px;
}
.questioner a {
  color: rgba(64, 158, 255, 0.8);
}
.questioner a:hover {
  color: rgb(64, 158, 255);
}
.question-info {
  color: #888;
  font-size: 0.9rem;
}
.qa-tag-list button {
  color: rgb(60, 77, 133);
  padding: .1rem .3rem;
  margin-right: .5rem;
}
</style>
