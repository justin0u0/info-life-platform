<template>
  <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
    <el-form-item label="標題：" prop="title">
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
    <el-form-item label="副標題：" prop="subtitle">
      <el-input
        v-model="formData.subtitle"
        type="textarea"
        placeholder="請輸入副標題"
        maxlength="200"
        show-word-limit
        rows="4"
      />
    </el-form-item>
    <el-form-item label="分類：" prop="tag_id">
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
    <div class="button-container">
      <el-button type="primary" @click="handleSubmit">確認送出</el-button>
    </div>
  </el-form>
</template>

<script>
import { getTags } from '@/api/tag';
import CreatePostEditor from '@/components/editor/CreatePostEditor.vue';

export default {
  name: 'PostCreateOrModifyPostForm',
  components: {
    CreatePostEditor,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({
        title: '',
        subtitle: '',
        tag_id: null,
        contentObj: null,
      }),
    },
    isCreating: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '請輸入標題', trigger: 'blur' },
        ],
        subtitle: [
          { required: true, message: '請輸入副標題', trigger: 'blur' },
        ],
        tag_id: [
          { required: true, message: '請選擇分類', trigger: 'change' },
        ],
      },
      editorFocus: false,
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
    handleSubmit() {
      const contentObj = this.$refs.editor.getJSON();
      const { type, content } = contentObj;
      const contentStr = JSON.stringify({ type, content });
      const data = {
        title: this.formData.title,
        subtitle: this.formData.subtitle,
        tag_id: this.formData.tag_id,
        content: contentStr,
      };
      this.$emit('submit', data);
    },
    async validateForm() {
      const isValid = await new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) resolve(true);
          else resolve(false);
        });
      });
      return isValid;
    },
  },
};
</script>

<style scoped>
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

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-left: 100px;
}
</style>
