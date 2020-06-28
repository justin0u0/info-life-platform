<template>
  <div class="container user-profile-container mt-4">
    <el-form ref="form" v-model="user" class="form justify-content-start" label-width="200px">
      <el-form-item label="UserName : ">
        <el-input v-model="user.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="Name : ">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="Email : ">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Role : ">
        <el-input v-model="user.role" disabled></el-input>
      </el-form-item>
      <div class="divider"></div>
      <el-form-item class="d-flex justify-content-end">
        <el-button type="primary" @click="handleModifyUser()">
          確認修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser, modifyUser } from '@/api/user';
import { mapGetters } from 'vuex';

export default {
  name: 'ModifyProfile',
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
  computed: {
    ...mapGetters([
      'currentUserId',
    ]),
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
      const res = await getUser('currentUserId');
      this.user = res;
    },
    async handleModifyUser() {
      console.log('[PostModifyUser:handleModifyUser]: ');
      try {
        this.$store.dispatch('setIsProcessing', true);
        await modifyUser(this.user);
        this.$message({ type: 'success', message: '修改成功', duration: 1000 });
        this.$router.push('/user/modifyProfile');
        this.$store.dispatch('setIsProcessing', false);
      } catch (error) {
        this.$message({ type: 'error', message: '修改失敗', duration: 1000 });
        this.$store.dispatch('setIsProcessing', false);
      }
    },
  },
};
</script>

<style scoped>
.list-posts-container {
  max-width: 960px;
}
.form /deep/ .el-form-item__label {
  font-size: 25px;
}
.form /deep/ .el-input__inner {
  font-size: 25px;
  font-weight: bold;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
