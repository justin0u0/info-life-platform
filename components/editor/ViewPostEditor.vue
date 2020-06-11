<template>
  <client-only>
    <editor-content ref="editor" class="editor__content" :editor="editor" />
  </client-only>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import extensions from '@/lib/extensions';

export default {
  name: 'EditorViewPostEditor',
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
    this.editor = new Editor({
      extensions,
      content: '',
      editable: false,
    });
  },
};
</script>

<style scoped>
/* Header 1 */
.editor__content /deep/ h1 {
  margin-top: 1.95em;
  font-size: 34px;
  margin-bottom: -0.28em;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.022em;
  color: #292929;
}

/* Header 2 */
.editor__content /deep/ h2 {
  margin-top: 1.72em;
  font-size: 26px;
  margin-bottom: -0.31em;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: #292929;
}

/* Header 3 */
.editor__content /deep/ h3 {
  margin-top: 1.56em;
  font-size: 24px;
  margin-bottom: -0.36em;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: #292929;
}

/* Paragraph */
.editor__content /deep/ p {
  font-size: 21px;
  line-height: 32px;
  letter-spacing: -0.003em;
  word-break: break-word;
  color: #292929;
  font-weight: 400;
  margin-top: 0.86em;
  margin-bottom: -0.46em;
}
.editor__content /deep/ :first-child p {
  margin-top: 2em;
}

/* Inline Code */
.editor__content /deep/ p code {
  font-size: 75%;
  padding: 2px 4px;
  font-weight: 400;
}

/* Code Block */
.editor__content /deep/ pre {
  margin-top: 56px;
  overflow-x: auto;
  background-color: #303030;
}
</style>
