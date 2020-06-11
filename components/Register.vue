<template>
  <el-card class="register-card">
    <div slot="header">
      <h4>註冊</h4>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="帳號名稱：" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密碼：" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-form-item label="信箱：" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item class="d-flex justify-content-end">
        <el-button type="primary" @click="handleRegister('form')">
          註冊
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addUser } from '@/api/user';

export default {
  data() {
    return {
      // user input data
      form: {
        username: null,
        name: null,
        password: null,
        email: null,
      },
      // form rules
      rules: {
        username: [
          { required: true, message: '請輸入帳號名稱', trigger: 'blur' },
          { pattern: '^[a-zA-z0-9]*$', message: '帳號格式錯誤', trigger: 'blur' },
          { min: 6, message: '帳號長度至少為６', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, message: '密碼長度至少為６', trigger: 'blur' },
        ],
        email: [
          {
            type: 'email', required: true, message: '請輸入信箱', trigger: 'blur',
          },
        ],
      },

    };
  },
  methods: {
    async handleRegister(formName) {
      try {
        // 0. Set full page loading
        this.$store.dispatch('setIsProcessing', true);
        // 1. Validate Form
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            // 2. Try register
            await addUser(this.form);
            // 3. Show success message
            this.$message({ type: 'success', message: '註冊成功' });
            // 4. Redirect to login page
            this.$router.push('/');
            // 5. Clear full page loading
            this.$store.dispatch('setIsProcessing', false);
            // 6. Emit success message
            this.$emit('on-success');
          } else {
            this.$store.dispatch('setIsProcessing', false);
            return false;
          }
          return true;
        });
      } catch (error) {
        this.$message({ type: 'error', message: error.message });
        this.$emit('on-fail');
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
