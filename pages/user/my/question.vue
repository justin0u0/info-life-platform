<template>
  <el-container>
    <AsideNav />
    <el-main>
      <div class="container question-container">
        <QuestionTab />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import auth from '@/lib/auth';
import AsideNav from '@/components/user/AsideNav.vue';
import QuestionTab from '@/components/user/question/QuestionTab.vue';

export default {
  components: {
    AsideNav,
    QuestionTab,
  },
  mounted() {
    auth.bind(this)('/');
  },
};
</script>

<style scoped>
.question-container {
  max-width: 960px;
}
</style>
