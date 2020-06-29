<template>
  <el-container>
    <AsideNav />
    <el-main>
      <div class="container answer-container">
        <AnswerTab />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import auth from '@/lib/auth';
import AsideNav from '@/components/user/AsideNav.vue';
import AnswerTab from '@/components/user/answer/AnswerTab.vue';

export default {
  components: {
    AsideNav,
    AnswerTab,
  },
  mounted() {
    auth.bind(this)('/');
  },
};
</script>

<style scoped>
.answer-container {
  max-width: 960px;
}
</style>
