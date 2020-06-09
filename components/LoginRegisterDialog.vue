<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="60%"
  >
    <div class="d-flex justify-content-center align-items-stretch">
      <template v-if="currentDisplay === 'login'">
        <Login ref="login" />
        <el-button
          type="info"
          plain
          class="togglerButton"
          @click="toggleCurrentDisplay"
        >
          <span class="togglerText">點此註冊</span>
        </el-button>
      </template>
      <template v-if="currentDisplay === 'register'">
        <Register ref="register" />
        <el-button
          type="info"
          plain
          class="togglerButton"
          @click="toggleCurrentDisplay"
        >
          <span class="togglerText">點此登入</span>
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

export default {
  name: 'LoginRegisterDialog',
  components: {
    Login,
    Register,
  },
  data() {
    return {
      dialogVisible: false,
      currentDisplay: 'login',
    };
  },
  methods: {
    handleDialogOpen() {
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.dialogVisible = false;
    },
    toggleCurrentDisplay() {
      if (this.currentDisplay === 'login') {
        this.currentDisplay = 'register';
      } else if (this.currentDisplay === 'register') {
        this.currentDisplay = 'login';
      }
    },
  },
};
</script>

<style scoped>
.togglerButton {
  margin-bottom: 30px;
}
.togglerText {
  writing-mode: vertical-lr ;
  -webkit-writing-mode: vertical-lr;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
