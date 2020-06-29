<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-center">
      <ProfileLink :user-data="currentUser" font-weight="600" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileLink from '@/components/user/ProfileLink.vue';

export default {
  name: 'AnswerCurrentUserInfo',
  components: {
    ProfileLink,
  },
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
.user-image {
  height: 50px;
  width: 50px;
}
</style>
