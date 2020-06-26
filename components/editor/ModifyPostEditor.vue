<template>
  <client-only>
    <editor-content ref="editor" class="editor__content" :editor="editor" />
  </client-only>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import extensions from '@/lib/extensions';

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
    this.editor = new Editor({
      extensions,
      content: '',
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

<style src="@/assets/css/editor-content.css" scoped>
</style>
