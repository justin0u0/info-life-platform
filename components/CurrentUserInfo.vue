<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-center">
      <a class="user-info" href="#">{{ currentUser.name }} &lt; {{ currentUser.username }} &gt;</a>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'CurrentUserInfo',
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
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
.user-image {
  height: 50px;
  width: 50px;
}
</style>
