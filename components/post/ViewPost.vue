<template>
  <div class="container mw-100 mx-0 px-0 background">
    <div class="row mx-0 pb-3">
      <div class="like-collect col-2 d-flex justify-content-center align-items-center flex-column">
        <div class="py-2 sticky-top">
          <font-awesome-icon v-if="!heartShow" :icon="['far', 'heart']" size="2x" :style="{color: 'black'}" @click="modifyHeartState" />
          <font-awesome-icon v-if="heartShow" :icon="['fas', 'heart']" size="2x" :style="{color: 'black'}" @click="modifyHeartState" />
          <span class="align-top font-weight-bold likes">{{ likes }}</span>
        </div>
        <div class="py-2 sticky-offset sticky-top">
          <font-awesome-icon v-if="!bookmarkShow" :icon="['far', 'bookmark']" size="2x" :style="{color: 'black'}" @click="modifyBookmarkState" />
          <font-awesome-icon v-if="bookmarkShow" :icon="['fas', 'bookmark']" size="2x" :style="{color: 'black'}" @click="modifyBookmarkState" />
          <span class="align-top font-weight-bold likes">{{ collects }}</span>
        </div>
      </div>
      <div class="article col-8">
        <div class="text-center">
          <h1>{{ post.title }}</h1>
        </div>
        <div class="text-center">
          <h2>{{ post.subtitle }}</h2>
        </div>
        <div class="content">
          {{ post.content }}
        </div>
      </div>
      <div class="list col-2">
        list
      </div>
    </div>
  </div>
</template>

<script>
// import { getPost } from '@/api/post';

export default {
  name: 'PostViewPost',
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // progress: '100%',
      post: {
        title: 'title',
        subtitle: 'subtitle',
        content: 'The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friendefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that beginefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begin',
        _id: null,
        user_id: null,
        tag_id: null,
        is_published: false,
        created_at: 0,
      },
      heartShow: false,
      bookmarkShow: false,
      likes: 0,
      collects: 0,
    };
  },
  async mounted() {
    // this.post = await getPost(this.postId);
    // this.calcProgress();
  },
  methods: {
    // calcProgress() {
    //   const { contentEl } = this.$refs;
    //   const fullHeight = contentEl.scrollHeight;
    //   const viewHeight = contentEl.offsetHeight;
    //   const scrollPosition = contentEl.scrollTop;
    //   const progressValue = ((scrollPosition + viewHeight) / fullHeight) * 100;
    //   const progressValuePercentage = `${100 - progressValue}%`;
    //   this.progress = progressValuePercentage;
    // },
    modifyHeartState() {
      this.heartShow = !this.heartShow;
      this.likes = (this.heartShow) ? this.likes + 1 : this.likes - 1;
    },
    modifyBookmarkState() {
      this.bookmarkShow = !this.bookmarkShow;
      this.collects = (this.bookmarkShow) ? this.collects + 1 : this.collects - 1;
    },
  },
};
</script>

<style scoped>

.like-collect {
  /* background-color: rgb(171, 211, 250); */
}
.article {
  /* background-color: rgb(233, 138, 14); */
}
.list {
  /* background-color: rgb(250, 171, 208); */
}
.likes {
  font-size: 1.5rem;
}
.sticky-offset {
  top: 9%;
}
.background {
  background-color: lightgrey;
}
</style>
