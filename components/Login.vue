<template>
  <div class="container">
    <div class="form-title">
      <h2>Login</h2>
    </div>
    <el-form ref="form" :model="form" label-width="70px" style="margin-top: 30px">
      <el-form-item label="帳號：">
        <el-input v-model="form._id" />
        <el-alert v-show="error._id" type="error" :title="error.message" />
      </el-form-item>
      <el-form-item label="密碼：">
        <el-input v-model="form.password" show-password />
        <el-alert v-show="error.password" type="error" :title="error.message" />
      </el-form-item>
      <el-form-item class="login-button-group">
        <el-button @click="$router.push('/')">
          返回首頁
        </el-button>
        <el-button type="primary" @click="handleLogin">登入</el-button>
      </el-form-item>
    </el-form>
    <div class="register-link">
      <el-link href="/Register">還沒有帳號，點此註冊</el-link>
      <nav>
        <a id="login" href="#">登入</a>
        <a href="/Register">註冊</a>
      </nav>
      <div class="form-container">
        <div class="form-title">
          <h3>Login</h3>
        </div>
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="帳號：">
            <el-input v-model="form._id" />
            <el-alert v-show="error._id" type="error" :title="error.message" />
          </el-form-item>
          <el-form-item label="密碼：">
            <el-input v-model="form.password" show-password />
            <el-alert v-show="error.password" type="error" :title="error.message" />
          </el-form-item>
          <el-form-item class="login-button-group">
            <el-button @click="$router.push('/')">
              返回首頁
            </el-button>
            <el-button type="primary" @click="handleLogin">登入</el-button>
          </el-form-item>
        </el-form>
        <div class="register-link">
          <el-link href="/register">還沒有帳號，點此註冊</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        _id: '',
        password: '',
      },
      error: {
        _id: false,
        password: false,
        message: '',
      },
    };
  },
  methods: {
    async handleLogin() {
      const { _id, password } = this.form;
      // 0. Set full page loading
      this.$store.dispatch('setIsProcessing', true);
      try {
        // 1. Reset error
        this.error = { _id: false, password: false, message: '' };
        // 2. Try login
        await this.$store.dispatch('Login', { _id, password });
        // 3. Show success message
        this.$message({ type: 'success', message: '登入成功' });
        // 4. Redirect
        this.$router.push('/student');
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
            this.$message({ type: 'error', message: error.message });
        }
      }
      // 5. Clear full page loading
      this.$store.dispatch('setIsProcessing', false);
    },
  },
};
</script>

<style scoped>
.form-title {
  text-align: center;
  margin: 10px 0;
}
.form-container {
  max-width: 580px;
  border: 0.5px rgb(180, 180, 180) solid;
  padding: 15px;
  background-color: rgb(171, 211, 250);
  text-align: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
}
.container {
  margin: auto;
}
.login-button-group {
  display: flex;
  justify-content: flex-end;
}
.register-link {
  text-align: center;
}
nav {
  text-align: center;
}
nav a {
    color: rgb(192, 192, 192);
    text-decoration: none;
    letter-spacing: 0.1rem;
    display: inline;
    padding: 0 0.5rem;
}
nav a:hover {
    /* background-color: rgb(26, 26, 26); */
    text-decoration: underline;
    color: black;
}
#login {
    /* background-color: lightgray; */
    color: black;
    text-decoration: underline;
}
</style>
