<template>
  <client-only>
    <div>
      <EditorMenuBar :editor="editor" />
      <editor-content ref="editor" class="editor__content" :editor="editor" />
    </div>
  </client-only>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import extensions from '@/lib/extensions';
import EditorMenuBar from '@/components/editor/MenuBar.vue';

export default {
  name: 'EditorCreatePostEditor',
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    const onFocus = this.handleEditorFocus;
    const onBlur = this.handleEditorBlur;
    this.editor = new Editor({
      extensions,
      content: '',
      onFocus,
      onBlur,
    });
  },
  methods: {
    handleEditorClick() {
      this.editor.focus();
    },
    handleEditorFocus() {
      this.$emit('editor-focus');
    },
    handleEditorBlur() {
      this.$emit('editor-blur');
    },
  },
};
</script>

<style src="@/assets/css/editor-content.css" scoped>
</style>

<style scoped>
.editor__content {
  height: 100%;
  max-height: 100%;
  padding-bottom: 2em;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
