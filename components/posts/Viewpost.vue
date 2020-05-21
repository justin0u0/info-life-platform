<template>
  <div ref="contentEl" class="container" @scroll="calcProgress()">
    <div class="reading-progress" :style="{right:progress}"></div>
    <div class="row">
      <div class="like-collect">
        <el-button>
          收藏
        </el-button>
        <el-button>
          按讚
        </el-button>
      </div>
      <div class="article">
        <div class="title">
          {{ post.title }}
        </div>
        <div class="subtitle">
          {{ post.subtitle }}
        </div>
        <div class="content">
          {{ post.content }}
        </div>
      </div>
      <div class="list">
        TOC
      </div>
    </div>
  </div>
</template>

<script>
// import { getPost } from '@/api/post';

export default {
  props: {
    postId: {
      type: Number,
      required: true,
      default: () => ([]),
    },
  },
  data() {
    return {
      progress: '100%',
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
    };
  },
  async mounted() {
    // this.post = await getPost(this.postId);
    this.calcProgress();
  },
  methods: {
    calcProgress() {
      const { contentEl } = this.$refs;
      const fullHeight = contentEl.scrollHeight;
      const viewHeight = contentEl.offsetHeight;
      const scrollPosition = contentEl.scrollTop;
      const progressValue = ((scrollPosition + viewHeight) / fullHeight) * 100;
      const progressValuePercentage = `${100 - progressValue}%`;
      this.progress = progressValuePercentage;
    },
  },
};
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 100vw;
    margin: 0 auto;
    overflow-y: scroll;
    height: 100vh;
}
.row {
    display: flex;
}
.like-collect {
    background-color: rgb(171, 211, 250);
    display: flex;
    text-align: center;
    align-items: center;
    flex: 2;
}
el-button {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.article {
    background-color: rgb(233, 138, 14);
    flex: 8;
}
.list {
    background-color: rgb(250, 171, 208);
    flex: 2;
}
.title {
    background-color: chocolate;
    text-align: center;
    font-size: 4rem;
    font-weight: bold;
}
.subtitle {
    background-color: darkgreen;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
}
.content {
    font-size: 1.5rem;
}
.reading-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  /* background-color: #41b883; */
  transition: right 0.5s ease;
  background-image: linear-gradient(to right, #cce0ff, #0047b3);
}
</style>
