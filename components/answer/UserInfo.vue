<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ answerData.user.name }} &lt; {{ answerData.user.username }} &gt;</a>
      <span class="date-info">{{ new Date(answerData.created_at).toLocaleString() }}</span>
      <span> </span>
      <font-awesome-icon
        :icon="['fas', 'trash']"
        @click="handleDeletion('like')"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'AnswerUserInfo',
  props: {
    answerData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  margin-top: 15px;
  margin-bottom: 10px;
}
.user-info {
  font-size: 16px;
  font-weight: 600;
  color: #3f3f3f;
}
.date-info {
  font-size: 15px;
  font-weight: 500;
  color: #4f4f4f;
}
.user-image {
  height: 50px;
  width: 50px;
}
</style>
