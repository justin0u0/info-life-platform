<template>
  <div class="container">
    <div class="row">
      <div class="like-collect col-2 d-flex justify-content-center align-items-center flex-column">
        <div v-if="heartShow" @click="heartShow=!heartShow">
          <font-awesome-icon :icon="['far', 'heart']" size="3x" :style="{color: 'black'}" />
        </div>
        <div v-if="!heartShow" @click="heartShow=!heartShow">
          <font-awesome-icon :icon="['fas', 'heart']" size="3x" :style="{color: 'black'}" />
        </div>
        <div v-if="bookmarkShow" @click="bookmarkShow=!bookmarkShow">
          <font-awesome-icon :icon="['far', 'bookmark']" size="3x" :style="{color: 'black'}" />
        </div>
        <div v-if="!bookmarkShow" @click="bookmarkShow=!bookmarkShow">
          <font-awesome-icon :icon="['fas', 'bookmark']" size="3x" :style="{color: 'black'}" />
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
        content: 'The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend The indefinite article takes two forms. It’s the word a when it precedes a word that begins with a consonant. It’s the word an when it precedes a word that begins with a vowel. The indefinite article indicates that a noun refers to a general idea rather than a particular thing. For example, you might ask your friend, “Should I bring a gift to the party?” Your friend',
        _id: null,
        user_id: null,
        tag_id: null,
        is_published: false,
        created_at: 0,
      },
      heartShow: true,
      bookmarkShow: true,
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
  },
};
</script>

<style scoped>

.like-collect {
    background-color: rgb(171, 211, 250);
}
.article {
  background-color: rgb(233, 138, 14);
}
.list {
  background-color: rgb(250, 171, 208);
}
</style>
