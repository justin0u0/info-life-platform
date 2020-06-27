<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ userData.name }} &lt; {{ userData.username }} &gt;</a>
      <span class="date-info">{{ new Date(dateData).toLocaleString() }}</span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon class="mx-2" :icon="['far', 'heart']" />
      <font-awesome-icon class="mx-2" :icon="['fas', 'share']" />
      <font-awesome-icon class="mx-2" :icon="['fab', 'facebook-square']" />
      <font-awesome-icon class="mx-2" :icon="['far', 'bookmark']" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommanUserInfo',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    dateData: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  margin-top: 30px;
  margin-bottom: 45px;
}
.user-info {
  font-family: "宋體", sans-serif;
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
.icon-container {
  font-size: 20px;
}
</style>
