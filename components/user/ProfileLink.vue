<template>
  <a
    class="user-profile"
    :style="{ fontSize, fontWeight }"
    :href="`/user/${userData._id}`"
  >
    {{ userData.name }}&lt; {{ userData.username }} &gt;
  </a>
</template>

<script>
export default {
  name: 'UserProfileLink',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    fontSize: {
      type: String,
      default: '16px',
    },
    fontWeight: {
      type: Number,
      default: 500,
    },
  },
};
</script>

<style scoped>
a.user-profile {
  color: #409effcc;
}
a.user-profile:hover {
  color: #409eff;
}
</style>
