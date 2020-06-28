<template>
  <div class="toc">
    <ul v-for="({ level, text, idx }, index) in catalog" :key="index" class="H1">
      <li v-if="level === 'h1'" class="header-text" @click="scrollToHeader('h1', idx)">{{ text }}</li>
      <ul v-if="level === 'h2'" class="pl-3 H2">
        <li class="header-text" @click="scrollToHeader('h2', idx)">{{ text }}</li>
      </ul>
      <ul v-if="level === 'h3'" class="pl-3 H3">
        <ul class="pl-3">
          <li class="header-text" @click="scrollToHeader('h3', idx)">{{ text }}</li>
        </ul>
      </ul>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'TableOfContent',
  props: {
    contentData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      catalog: [],
      currentPosition: 0,
      h1Index: 1,
      h2Index: 1,
      h3Index: 0,
    };
  },
  watch: {
    contentData: {
      immediate: true,
      handler(contentData) {
        if (Object.prototype.hasOwnProperty.call(contentData, 'type')
          && Object.prototype.hasOwnProperty.call(contentData, 'content')) {
          this.fetchHeadingType();
        }
      },
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchHeadingType() {
      const heading = this.contentData.content.filter((datum) => datum.type === 'heading');
      for (let i = 0; i < Object.keys(heading).length; i += 1) {
        if (heading[i].attrs.level === 1) {
          this.catalog.push({ level: 'h1', text: heading[i].content[0].text, idx: this.h1Index });
          this.h1Index += 1;
        } else if (heading[i].attrs.level === 2) {
          this.catalog.push({ level: 'h2', text: heading[i].content[0].text, idx: this.h2Index });
          this.h2Index += 1;
        } else { // heading[i].attrs.level === 3
          this.catalog.push({ level: 'h3', text: heading[i].content[0].text, idx: this.h3Index });
          this.h3Index += 1;
        }
      }
    },
    scrollToHeader(tag, idx) {
      const HeaderPositionData = document.getElementsByTagName(tag)[idx].getClientRects()[0];
      window.scrollTo({
        top: this.currentPosition + HeaderPositionData.y - HeaderPositionData.height,
        left: HeaderPositionData.left,
        behavior: 'smooth',
      });
    },
    handleScroll(e) {
      this.currentPosition = e.target.scrollingElement.scrollTop;
    },
  },
};
</script>

<style scoped>
.header-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  list-style-position: inside;
  overflow: hidden;
}
ul {
  list-style-type: initial;
  cursor: pointer;
  line-height: 1rem;
}
ul:hover {
  color: blue;
}
.H1 {
  font-size: 1.2rem;
}
.H2 {
  font-size: 1.1rem;
}
.H3 {
  font-size: 1rem;
}
.toc {
  position: fixed;
  max-width: 165px;
}
</style>
