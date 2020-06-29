<template>
  <div>
    <a :href="`/question/modify/${questionId}`">
      <el-button type="primary" plain class="mt-lg-2 icon-button">
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['far', 'edit']" />
          <span class="ml-2">編輯</span>
        </div>
      </el-button>
    </a>
    <el-button
      type="danger"
      plain
      class="mt-2 icon-button"
      @click="handleDeleteQuestion"
    >
      <div class="d-flex align-items-center">
        <font-awesome-icon
          :icon="['far', 'trash-alt']"
        />
        <span class="ml-2">
          刪除
        </span>
      </div>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'UserQuestionQuestionButton',
  props: {
    questionId: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleDeleteQuestion() {
      this.$emit('delete-question');
    },
  },
};
</script>

<style scoped>
.icon-button {
  min-width: 94px;
}
</style>
