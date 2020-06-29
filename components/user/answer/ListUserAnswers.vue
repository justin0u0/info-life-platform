<template>
  <div class="container list-answers-container mt-4">
    <div
      v-for="answer in answers"
      :key="answer._id"
      class="row"
    >
      <div class="col-12">
        <div v-if="answer !== answers[0]" class="divider" />
        <AnswerInfo :answer-data="answer" />
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <el-pagination
        layout="prev, pager, next"
        :total="totalAnswers"
        :page-size="limit"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getAnswers } from '@/api/answer';
import { mapGetters } from 'vuex';
import AnswerInfo from '@/components/user/answer/AnswerInfo.vue';

export default {
  name: 'UserAnswerListUserAnswers',
  components: {
    AnswerInfo,
  },
  data() {
    return {
      answers: [],
      totalAnswers: 0,
      limit: 6,
      loading: false,
      filterUser: null,
    };
  },
  computed: {
    ...mapGetters([
      'currentUserId',
    ]),
  },
  watch: {
    currentUserId: {
      immediate: true,
      async handler(currentUserId) {
        if (currentUserId) {
          this.$store.dispatch('setIsProcessing', true);
          await Promise.all([
            this.preGetAnswers(),
          ]);
          this.$store.dispatch('setIsProcessing', false);
        }
      },
    },
  },
  methods: {
    async preGetAnswers() {
      const { total, data } = await getAnswers({
        filter: { user_id: this.currentUserId },
        limit: this.limit,
      });
      this.totalAnswers = total;
      this.answers = data;
      console.log(data);
    },
    async handleCurrentChange(page) {
      console.log('[UserListUserAnswers:handleCurrentChange]: ', page);
      this.$store.dispatch('setIsProcessing', true);
      const { data } = await getAnswers({
        filter: { user_id: this.currentUserId },
        limit: this.limit,
        skip: (page - 1) * this.limit,
      });
      this.answers = data;
      this.$store.dispatch('setIsProcessing', false);
    },
  },
};
</script>

<style scoped>
.list-answers-container {
  max-width: 960px;
}
.answer-container {
  font-family: 'Lucida Grande', '微軟正黑體', sans-serif;
  min-width: 150px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
