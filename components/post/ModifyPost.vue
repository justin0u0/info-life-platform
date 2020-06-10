<template>
  <no-ssr>
    <div class="contents">
      <div class="input-group mb-3">
        <input type="title" class="form-control" placeholder="Title" maxlength="50" show-word-limit>
      </div>
      <div style="margin: 20px 0;"></div>
      <div class="editor-content mx-auto">
        <editor-content class="editor__content" :editor="editor" />
      </div>
      <div class="d-flex justify-content-end">
        <el-button class="save-button" type="primary" @click="handleModifyPost">Save</el-button>
      </div>
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
  // Placeholder,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';

export default {
  name: 'PostModifyPost',
  components: {
    EditorContent,
  },
  data() {
    return {
      post: {
        _id: '',
        user_id: null,
        tag_id: null,
        title: '',
        subtitle: '',
        content: '',
        is_published: null,
        created_at: null,
      },
      editor: null,
      contentObj: null,
    };
  },
  async mounted() {
    this.$store.dispatch('setIsProcessing', true);
    await Promise.all([
      this.preGetPost(),
    ]);
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
        this.contentObj = getJSON();
        // console.log(this.contentObj);
      },
    });
    this.$store.dispatch('setIsProcessing', false);
  },
  methods: {
    async preGetPost() {
      // const res = await getPost();
      const res = {
        _id: 1234,
        user_id: 13294823,
        tag_id: 10384928390,
        titie: 'hello',
        subtitle: 'hi',
        content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is some inserted text. 👋"}]}]}',
        is_published: true,
        created_at: 5678,
      };
      console.log('....');
      this.post = res;
      this.contentObj = JSON.parse(res.content);
    },
    async handleModifyPost() {
      // send to store on save
      const { type, content } = this.contentObj;
      const contentStr = JSON.stringify({ type, content });
      console.log('[handleModifyPost]: ', contentStr);
      // await modifyPost({ _id: this.post._id, content: contentStr });
    },
  },
};
</script>

<style scoped>
.contents {
  width: 60%;
}
.editor-content {
  border-style:ridge;
  border-width: 1px;
  border-color: gray;
  height: 464px !important;
  max-height: 464px !important;
  overflow-y: auto !important;
  width: 100%;
  font-size: 1.5rem;
}

textarea {
  resize: none;
}

#count_message {
  background-color: smoke;
  margin-top: -20px;
  margin-right: 5px;
}

.save-button {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

</style>
