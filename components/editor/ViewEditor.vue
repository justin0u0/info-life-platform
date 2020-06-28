<template>
  <client-only>
    <editor-content ref="editor" class="editor__content" :editor="editor" />
  </client-only>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import extensions from '@/lib/extensions';

export default {
  name: 'EditorViewEditor',
  components: {
    EditorContent,
  },
  props: {
    contentData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    contentData: {
      immediate: true,
      handler(contentData) {
        if (Object.prototype.hasOwnProperty.call(contentData, 'type')
          && Object.prototype.hasOwnProperty.call(contentData, 'content')
          && this.editor !== null) {
          this.editor.setContent(contentData);
          console.log(this.editor);
        }
      },
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions,
      content: '',
      editable: false,
    });
  },
};
</script>

<style src="@/assets/css/editor-content.css" scoped>
</style>
