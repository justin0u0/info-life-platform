<template>
  <div class="container mt-4">
    <el-form ref="form" v-model="user" class="form justify-content-start" label-width="200px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 25px">Basic Information</span>
        </div>
        <el-form-item label="UserName : ">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name : ">
          <el-input v-model="user.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="Email : ">
          <el-input v-model="user.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="Role : ">
          <el-input v-model="user.role" disabled></el-input>
        </el-form-item>
      </el-card>
      <div class="divider"></div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 25px">Profiles</span>
        </div>
        <el-form-item label="Facebook : ">
          <div class="d-flex">
            <el-input v-model="facebook.url" placeholder="Uncompleted" class="col-10" disabled><template slot="prepend">facebook.com/</template></el-input>
            <el-switch v-model="facebook.show" class="justify-content-center col-2 my-auto" disabled>
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="Gitlab : ">
          <div class="d-flex">
            <el-input v-model="gitlab.url" placeholder="Uncompleted" class="col-10" disabled><template slot="prepend">gitlab.com/</template></el-input>
            <el-switch v-model="gitlab.show" class="justify-content-center col-2 my-auto" disabled>
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="Github : ">
          <div class="d-flex">
            <el-input v-model="github.url" placeholder="Uncompleted" class="col-10" disabled><template slot="prepend">github.com/</template></el-input>
            <el-switch v-model="github.show" class="justify-content-center col-2 my-auto" disabled>
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="Bitbucket : ">
          <div class="d-flex">
            <el-input v-model="bitbucket.url" placeholder="Uncompleted" class="col-10" disabled><template slot="prepend">bitbucket.com/</template></el-input>
            <el-switch v-model="bitbucket.show" class="justify-content-center col-2 my-auto" disabled>
            </el-switch>
          </div>
        </el-form-item>
      </el-card>
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
        this.$router.push('/user/personalProfile');
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
  font-size: 25px;
  text-align: right;
}
.form /deep/ .el-input {
  padding-right: 0px;
}
.form /deep/ .el-input__inner {
  font-size: 25px;
  font-weight: bold;
  padding-right: 0px;
  background-color: white;
  color: #606266;
}
.form /deep/ .el-switch {
  margin-right: 0px;
  margin-left: 0px;
}
.form /deep/ .el-input-group__prepend {
  font-size: 20px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
}
</style>
