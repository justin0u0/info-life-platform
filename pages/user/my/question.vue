<template>
  <el-container>
    <AsideNav />
    <el-main>
      <el-tabs type="card">
        <el-tab-pane label="已解決">
          <!-- <ListUserQuestions :is-solved="true" /> -->
        </el-tab-pane>
        <el-tab-pane label="未解決">
          <!-- <ListUserQuestions :is-solved="false" /> -->
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import AsideNav from '@/components/user/AsideNav.vue';
// import ListUserQuestions from '@/components/user/ListUserQuestions.vue';

export default {
  components: {
    AsideNav,
    // ListUserQuestions,
  },
};
</script>

<style>

</style>
