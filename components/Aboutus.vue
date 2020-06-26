<template>
  <div class="container">
    <div class="content">
      <h3>關於我們</h3>
      <h5>Infolife 是一個由學生製作的知識分享平台</h5>
      <h5>希望能透過讓學生來寫文章、問問題、回答問題的方式</h5>
      <h5>使學生們能更快速的找到自己想要的資訊</h5>
      <div class="divider"></div>
      <h5>在主題專欄 你可以閱讀各種主題的文章 分享各式各樣的知識</h5>
      <h5>在ＱＡ問答 你可以是問問題的學生 也可以當解答疑惑的學者</h5>
    </div>
    <hr class="featurette-divider">
    <el-carousel :interval="4000" type="card" height="30rem">
      <el-carousel-item>
        <h3>
          <img class="rounded-circle img-fluid user-image" src="/assets/justin0u0.jpg" alt="user image">
        </h3>
        <h4>name : 陳劭愷</h4>
        <h4>mail : <a href="mailto:mail@justin0u0.com">mail@justin0u0.com</a></h4>
        <h4>github : <a href="https://github.com/justin0u0">https://github.com/justin0u0</a></h4>
      </el-carousel-item>
      <el-carousel-item>
        <h3>
          <img class="rounded-circle img-fluid user-image" src="/assets/I_Chun_Chen.jpg" alt="user image">
        </h3>
        <h4>name : 陳奕君</h4>
        <h4>mail : <a href="mailto:zhuweilun204@gmail.com">zhuweilun204@gmail.com</a></h4>
        <h4>github : <a href="https://github.com/wazenmai">https://github.com/wazenmai</a></h4>
      </el-carousel-item>
      <el-carousel-item>
        <h3>
          <img class="rounded-circle img-fluid user-image" src="/assets/LS_Wang.jpg" alt="user image">
        </h3>
        <h4>name : 王領崧</h4>
        <h4>mail : <a href="mailto:lion60609@gmail.com">lion60609@gmail.com</a></h4>
        <h4>github : <a href="https://github.com/LingSung">https://github.com/LingSung</a></h4>
      </el-carousel-item>
      <el-carousel-item>
        <h3>
          <img class="rounded-circle img-fluid user-image" src="/assets/HarryLo.jpg" alt="user image">
        </h3>
        <h4>name : 羅家濬</h4>
        <h4>mail : <a href="mailto:sqaz31117@gmail.com">sqaz31117@gmail.com</a></h4>
        <h4>github : <a href="https://github.com/LOCHIACHUN">https://github.com/HarryLo</a></h4>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

</script>

<style scoped>
h1 {
  margin-top: 1rem;
}
h4 {
  text-align:left;
  margin: 2rem;
}
.container {
  margin-bottom: 2rem;
}
.featurette-divider {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.el-carousel__item h3 {
  background-color: black;
  font-size: 14px;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: rgb(240, 239, 239);
}
.user-image {
  height: 150px;
  width: 150px;
}
</style>
