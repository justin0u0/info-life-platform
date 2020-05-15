<template>
<nav class="navbar navbar-expand-md pb-3 my-3 aaa">
  <a class="navbar-brand font-weight-normal brand ml-3" href="/"><span class="info-deco">Info</span><span class="life-deco">Life</span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
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
  // watch: {
  //   '$route'() {
  //     console.log(this.$route.path);

  //     for (i = 0; i < isActive.length; i++)
  //       isActive[i] = false;
  //     if (this.$route.path === '/blog') {
  //       isActive[0] = true;
  //     } else if (this.$route.path === '/qa') {
  //       isActive[1] = true;
  //     } else if (this.$route.path === '/play') {
  //       isActive[2] = true;
  //     } else if (this.$route.path === '/login') {
  //       isActive[3] = true;
  //     }
  //   }
  // }
};
</script>

<style scoped>
.aaa {
  background-color: white;
}
.header-tag a {
  color: #111;
  border-bottom: 3px solid transparent;
}
.header-tag a:hover {
  border-bottom:3px solid rgb(64, 158, 255);
}
.navbar-icon {
  color: black;
}
.info-deco {
  color: rgb(97, 97, 99);
}
.life-deco {
  /* color: rgb(218, 245, 255); */
  color: rgb(64, 158, 255);
}
.active {
  font-weight: bold;
}
</style>
