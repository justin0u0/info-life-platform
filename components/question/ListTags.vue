<template>
  <div class="tag-lists">
    <div
      v-for="tag in tags"
      :key="tag.id"
      :class="{ active: (currentTag.name === tag.name) }"
      @click="handleTagClick(tag)"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTag: {
      required: true,
      validator: (prop) => typeof prop === 'object' || prop === null,
    },
  },
  data() {
    return {
      tags: [
        // TODO: popular sort
        { name: '最新', filter: {}, sort: { updated_at: -1 } },
        { name: '熱門', filter: {}, sort: {} },
        { name: '未解決', filter: { is_solved: false }, sort: { created_at: -1 } },
        { name: '已解決', filter: { is_solved: true }, sort: { updated_at: -1 } },
      ],
    };
  },
  methods: {
    handleTagClick(tag) {
      this.$emit('tag-click', tag);
    },
  },
};
</script>

<style scoped>
.tag-lists {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.tag-lists div {
  color: #999;
  font-size: 20px;
  font-family: '微軟正黑體', sans-serif;
  font-weight: bold;
  letter-spacing: 0.1rem;
}
.tag-lists div:not(:first-child) {
  margin-left: 15px;
}
.tag-lists div:hover {
  color: #000;
  cursor: pointer;
}
.tag-lists .active {
  color: #000;
  font-weight: bolder;
}
</style>
