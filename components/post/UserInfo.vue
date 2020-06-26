<template>
  <div class="d-flex my-2 pt-4">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png" alt="user image">
    </div>
    <div class="ml-2">
      <p class="mb-1">{{ userData.name }}</p>
      <a href="#!">{{ userData.username }}</a>
    </div>
    <div class="ml-auto mt-2">
      <div class="wordcolor">
        <a style="" class="fa-2x mx-2 text-dark" href="#!"><font-awesome-icon :icon="['far', 'heart']" /></a>
        <a class="fa-2x mx-2 text-dark" href="#!"><font-awesome-icon :icon="['fas', 'share']" /></a>
        <a class="fa-2x mx-2 text-dark" href="#!"><font-awesome-icon :icon="['fab', 'facebook-square']" /></a>
        <a class="fa-2x mx-2 text-dark" href="#!"><font-awesome-icon :icon="['far', 'bookmark']" /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostUserInfo',
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-image {
  height: 50px;
  width: 50px;
}
.info {
  margin-top: 3rem;
}
.b {
  text-align: right;
  margin-right: 2rem;
}
.wordcolor {
  color: black;
}
</style>
