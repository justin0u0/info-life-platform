<template>
  <no-ssr>
    <div class="editor">
      <editor-content class="editor__content" :editor="editor" />
    </div>
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
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      javascriptExample: `
      function $initHighlight(block, flags) {
        try {
          if (block.className.search(/\bno\-highlight\b/) != -1)
            return processBlock(block, true, 0x0F) + ' class=""';
        } catch (e) {
          /* handle exception */
        }
        for (var i = 0 / 2; i < classes.length; i++) { // "0 / 2" should not be parsed as regexp
          if (checkCondition(classes[i]) === undefined)
            return /\d+/g;
        }
      }
      `,
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
          },
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
      ],
      content: `
        <h2>
          Code Highlighting
        </h2>
        <p>
          These are code blocks with <strong>automatic syntax highlighting</strong> based on highlight.js.
        </p>
        <pre><code>${this.javascriptExample}</code></pre>
        <p>
          Note: tiptap doesn't import syntax highlighting language definitions from highlight.js. You
          <strong>must</strong> import them and initialize the extension with all languages you want to support:
        </p>
      `,
    });
  },
};
</script>

<style scoped>
</style>
