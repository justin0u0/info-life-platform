<template>
<nav class="navbar navbar-expand-md pb-3 my-3">
  <a class="navbar-brand font-weight-normal brand ml-3" href="/"><span class="info-deco">Info</span><span class="life-deco">Life</span></a>
  <button class="navbar-toggler toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon navbar-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav header-tag ml-auto">
      <li class="nav-item px-2">
        <a class="nav-link" :class="{ active: isActive[0] }" href="/blog">主題專欄</a>
      </li>
      <li class="nav-item px-2">
        <a class="nav-link" :class="{ active: isActive[1] }" href="/qa">QA問答</a>
      </li>
      <li class="nav-item px-2">
        <a class="nav-link" :class="{ active: isActive[2] }" href="/play">哈拉場外</a>
      </li>  
      <li class="nav-item px-2">
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
    for (let i = 0; i < this.isActive.length; i++)
      this.$set(this.isActive, i, false);
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
  color: #111;
  border-bottom: 3px solid transparent;
}
.header-tag a:hover {
  border-bottom:3px solid rgb(64, 158, 255);
}
.toggler {
  border-color: rgba(0, 0, 0, 0.1);
}
.navbar-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
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
