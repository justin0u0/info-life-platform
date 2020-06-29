<template>
  <div>
    <ViewProfile :user-id="$route.params.id" />
  </div>
</template>

<script>
import ViewProfile from '@/components/user/ViewProfile.vue';

export default {
  components: {
    ViewProfile,
  },
};
</script>

<style>

</style>
