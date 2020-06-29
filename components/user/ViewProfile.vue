<template>
  <div class="container">
    <client-only>
      <el-card body-style="display: flex; flex-wrap: wrap; margin-left: -15px; margin-right: -15px">
        <div class="col-lg-4 col-md-4 col-12 d-flex flex-column justify-content-center">
          <img src="@/assets/img_avatar.png" class="profile-image" />
        </div>
        <div class="col-lg-8 col-md-8 col-12 mt-md-0 mt-5">
          <div class="row user-info">
            <div class="col-4 col-lg-3 text-right">使用者名稱：</div>
            <div class="col-8 col-lg-9">{{ user.username }}</div>
            <div class="col-12 divider"><el-divider /></div>
            <div class="col-4 col-lg-3 text-right">名稱：</div>
            <div class="col-8 col-lg-9">{{ user.name }}</div>
            <div class="col-12 divider"><el-divider /></div>
            <div class="col-4 col-lg-3 text-right">Facebook：</div>
            <div class="col-8 col-lg-9">
              <span>
                <a
                  v-show="facebookUrl"
                  :href="`https://facebook.com/${facebookUrl}`"
                  target="_blank"
                >
                  https://facebook.com/{{ facebookUrl }}
                </a>
                <span v-show="!facebookUrl">使用者尚未公開</span>
              </span>
            </div>
            <div class="col-12 divider"><el-divider /></div>
            <div class="col-4 col-lg-3 text-right">Github：</div>
            <div class="col-8 col-lg-9">
              <span>
                <a
                  v-show="githubUrl"
                  :href="`https://github.com/${githubUrl}`"
                  target="_blank"
                >
                  https://github.com/{{ githubUrl }}
                </a>
                <span v-show="!githubUrl">使用者尚未公開</span>
              </span>
            </div>
            <div class="col-12 divider"><el-divider /></div>
            <div class="col-4 col-lg-3 text-right">Gitlab：</div>
            <div class="col-8 col-lg-9">
              <span>
                <a
                  v-show="gitlabUrl"
                  :href="`https://gitlab.com/${githubUrl}`"
                  target="_blank"
                >
                  https://gitlab.com/{{ githubUrl }}
                </a>
                <span v-show="!gitlabUrl">使用者尚未公開</span>
              </span>
            </div>
            <div class="col-12 divider"><el-divider /></div>
            <div class="col-4 col-lg-3 text-right">Gitlab：</div>
            <div class="col-8 col-lg-9">
              <span>
                <a
                  v-show="bitbucketUrl"
                  :href="`https://bitbucket.org/${bitbucketUrl}`"
                  target="_blank"
                >
                  https://bitbucket.org/{{ bitbucketUrl }}
                </a>
                <span v-show="!bitbucketUrl">使用者尚未公開</span>
              </span>
            </div>
            <div class="col-12 divider"><el-divider /></div>
            <div class="col-4 col-lg-3 text-right">自我介紹：</div>
            <div class="col-8 col-lg-9">{{ user.description }}</div>
          </div>
        </div>
      </el-card>
    </client-only>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user';

export default {
  name: 'UserViewProfile',
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: {
        username: '',
        name: '',
        description: '',
      },
      collapseActive: '1',
      facebookUrl: null,
      gitlabUrl: null,
      githubUrl: null,
      bitbucketUrl: null,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetUserProfile(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetUserProfile() {
      const res = await getUserProfile(this.userId);
      if (!res) {
        this.$message({ type: 'error', message: '使用者不存在' });
        this.$router.push('/');
      }
      this.user = res;
      const { profiles = null } = res;
      if (profiles !== null) {
        const {
          facebook = {},
          gitlab = {},
          github = {},
          bitbucket = {},
        } = profiles;
        this.facebookUrl = facebook.url;
        this.gitlabUrl = gitlab.url;
        this.githubUrl = github.url;
        this.bitbucketUrl = bitbucket.url;
      }
    },
  },
};
</script>

<style scoped>
.profile-image {
  width: 100%;
}
.user-info {
  font-size: 18px;
  font-weight: 500;
  color: #343434;
}
@media (max-width: 992px) {
  .user-info {
    font-size: 16px;
  }
}
.divider /deep/ .el-divider--horizontal {
  margin: 16px 0;
}
</style>
