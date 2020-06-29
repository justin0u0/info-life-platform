<template>
  <el-container>
    <AsideNav />
    <el-main>
      <div class="container collection-container mt-5">
        <ListUserCollections />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ListUserCollections from '@/components/user/ListUserCollections.vue';
import AsideNav from '@/components/user/AsideNav.vue';

export default {
  components: {
    AsideNav,
    ListUserCollections,
  },
};
</script>

<style scoped>
.collection-container {
  max-width: 1000px;
}
</style>
