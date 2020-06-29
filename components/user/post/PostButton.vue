<template>
  <div>
    <a :href="`/post/modify/${postData._id}`">
      <el-button type="primary" plain class="mt-lg-2">
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['far', 'edit']" />
          <span class="ml-2">編輯</span>
        </div>
      </el-button>
    </a>
    <el-button
      type="success"
      plain
      class="mt-2"
      @click="handleTogglePostIsPublished"
    >
      <div class="d-flex align-items-center">
        <font-awesome-icon
          v-if="isPublished"
          :icon="['fas', 'folder-minus']"
        />
        <font-awesome-icon
          v-else
          :icon="['far', 'arrow-alt-circle-up']"
        />
        <span class="ml-2">
          {{ isPublished ? '取消發佈' : '發佈' }}
        </span>
      </div>
    </el-button>
    <el-button
      v-show="isPublished === false"
      type="danger"
      plain
      class="mt-2 ml-0"
      @click="handleDeletePost"
    >
      <div class="d-flex align-items-center">
        <font-awesome-icon
          :icon="['far', 'trash-alt']"
        />
        <span class="ml-2">
          刪除
        </span>
      </div>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'UserPostPostButton',
  props: {
    postData: {
      type: Object,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleTogglePostIsPublished() {
      this.$emit('toggle-is-published');
    },
    handleDeletePost() {
      this.$emit('delete-post');
    },
  },
};
</script>

<style scoped>

</style>
