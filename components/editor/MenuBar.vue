<template>
  <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bold() }"
        @click.prevent="commands.bold"
      >
        <EditorIcon name="bold" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.italic() }"
        @click.prevent="commands.italic"
      >
        <EditorIcon name="italic" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.strike() }"
        @click.prevent="commands.strike"
      >
        <EditorIcon name="strike" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.underline() }"
        @click.prevent="commands.underline"
      >
        <EditorIcon name="underline" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.code() }"
        @click.prevent="commands.code"
      >
        <EditorIcon name="code" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.paragraph() }"
        @click.prevent="commands.paragraph"
      >
        <EditorIcon name="paragraph" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
        @click.prevent="commands.heading({ level: 1 })"
      >
        H1
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
        @click.prevent="commands.heading({ level: 2 })"
      >
        H2
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
        @click.prevent="commands.heading({ level: 3 })"
      >
        H3
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click.prevent="commands.bullet_list"
      >
        <EditorIcon name="ul" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click.prevent="commands.ordered_list"
      >
        <EditorIcon name="ol" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.code_block() }"
        @click.prevent="commands.code_block"
      >
        <EditorIcon name="code" />
      </button>

      <button
        class="menubar__button"
        @click.prevent="commands.horizontal_rule"
      >
        <EditorIcon name="hr" />
      </button>

      <button
        class="menubar__button"
        @click.prevent="commands.undo"
      >
        <EditorIcon name="undo" />
      </button>

      <button
        class="menubar__button"
        @click.prevent="commands.redo"
      >
        <EditorIcon name="redo" />
      </button>
    </div>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap';
import EditorIcon from '@/components/editor/Icon.vue';

export default {
  components: {
    EditorMenuBar,
    EditorIcon,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.menubar {
  border-bottom: 0.1px solid #dcdfe6;
}
</style>
