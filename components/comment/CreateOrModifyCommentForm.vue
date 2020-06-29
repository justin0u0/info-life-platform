<template>
  <el-form>
    <el-form-item>
      <CreateOrModifyEditor
        ref="editor"
        class="editor-container"
        :class="{ 'editor-focus': editorFocus }"
        @click.native="handleEditorClick"
        @editor-focus="handleEditorFocus"
        @editor-blur="handleEditorBlur"
      />
    </el-form-item>
    <div class="text-right">
      <el-button type="primary" @click="handleSubmit">留言</el-button>
    </div>
  </el-form>
</template>

<script>
import CreateOrModifyEditor from '@/components/editor/CreateOrModifyEditor.vue';

export default {
  name: 'CommentCreateOrModifyCommentForm',
  components: {
    CreateOrModifyEditor,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({
        contentObj: null,
      }),
    },
  },
  data() {
    return {
      editorFocus: false,
    };
  },
  methods: {
    setContent(content) {
      console.log('[CommentCreateOrModifyCommentForm:updateContent]');
      this.$refs.editor.setContent(content);
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
        content: contentStr,
      };
      this.$emit('submit', data);
    },
  },
};
</script>

<style scoped>
.editor-container {
  font-size: 16px;
  width: 100%;
  border: 1px solid #DCDFE6;
  background-color: white;
  border-radius: 4px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 2em;
  /* padding-top: 1em; */
  cursor: text;
}
.editor-focus {
  outline: 0;
  border-color:#409eff;
}
</style>
