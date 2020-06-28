<template>
  <el-card class="table-of-content" :class="{ 'fully-disappear': !visibleDelay }">
    <div slot="header" class="d-flex align-items-center">
      <span v-show="visibleDelay">Content</span>
      <i
        v-if="visible"
        class="operation-icon ml-auto el-icon-d-arrow-right"
        @click="handleToggleVisible"
      />
      <i
        v-else
        class="operation-icon ml-auto el-icon-d-arrow-left"
        @click="handleToggleVisible"
      />
    </div>
    <transition name="headings">
      <div v-show="visible">
        <div
          v-for="({ level, text, idx }, index) in catalog"
          :key="index"
          class="heading"
        >
          <span
            v-if="level === 1"
            class="level1"
            @click="scrollToHeader('h1', idx)"
          >
            •&nbsp;{{ text }}
          </span>
          <span
            v-else-if="level === 2"
            class="level2"
            @click="scrollToHeader('h2', idx)"
          >
            •&nbsp;{{ text }}
          </span>
          <span
            v-else
            class="level3"
            @click="scrollToHeader('h3', idx)"
          >
            •&nbsp;{{ text }}
          </span>
        </div>
      </div>
    </transition>
  </el-card>
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
      headingsIndex: [null, 1, 1, 0],
      visible: true,
      visibleDelay: true,
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
  methods: {
    fetchHeadingType() {
      this.headingsIndex = [null, 1, 1, 0];
      const headings = this.contentData.content.filter((datum) => datum.type === 'heading');
      for (let i = 0; i < headings.length; i += 1) {
        const { attrs, content } = headings[i];
        const { level } = attrs;
        const { text } = content[0];
        this.catalog.push({ level, text, idx: this.headingsIndex[level] });
        this.headingsIndex[level] += 1;
      }
    },
    scrollToHeader(tag, idx) {
      const headingPosition = document.getElementsByTagName(tag)[idx].getClientRects()[0];
      window.scrollTo({
        top: window.scrollY + headingPosition.y - headingPosition.height,
        left: headingPosition.left,
        behavior: 'smooth',
      });
    },
    handleToggleVisible() {
      this.visible = !this.visible;
      if (!this.visible) {
        setTimeout(() => {
          this.visibleDelay = !this.visibleDelay;
        }, 300);
      } else {
        this.visibleDelay = !this.visibleDelay;
      }
    },
  },
};
</script>

<style scoped>
/* Table of content */
.table-of-content {
  position: fixed;
  top: 70px;
  right: 10px;
  max-width: 260px;
  font-size: 20px;
  font-weight: 600;
  color: #2f2f2f;
}
.table-of-content.fully-disappear /deep/ .el-card__body {
  display: none;
}

.heading {
  width: 100%;
  color: #232323;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
}
.heading:hover {
  cursor: pointer;
  color: #409fff;
}

span.level1 {
  font-size: 1em;
  letter-spacing: -0.05em;
}

span.level2 {
  font-size: 0.9em;
  padding-left: 1.3rem;
  letter-spacing: -0.05em;
}

span.level3 {
  font-size: 0.8em;
  padding-left: 2rem;
  letter-spacing: -0.05em;
}

.operation-icon {
  cursor: pointer;
}
.operation-icon:hover {
  cursor: pointer;
  color: #409fff;
}

.headings-enter-active,
.headings-leave-active {
  transition: max-height 0.3s ease-in;
  max-height: 500px;
}
.headings-enter,
.headings-leave-to {
  max-height: 0;
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}
</style>
