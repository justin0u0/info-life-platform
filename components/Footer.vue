<template>
  <footer id="footer" class="font-small mt-auto footer-color"> <!-- mt-auto pt-4 -->
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
          <h5 class="font-weight-bold mb-3"><span class="underline pl-0 px-1">關於</span></h5>
          <ul class="list-unstyled">
            <li><a href="/about">關於我們</a></li>
            <li><a href="/about#contact">聯繫我們</a></li>
            <li><a href="#">常見問題</a></li>
          </ul>
        </div>
        <hr class="w-100 d-md-none pb-2">
        <div class="col-md-3 mb-md-0">
          <h5 class="font-weight-bold mb-3"><span class="underline pl-0 px-1">商務</span></h5>
          <ul class="list-unstyled">
            <li><a class="a-font" href="#">行銷業務合作</a></li>
            <li><a class="a-font" href="#">合作媒體</a></li>
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
.footer-color {
  color: #ddd;
}
.list-unstyled a {
  color: #ddd;
}
.underline {
  border-bottom: 2px solid #2371c0;
  padding-bottom: 5px;
}
</style>
