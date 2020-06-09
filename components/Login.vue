<template>
  <el-card class="login-card">
    <div slot="header">
      <h4>登入</h4>
    </div>
    <el-form ref="form" :model="form" label-width="70px" style="margin-top: 30px">
      <el-form-item label="帳號：">
        <el-input v-model="form.username" @keyup.enter.native="handleLogin" />
        <el-alert v-show="error.username" type="error" :title="error.message" />
      </el-form-item>
      <el-form-item label="密碼：">
        <el-input v-model="form.password" show-password @keyup.enter.native="handleLogin" />
        <el-alert v-show="error.password" type="error" :title="error.message" />
      </el-form-item>
      <div class="d-flex justify-content-center" style="margin-bottom: 22px">
        <el-link href="/register">還沒有帳號，點此註冊</el-link>
      </div>
      <el-form-item class="login-button-group">
        <el-button @click="$router.push('/')">
          返回首頁
        </el-button>
        <el-button type="primary" @click="handleLogin">登入</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: {
        username: false,
        password: false,
        message: '',
      },
    };
  },
  methods: {
    async handleLogin() {
      const { username, password } = this.form;
      // 0. Set full page loading
      this.$store.dispatch('setIsProcessing', true);
      try {
        // 1. Reset error
        this.error = { _id: false, password: false, message: '' };
        // 2. Try login
        await this.$store.dispatch('login', { username, password });
        // 3. Show success message
        this.$message({ type: 'success', message: '登入成功' });
        // 4. Redirect
        this.$router.push('/');
      } catch (error) {
        switch (error.statusCode) {
          case 2000:
            this.error._id = true;
            this.error.message = '此帳號尚未註冊';
            break;
          case 2001:
            this.error.password = true;
            this.error.message = '密碼錯誤';
            break;
          default:
            // Unknown error
            this.$message({ type: 'error', message: error.message || error.error });
        }
      }
      // 5. Clear full page loading
      this.$store.dispatch('setIsProcessing', false);
    },
  },
};
</script>

<style scoped>
.login-card {
  width: 90%;
  margin-bottom: 30px;
}

@media (min-width: 576px) {
  .login-card {
    width: 540px;
  }
}
</style>
