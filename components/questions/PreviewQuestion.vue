<template>
  <div class="row mx-0 mb-4">
    <div>
      <h5>{{ questionData.title }}</h5>
      <div class="d-flex align-items-center">
        <!-- <div class="qa-tag-list mr-3">
          <button class="btn btn-sm">選課</button>
          <button class="btn btn-sm">課業</button>
        </div> -->
        <span class="mr-3">{{ transformDate(questionData.created_at) }}</span>
        <span>
          由<a href="#"> justin0u0 </a>提問
        </span>
      </div>
    </div>
    <div class="ml-auto">
      <div class="row text-center">
        <!-- TODO: view_count -->
        <div class="col">
          <p>瀏覽</p>
          <span>128</span>
        </div>
        <div class="col">
          <p>回答</p>
          <span>7</span>
        </div>
        <div class="col">
          <p>喜歡</p>
          <span>43</span>
        </div>
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
      return d.toLocaleDateString();
    },
  },
};
</script>

<style scoped>

</style>
