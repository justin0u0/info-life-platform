<template>
  <div>
    <div style="margin: 20px;" class="d-flex"></div>
    <el-form class="form" :label-position="top" label-width="400px" :model="formLabelAlign">
      <div class="row">
        <el-form-item label="UserName : ">
          <p style="font-size: 25px">{{ user.username }}</p>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="Role : ">
          <p style="font-size: 25px">{{ user.role }}</p>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="Name : ">
          <p style="font-size: 25px">{{ user.name }}</p>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="Email : ">
          <p style="font-size: 25px">{{ user.email }}</p>
        </el-form-item>
      </div>
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
      try {
        await this.$axios.get(res.cover.file_url);
        this.coverUrl = res.cover.file_url;
      } catch (error) {
        this.coverUrl = '/assets/previewCardDefaultImage.jpg';
      }
      console.log('[PostViewPost:preGetPost]: ', this.username);
    },
  },
};
</script>

<style scoped>
.form /deep/ .el-form-item__label {
  font-size: 25px;

}
</style>
