<template>
  <nav id="navHeader" class="navbar navbar-expand-md pb-3 mb-3">
    <a class="navbar-brand font-weight-normal brand ml-3 pb-2 pt-0" href="/">
      <span class="info-deco">Info</span>
      <span class="life-deco">Life</span>
    </a>
    <button class="navbar-toggler toggler pb-0" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"><font-awesome-icon icon="bars" /></span>
    </button>
    <div id="collapsibleNavbar" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li
          v-for="(navLink, index) in navLinks"
          :key="index"
          class="nav-item px-2 pl-sm-3"
        >
          <a
            class="header-tag nav-link"
            :class="{ active: navLink.isActive }"
            :href="navLink.route"
          >
            {{ navLink.content }}
          </a>
        </li>
        <li v-if="isLoggedIn" class="nav-item px-2 pl-sm-3">
          <a class="header-tag nav-link" href="" @click.prevent="handleLogout">登出</a>
        </li>
        <li class="nav-item px-2 pl-sm-3">
          <a v-if="!isLoggedIn" class="header-tag nav-link" href="" @click.prevent="handleDialogOpen">登入/註冊</a>
          <a v-else class="header-tag nav-link" href="" @click.prevent="() => null">
            <UserDropdown />
          </a>
        </li>
      </ul>
    </div>

    <!-- Login/Register Dialog -->
    <LoginRegisterDialog ref="dialog" />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginRegisterDialog from '@/components/LoginRegisterDialog.vue';
import UserDropdown from '@/components/UserDropdown.vue';

export default {
  name: 'Header',
  components: {
    LoginRegisterDialog,
    UserDropdown,
  },
  data() {
    return {
      navLinks: [
        { route: '/post', content: '主題專欄', isActive: false },
        { route: '/question', content: 'QA問答', isActive: false },
        { route: '/play', content: '場外哈拉', isActive: false },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'currentUser',
    ]),
  },
  mounted() {
    // Register all 'isActive'
    this.preRegisterState();
  },
  methods: {
    preRegisterState() {
      for (let i = 0; i < this.navLinks.length; i += 1) {
        const navLink = this.navLinks[i];
        if (this.$route.path.startsWith(navLink.route)) {
          navLink.isActive = true;
          this.$set(this.navLinks, i, navLink);
        }
      }
    },
    handleDialogOpen() {
      console.log('[Header:handleDialogOpen]');
      this.$refs.dialog.handleDialogOpen();
    },
    handleLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
      this.$message({ type: 'success', message: '登出成功', duration: 1000 });
    },
  },
};
</script>

<style scoped>
.header-tag{
  font-family: "微軟正黑體", sans-serif;
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.05rem;
  border-bottom: 3px solid transparent;
}
.header-tag:hover {
  border-bottom: 3px solid #409eff;
}
.toggler {
  border-color:#0000001a;
}
.info-deco {
  color: #616163;
}
.life-deco {
  color: #409eff;
}
.active {
  font-weight: bolder;
}
</style>
