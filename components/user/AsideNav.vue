<template>
  <el-aside width="200px">
    <el-menu
      ref="menu"
      :default-active="$route.path"
      class="side-navbar"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <font-awesome-icon class="mr-3" :icon="['fas', 'user']" />
          <span class="font-weight-bold">使用者資訊</span>
        </template>
        <el-menu-item class="text-right" index="/user/my/personalProfile">個人資料</el-menu-item>
        <el-menu-item class="text-right" index="/user/modify">修改資料</el-menu-item>
        <el-menu-item class="text-right" index="/user/password">修改密碼</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <font-awesome-icon class="mr-3" :icon="['fas', 'edit']" />
          <span class="font-weight-bold">主題專欄</span>
        </template>
        <el-menu-item class="text-right" index="/user/my/post">我的文章</el-menu-item>
        <el-menu-item class="text-right" index="/user/collection">收藏文章</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <font-awesome-icon class="mr-3" :icon="['fas', 'question']" />
          <span class="font-weight-bold">ＱＡ問答</span>
        </template>
        <el-menu-item class="text-right" index="/user/my/question">我的問題</el-menu-item>
        <el-menu-item class="text-right" index="/user/my/answer">我的回答</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'UserAsideNav',
};
</script>

<style scoped>
.side-navbar {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
