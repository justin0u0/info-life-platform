<template>
  <el-card class="register-card">
    <div slot="header">
      <h4>註冊</h4>
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
        <el-button @click="$router.push('/Login')">
          返回登入頁
        </el-button>
        <el-button type="primary" @click="handleRegister('form')">
          註冊
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
          { pattern: '^[a-zA-z0-9]*$', message: '帳號格式錯誤', trigger: 'blur' },
          { min: 6, message: '帳號長度至少為 6', trigger: 'blur' },
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
.register-card {
  width: 90%;
  margin-bottom: 30px;
}
@media (min-width: 576px) {
  .register-card {
    width: 540px;
  }
}
</style>
