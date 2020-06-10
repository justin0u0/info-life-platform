<template>
  <no-ssr>
    <editor-content ref="editor" class="editor__content" :editor="editor" />
  </no-ssr>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import {
  CodeBlockHighlight,
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
  // Placeholder,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';

export default {
  name: 'EditorModifyPostEditor',
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
        }
      },
    },
  },
  mounted() {
    const { onUpdate } = this;
    this.editor = new Editor({
      extensions: [
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            python,
          },
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
      ],
      content: '',
      onUpdate,
    });
  },
  methods: {
    onUpdate() {
      // console.log('[ModifyPostEditor:onUpdate]');
      this.$emit('update:contentData', this.editor.getJSON());
    },
  },
};
</script>

<style scoped>
</style>
