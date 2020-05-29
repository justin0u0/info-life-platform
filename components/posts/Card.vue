<template>
  <div class="card col-md-4 px-3 my-4 border-0 post-text">
    <img class="card-img-top" src="@/assets/card_background.jpg" alt="Card Image">
    <div class="card-body px-0">
      <h5 class="card-title mb-2">{{ postData.title }}</h5>
      <h6 class="card-subtitle my-2 post-subtitle">{{ postData.subtitle }}</h6>
      <div class="d-flex my-2 pt-3">
        <div class="">
          <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png" alt="user image">
        </div>
        <div class="ml-2">
          <p class="mb-1">{{ postData.user.username }}</p>
          <p class="mb-1">{{ transformDate(postData.created_at) }}</p>
        </div>
        <div class="ml-auto mr-5 mt-2">
          <p>
            <font-awesome-icon :icon="['far', 'heart']" />
            <span>{{ 0 }}</span>
            <font-awesome-icon :icon="['far', 'eye']" />
            <span>{{ postData.view_count }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // getPost
    // need to transform date
    const post = {};

    // getCollectionsbyPostId

    // use post.user_id get user
    const author = {};
  },
  methods: {
    transformDate(unixEpoch) {
      const d = new Date(unixEpoch);
      return d.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.user-image {
  height: 50px;
  width: 50px;
}
.post-subtitle {
  color: #777;
}
.post-text {
  font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
}
</style>
