<template>
  <div class="container">
    <div class="form-title">
      註冊
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="70px" >
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      
      <el-form-item label="帳號：" prop="userID">
        <el-input v-model="form.userID" />
      </el-form-item>
      <el-form-item label="密碼：" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-form-item label="信箱：" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
     
      <el-form-item class="register-button-group">
        <!-- <el-button @click="$router.push('/student/login')">
          返回登入頁
        </el-button> -->
        <el-button @click="$router.push('/')">
          返回登入頁
        </el-button>
        <el-button type="primary" @click="handleRegister('form')" >
          註冊
        </el-button>
        <!-- <el-button type="primary" @click="handleRegister('form')">
          註冊
        </el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { addStudent } from '@/api/student';

export default {
  props: {
    // departmentList: {
    //   type: Array,
    //   required: true,
    //   default: () => ([]),
    // },
  },
  data() {
    return {
      // user input data
      form: {
        name: '',
        password: '',
        email: '',
        userID: '',
      },
      // form rules
      rules: {
        name: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, message: '密碼過短', trigger: 'blur' },
        ],
        email: [
          {
            type: 'email', required: true, message: '請輸入信箱', trigger: 'blur',
          },
        ],
        userID: [
          { required: true, message: '請輸入帳號', trigger: 'blur' },
          {
            pattern: '^[a-zA-z0-9]*$', message: '帳號格式錯誤', trigger: 'blur',
          },
          {
            min: 4, message: '帳號過短', trigger: 'blur',
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
.container {
  max-width: 580px;
  border: 0.5px rgb(180, 180, 180) solid;
  background-color: rgb(171, 211, 250);
  padding: 20px;
  margin: auto;
}
.register-button-group {
  display: flex;
  justify-content: flex-end;
}

</style>
