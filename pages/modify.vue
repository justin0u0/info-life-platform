<template>
  <div class="modify">
    <Modify />
  </div>
</template>

<script>
import Modify from '@/components/Modify';

export default {
  components: {
    Modify,
  },
};
</script>

<style scoped>
.modify {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
