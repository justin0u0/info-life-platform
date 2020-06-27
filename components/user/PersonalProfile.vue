<template>
  <div>
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">Left</el-radio-button>
      <el-radio-button label="right">Right</el-radio-button>
      <el-radio-button label="top">Top</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser } from '@/api/user';

export default {
  components: {
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: {
        _id: null,
        username: '',
        role: '',
        password: '',
        name: '',
        email: '',
        avatar: null,
        profiles: null,
      },
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetUser(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetUser() {
      const res = await getUser(this.userId);
      this.user = res;
      // try {
      //   await this.$axios.get(res.cover.file_url);
      //   this.coverUrl = res.cover.file_url;
      // } catch (error) {
      //   this.coverUrl = '/assets/previewCardDefaultImage.jpg';
      // }
      // console.log('[PostViewPost:preGetPost]: ', this.username);
    },
  },
};
</script>

<style scoped>
</style>
