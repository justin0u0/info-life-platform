<template>
  <el-form ref="form" :model="formData" label-width="0px">
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
    <div class="button-container">
      <el-button type="primary" @click="handleSubmit">回答</el-button>
    </div>
  </el-form>
</template>

<script>
import CreateOrModifyEditor from '@/components/editor/CreateOrModifyEditor.vue';

export default {
  name: 'QuestionCreateOrModifyAnswerForm',
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
      console.log('[QuestionCreateOrModifyAnswerForm:updateContent]');
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
  background-color: white;
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
