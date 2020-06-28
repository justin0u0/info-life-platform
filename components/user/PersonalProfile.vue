<template>
  <div class="container user-profile-container mt-4">
    <el-form class="form" :label-position="top" label-width="200px" :model="formLabelAlign">
      <el-form-item label="UserName : ">
        <div class="content ml-2">
          <p style="font-size: 30px">{{ user.username }}</p>
        </div>
      </el-form-item>
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
      <div class="divider"></div>
    </el-form>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Card name</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUser } from '@/api/user';

export default {
  name: 'CurrentUserInfo',
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
      const res = await getUser();
      this.user = res;
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
  padding-top: 10px;
}
.content {
  border: 1px solid #e2e2e2;
  padding: 10px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
