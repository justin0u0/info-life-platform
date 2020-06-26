<template>
  <footer id="footer" class="font-small mt-auto"> <!-- mt-auto pt-4 -->
    <!-- Footer Links -->
    <div class="container-fluid text-center text-md-left pt-4">
      <div class="row">
        <div class="col-md-6 mb-md-3">
          <h4 class="mb-md-3 pl-md-5">InfoLife</h4>
          <div class="pl-md-5">
            <p class="h6">Share the knowledge.<br>Learn the knowledge.</p>
          </div>
        </div>
        <hr class="w-100 d-md-none pb-2">
        <div class="col-md-3 mb-md-0 mb-md-3">
          <h5 class="font-weight-bold mb-3"><span class="underline pl-0 pr-2">關於</span></h5> <!-- mb-3 -->
          <ul class="list-unstyled">
            <li><a class="a-font" href="#!">關於我們</a></li>
            <li><a class="a-font" href="#!">聯繫我們</a></li>
            <li><a class="a-font" href="#!">常見問題</a></li>
          </ul>
        </div>
        <hr class="w-100 d-md-none pb-2">
        <div class="col-md-3 mb-md-0">
          <h5 class="font-weight-bold mb-3"><span class="underline pl-0 pr-2">商務</span></h5> <!-- mb-3 -->
          <ul class="list-unstyled">
            <li><a class="a-font" href="#!">行銷業務合作</a></li>
            <li><a class="a-font" href="#!">合作媒體</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style scoped>
.list-unstyled a {
  color: white;
  font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
}
.underline {
  border-bottom: 2px solid rgb(35, 113, 192);
  padding-bottom: 5px;
  font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
}
.a-font {
  font-size: 1.1rem;
}
</style>
