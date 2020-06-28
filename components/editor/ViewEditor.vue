<template>
  <client-only>
    <editor-content
      ref="editor"
      class="editor__content"
      :editor="editor"
      :style="{ fontSize }"
    />
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
    fontSize: {
      type: String,
      default: '21px',
    },
  },
  data() {
    return {
      editor: null,
      contentObj: '',
    };
  },
  watch: {
    contentData: {
      immediate: true,
      handler(contentData) {
        if (Object.prototype.hasOwnProperty.call(contentData, 'type')
          && Object.prototype.hasOwnProperty.call(contentData, 'content')) {
          this.contentObj = contentData;
          if (this.editor !== null) {
            this.editor.setContent(contentData);
          }
        }
      },
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions,
      content: this.contentObj,
      editable: false,
    });
  },
};
</script>

<style src="@/assets/css/editor-content.css" scoped>
</style>
