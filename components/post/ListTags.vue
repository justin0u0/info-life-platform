<template>
  <div class="tag-lists">
    <div
      :class="{ active: (currentTag === null) }"
      @click="handleTagClick()"
    >
      全部
    </div>
    <div
      v-for="tag in tags"
      :key="tag._id"
      :class="{ active: (currentTag === tag._id) }"
      @click="handleTagClick(tag._id)"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
import { getTags } from '@/api/tag';

export default {
  name: 'PostListTags',
  props: {
    tagType: {
      type: String,
      required: true,
    },
    currentTag: {
      required: true,
      validator: (prop) => typeof prop === 'string' || prop === null,
    },
  },
  data() {
    return {
      tags: [],
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetTags(),
    ]);
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetTags() {
      const res = await getTags({ filter: { type: this.tagType }, sort: { _id: 1 } });
      this.tags = res.data;
    },
    handleTagClick(tagId = null) {
      console.log('[PostListTags:handleTagClick]: ', tagId);
      this.$emit('tag-click', tagId);
    },
  },
};
</script>

<style scoped>
.tag-lists {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
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

@media (max-width: 768px) {
  .tag-lists div {
    width: 33.33%;
    text-align: center;
  }
  .tag-lists div:not(:first-child) {
    margin-left: 0px;
  }
}
</style>
