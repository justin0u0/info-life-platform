<template>
  <div class="container about-font">
    <h3>
      <font-awesome-icon :icon="['fas', 'book-reader']" class="icon-decoration" />
      關於
      <span class="info-color">Info</span><span class="life-color">Life</span>
    </h3>
    <div class="about-us">
      <h5>Infolife 是一個由學生製作的知識分享平台。</h5>
      <h5>希望能透過讓學生來寫文章、問問題、回答問題的方式，</h5>
      <h5>使學生們能更快速的找到自己想要的資訊。</h5>
      <div class="divider"></div>
      <h5>在主題專欄，你可以閱讀各種主題的文章，分享各式各樣的知識。</h5>
      <h5>在QA問答，你可以是問問題的學生，也可以當解答疑惑的學者。</h5>
    </div>
    <hr class="featurette-divider">
    <h3 class="mb-5">
      <font-awesome-icon :icon="['fas', 'laptop']" class="icon-decoration" />
      開發團隊
    </h3>
    <el-carousel :interval="5000" type="card" height="30rem">
      <el-carousel-item>
        <div class="mb-2 color-developer-1">
          <img class="rounded-circle img-fluid user-image" src="/assets/justin0u0.jpg">
        </div>
        <span class="tag mt-3">Full Stack Developer</span>
        <h5>姓名：陳劭愷</h5>
        <h5>信箱：<a href="mailto:mail@justin0u0.com">mail@justin0u0.com</a></h5>
        <h5>Github: <a href="https://github.com/justin0u0">https://github.com/justin0u0</a></h5>
      </el-carousel-item>
      <el-carousel-item>
        <div class="mb-2 color-developer-2">
          <img class="rounded-circle img-fluid user-image" src="/assets/LS_Wang.jpg">
        </div>
        <span class="tag mt-3">Frontend Developer</span>
        <h5>姓名：王領崧</h5>
        <h5>信箱： <a href="mailto:lion60609@gmail.com">lion60609@gmail.com</a></h5>
        <h5>github : <a href="https://github.com/LingSung">https://github.com/LingSung</a></h5>
      </el-carousel-item>
      <el-carousel-item>
        <div class="mb-2 color-developer-3">
          <img class="rounded-circle img-fluid user-image" src="/assets/I_Chun_Chen.jpg">
        </div>
        <span class="tag mt-3">Frontend Developer</span>
        <h5>姓名：陳奕君</h5>
        <h5>信箱：<a href="mailto:iotbwu0101@gmail.com">iotbwu0101@gmail.com</a></h5>
        <h5>Github : <a href="https://github.com/wazenmai">https://github.com/wazenmai</a></h5>
      </el-carousel-item>
      <el-carousel-item>
        <div class="mb-2 color-developer-4">
          <img class="rounded-circle img-fluid user-image" src="/assets/HarryLo.jpg">
        </div>
        <span class="tag mt-3">Frontend Developer</span>
        <h5>姓名：羅家濬</h5>
        <h5>信箱：<a href="mailto:sqaz31117@gmail.com">sqaz31117@gmail.com</a></h5>
        <h5>Github : <a href="https://github.com/LOCHIACHUN">https://github.com/HarryLo</a></h5>
      </el-carousel-item>
    </el-carousel>
    <hr class="featurette-divider">
    <h3 id="contact">
      <font-awesome-icon :icon="['fas', 'paper-plane']" class="icon-decoration" />
      聯絡我們
    </h3>
    <Contact />
  </div>
</template>

<script>
import Contact from '@/components/about/Contact.vue';

export default {
  components: {
    Contact,
  },
};
</script>

<style scoped>
h1 {
  margin-top: 1rem;
}
h5 {
  text-align:left;
  margin: 2rem;
  overflow-wrap: break-word;
}
a {
  color: #444444;
}
.container {
  margin-bottom: 2rem;
}
.about-us h5 {
  text-align: center;
}
.featurette-divider {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.el-carousel__item div {
  margin: 0;
  padding: 15px 0px;
}
.el-carousel__item {
  border-radius: 15px;
}
.el-carousel__item:nth-child(2n) {
  background-color: white;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #f0efef;
}
.user-image {
  height: 150px;
  width: 150px;
}
.tag {
  background-color: #e6e6e6;
  color: #454545;
  padding: .1rem .3rem;
  margin-right: .5rem;
  margin-top: 5rem;
}

.icon-decoration {
  color: #616163;
  padding-bottom: 3px;
}
.info-color {
  color: #616163;
}
.life-color {
  color: #409eff;
}

.color-developer-1 {
  background-color: #e1b380cc;
}
.color-developer-2 {
  background-color: #b6be68cc;
}
.color-developer-3 {
  background-color: #d4d3cfcc;
}
.color-developer-4 {
  background-color: #9ac1edcc;
}
@media only screen and (max-width: 768px) {
  h5 {
    font-size: 16px;
  }
}
</style>
