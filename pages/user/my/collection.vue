<template>
  <el-container>
    <AsideNav />
    <el-main>
      <div class="container collection-container">
        <ListUserCollections />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ListUserCollections from '@/components/user/post/ListUserCollections.vue';
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
  font-family: custom-sans-serif, sans-serif;
}
@font-face {
  font-family: custom-sans-serif;
  src: local("微軟正黑體"), local("Microsoft JhengHei");
  unicode-range: U+4E00-9FFF;
}
@font-face {
  font-family: custom-sans-serif;
  src: local('Lucida Grande'), local(Segoe UI);
  unicode-range: U+00-024F;
}
</style>
