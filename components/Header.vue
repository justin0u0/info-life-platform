<template>
<nav class="navbar navbar-expand-md pb-3 my-3">
  <a class="navbar-brand font-weight-normal brand ml-3 pb-2 pt-0" href="/"><span class="info-deco">Info</span><span class="life-deco">Life</span></a>
  <button class="navbar-toggler toggler pb-0" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"><font-awesome-icon icon="bars" /></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav header-tag ml-auto">
      <li class="nav-item px-2 pl-sm-3">
        <a class="nav-link" :class="{ active: isActive[0] }" href="/blog">主題專欄</a>
      </li>
      <li class="nav-item px-2 pl-sm-3">
        <a class="nav-link" :class="{ active: isActive[1] }" href="/qa">QA問答</a>
      </li>
      <li class="nav-item px-2 pl-sm-3">
        <a class="nav-link" :class="{ active: isActive[2] }" href="/play">哈拉場外</a>
      </li>  
      <li class="nav-item px-2 pl-sm-3">
        <a class="nav-link" :class="{ active: isActive[3] }" href="/login">登入/註冊</a>
      </li>
    </ul>
  </div> 
</nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: [false, false, false, false]
    }
  },
  mounted() {
    if (this.$route.path === '/blog') {
      this.$set(this.isActive, 0, true);
    } else if (this.$route.path === '/qa') {
      this.$set(this.isActive, 1, true);
    } else if (this.$route.path === '/play') {
      this.$set(this.isActive, 2, true);
    } else if (this.$route.path === '/login') {
      this.$set(this.isActive, 3, true);
    }
  }
};
</script>

<style scoped>
.header-tag a {
  font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
  color: #111;
  font-size: 1.1rem;
  border-bottom: 3px solid transparent;
}
.header-tag a:hover {
  border-bottom:3px solid rgb(64, 158, 255);
}
.toggler {
  border-color: rgba(0, 0, 0, 0.1);
}
.info-deco {
  color: rgb(97, 97, 99);
}
.life-deco {
  color: rgb(64, 158, 255);
}
.active {
  font-weight: bold;
}
</style>
