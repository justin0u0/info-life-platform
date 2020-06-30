<template>
  <el-dropdown v-show="isLoggedIn">
    <span class="el-dropdown-link header-tag">
      {{ currentUser.username }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item class="dropdown-item">
        <a href="/user/profile">
          <font-awesome-icon class="mr-3" :icon="['fas', 'user']" />
          個人資料
        </a>
      </el-dropdown-item>
      <el-dropdown-item class="dropdown-item">
        <a href="/post/create">
          <font-awesome-icon class="mr-3" :icon="['fas', 'plus']" />
          新增文章
        </a>
      </el-dropdown-item>
      <el-dropdown-item class="dropdown-item">
        <a href="/question/create">
          <font-awesome-icon class="mr-3" :icon="['fas', 'question']" />
          新增問題
        </a>
      </el-dropdown-item>
      <el-dropdown-item class="dropdown-item">
        <a href="/user/my/post">
          <font-awesome-icon class="mr-3" :icon="['fas', 'sticky-note']" />
          我的文章
        </a>
      </el-dropdown-item>
      <el-dropdown-item class="dropdown-item">
        <a href="/user/my/question">
          <font-awesome-icon class="mr-3" :icon="['fas', 'lightbulb']" />
          我的問題
        </a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserDropdown',
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'currentUser',
    ]),
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px){
  .dropdown-item {
    width: 100vw;
    text-align: center;
  }
}

.header-tag{
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.05rem;
  border-bottom: 3px solid transparent;
}
.dropdown-item {
  padding-left: 30px;
  padding-right: 30px;
  font-size: 16px;
  font-weight: 400;
  color: #343434;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropdown-item a {
  color: #000000;
  text-decoration: none;
}
.dropdown-item a:hover {
  color: #409eff;
  text-decoration: none;
}
</style>
