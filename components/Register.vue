<template>
  <div class="container">
    <nav>
      <a href="/Login">登入</a>
      <a id="register" href="#">註冊</a>
    </nav>
    <div class="form-container">
      <div class="form-title">
        註冊
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="70px">
        <el-form-item label="姓名：" prop="name" class="formItem">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="帳號：" prop="user_id" class="formItem">
          <el-input v-model="form.user_id" />
        </el-form-item>
        <el-form-item label="密碼：" prop="password" class="formItem">
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item label="信箱：" prop="email" class="formItem">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item class="register-button-group">
          <el-button @click="$router.push('/')">
            返回登入頁
          </el-button>
          <el-button type="primary" @click="handleRegister('form')">
            註冊
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { addStudent } from '@/api/student';

export default {
  data() {
    return {
      // user input data
      form: {
        name: '',
        password: '',
        email: '',
        user_id: '',
      },
      // form rules
      rules: {
        name: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, message: '密碼過短(至少6位)', trigger: 'blur' },
        ],
        email: [
          {
            type: 'email', required: true, message: '請輸入信箱', trigger: 'blur',
          },
        ],
        user_id: [
          { required: true, message: '請輸入帳號', trigger: 'blur' },
          {
            pattern: '^[a-zA-z0-9]*$', message: '帳號格式錯誤', trigger: 'blur',
          },
          {
            min: 4, message: '帳號過短(至少4位)', trigger: 'blur',
          },
        ],
      },

    };
  },
  methods: {
    async handleRegister(formName) {
      try {
        // 0. Set full page loading
        // this.$store.dispatch('setIsProcessing', true);
        // 1. Validate Form
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            // 2. Try register
            // await addStudent(this.form);
            // 3. Show success message
            // this.$message({ type: 'success', message: '註冊成功' });
            // 4. Redirect to login page
            // this.$router.push('/student/login');
            // 5. Clear full page loading
            // this.$store.dispatch('setIsProcessing', false);
            console.log('valid');
          } else {
            // this.$store.dispatch('setIsProcessing', false);
            console.log('invalid');
            return false;
          }
          return true;
        });
      } catch (error) {
        this.$message({ type: 'error', message: error.message });
      }
    },
  },
};
</script>

<style scoped>
.form-title {
  text-align: center;
  margin: 20px 0;
}
.form-container {
  max-width: 430px;
  border: 0.5px rgb(180, 180, 180) solid;
  background-color: rgb(171, 211, 250);
  padding: 15px;
  margin: auto;
  width: 100%;
  margin-top: 5px;
}
.container {
  margin: auto;
}
.register-button-group {
  display: flex;
  justify-content: flex-end;
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
#register {
    /* background-color: lightgray; */
    color: black;
    text-decoration: underline;
}
.formItem {
    margin-bottom: 30px !important;
}
</style>
