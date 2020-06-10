<template>
  <editor-content class="editor__content" :editor="editor" />
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
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
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
      content: this.contentObj,
      onUpdate({ getJSON }) {
        const content = getJSON();
        console.log(content);
      },
    });
  },
};
</script>

<style scoped>
</style>
