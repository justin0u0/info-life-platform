
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

import highlight from './highlight';

const extensions = [
  new Blockquote(),
  new BulletList(),
  new CodeBlock(),
  new HardBreak(),
  new Heading({ levels: [1, 2, 3] }),
  new HorizontalRule(),
  new ListItem(),
  new OrderedList(),
  new TodoItem(),
  new TodoList(),
  new Bold(),
  new Code(),
  new Italic(),
  new Link(),
  new Strike(),
  new Underline(),
  new History(),
  highlight,
];

export default extensions;
