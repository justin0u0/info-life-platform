<template>
  <div class="container create-post-container">
    <div class="title-container">
      <h1>新增文章</h1>
    </div>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="標題：">
        <el-input
          v-model="formData.title"
          type="textarea"
          placeholder="請輸入標題"
          maxlength="100"
          show-word-limit
          resize="none"
          rows="2"
        />
      </el-form-item>
      <el-form-item label="副標題：">
        <el-input
          v-model="formData.subtitle"
          type="textarea"
          placeholder="請輸入副標題"
          maxlength="200"
          show-word-limit
          rows="4"
        />
      </el-form-item>
      <el-form-item label="分類：">
        <el-select v-model="formData.tag_id" placeholder="選擇類別">
          <el-option
            v-for="tag in tags"
            :key="tag._id"
            :label="tag.name"
            :value="tag._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="內容：">
        <CreatePostEditor
          ref="editor"
          class="editor-container"
          :class="{ 'editor-focus': editorFocus }"
          @click.native="handleEditorClick"
          @editor-focus="handleEditorFocus"
          @editor-blur="handleEditorBlur"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTags } from '@/api/tag';
import CreatePostEditor from '@/components/editor/CreatePostEditor.vue';

export default {
  name: 'PostCreatePost',
  components: {
    CreatePostEditor,
  },
  data() {
    return {
      formData: {
        title: '',
        subtitle: '',
        tag_id: null,
      },
      tags: [],
      editorFocus: false,
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
      const { data } = await getTags({ filter: { type: 'post' }, sort: { _id: 1 } });
      this.tags = data;
    },
    handleEditorClick() {
      this.$refs.editor.handleEditorClick();
    },
    handleEditorFocus() {
      this.editorFocus = true;
    },
    handleEditorBlur() {
      this.editorFocus = false;
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .create-post-container {
    min-width: 100%;
  }
}
.title-container {
  padding-left: 100px;
  margin-bottom: 30px;
}
.title-container h1 {
  font-size: 24px;
  color: #232323;
}
.editor-container {
  width: 100%;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 2em;
  cursor: text;
}
.editor-focus {
  outline: 0;
  border-color: #409eff;
}
</style>
