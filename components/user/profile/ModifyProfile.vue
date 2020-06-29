<template>
  <div class="container user-profile-container mt-4">
    <el-form ref="form" v-model="user" class="form" label-width="100px">
      <el-card>
        <div slot="header">
          <font-awesome-icon class="mr-1" :icon="['fas', 'user']" />
          <span>基本資料</span>
        </div>
        <el-form-item label="帳號：">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="信箱：">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
      </el-card>
      <div class="divider"></div>
      <el-card>
        <div slot="header">
          <font-awesome-icon class="mr-1" :icon="['fas', 'info']" />
          <span>資訊卡</span>
        </div>
        <el-form-item label="Facebook : ">
          <div class="d-flex">
            <el-input v-model="facebook.url" placeholder="Uncompleted" class="col-8 col-md-10">
              <template slot="prepend">facebook.com/</template>
            </el-input>
            <el-switch v-model="facebook.show" class="justify-content-center col-4 col-md-2">
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="Gitlab : ">
          <div class="d-flex">
            <el-input v-model="gitlab.url" placeholder="Uncompleted" class="col-8 col-md-10">
              <template slot="prepend">gitlab.com/</template>
            </el-input>
            <el-switch v-model="gitlab.show" class="justify-content-center col-4 col-md-2">
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="Github : ">
          <div class="d-flex">
            <el-input v-model="github.url" placeholder="Uncompleted" class="col-8 col-md-10">
              <template slot="prepend">github.com/</template>
            </el-input>
            <el-switch v-model="github.show" class="justify-content-center col-4 col-md-2">
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="Bitbucket : ">
          <div class="d-flex">
            <el-input v-model="bitbucket.url" placeholder="Uncompleted" class="col-8 col-md-10">
              <template slot="prepend">bitbucket.com/</template>
            </el-input>
            <el-switch v-model="bitbucket.show" class="justify-content-center col-4 col-md-2">
            </el-switch>
          </div>
        </el-form-item>
      </el-card>
      <div class="mt-3"></div>
      <el-form-item class="d-flex justify-content-end">
        <el-button type="primary" @click="handleModifyUser">
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
      },
      facebook: {
        url: '',
        show: false,
      },
      gitlab: {
        url: '',
        show: false,
      },
      github: {
        url: '',
        show: false,
      },
      bitbucket: {
        url: '',
        show: false,
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
      const { profiles = null } = res;
      if (profiles !== null) {
        const {
          facebook = null,
          gitlab = null,
          github = null,
          bitbucket = null,
        } = profiles;
        if (facebook !== null) this.facebook = facebook;
        if (gitlab !== null) this.gitlab = gitlab;
        if (github !== null) this.github = github;
        if (bitbucket !== null) this.bitbucket = bitbucket;
      }
    },
    async handleModifyUser() {
      console.log('[PostModifyUser:handleModifyUser]: ');
      const params = {
        name: this.user.name,
        email: this.user.email,
        profiles: {
          facebook: this.facebook,
          gitlab: this.gitlab,
          github: this.github,
          bitbucket: this.bitbucket,
        },
      };
      console.log(params);
      try {
        this.$store.dispatch('setIsProcessing', true);
        await modifyUser(params);
        this.$message({ type: 'success', message: '修改成功', duration: 1000 });
        this.$router.push('/user/profile/modify');
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
.user-profile-container {
  max-width: 960px;
}
.form /deep/ .el-form-item__label {
  text-align: right;
}
.form /deep/ .el-input {
  padding-right: 0px;
}
.form /deep/ .el-input__inner {
  font-weight: bold;
  padding-right: 0px;
}
.form /deep/ .el-switch {
  margin-right: 0px;
  margin-left: 0px;
}
.form /deep/ .el-input-group__prepend {
  width: 133px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
@media only screen and (max-width: 800px) {
  .form /deep/ .el-input-group__prepend {
    display: none;
  }
}
</style>
