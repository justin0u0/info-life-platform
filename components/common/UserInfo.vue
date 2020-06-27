<template>
  <div class="d-flex user-container">
    <div class="mr-2">
      <img class="rounded-circle img-fluid user-image" src="@/assets/img_avatar.png">
    </div>
    <div class="ml-2 d-flex flex-column justify-content-between">
      <a class="user-info" href="#">{{ userData.name }} &lt; {{ userData.username }} &gt;</a>
      <span class="date-info">{{ new Date(infoData.created_at).toLocaleString() }}</span>
    </div>
    <div class="ml-auto mt-auto icon-container">
      <font-awesome-icon class="mx-2" :icon="['far', 'heart']" />
      <font-awesome-icon class="mx-2" :icon="['fas', 'share']" />
      <ShareNetwork
        network="facebook"
        :url="$route.path"
        :title="infoData.title"
        :quote="infoData.title"
      >
        <font-awesome-icon class="mx-2" :icon="['fab', 'facebook-square']" />
      </ShareNetwork>
      <font-awesome-icon class="mx-2" :icon="['far', 'bookmark']" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommanUserInfo',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    infoData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      shareCount: 0,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      // this.preGetShareCount(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetShareCount() {
      const res = await this.$axios.get('https://graph.facebook.com/', {
        params: {
          id: this.$route.path,
          fields: 'og_object{engagement}',
        },
      });
      console.log(res);
      const { count } = res.og_object.engagement;
      this.share_count = count;
    },
  },
  head() {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: 'https://rudrastyh.com/wp-content/uploads/2016/08/facebook-apps-list-add-new-app.jpg' },
      ],
    };
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  margin-top: 30px;
  margin-bottom: 45px;
}
.user-info {
  font-family: "宋體", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #3f3f3f;
}
.date-info {
  font-size: 15px;
  font-weight: 500;
  color: #4f4f4f;
}
.user-image {
  height: 50px;
  width: 50px;
}
.icon-container {
  font-size: 20px;
}
</style>
