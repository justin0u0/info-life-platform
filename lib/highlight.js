
import { CodeBlockHighlight } from 'tiptap-extensions';

import cLike from 'highlight.js/lib/languages/c-like';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

const codeBlockHighlight = new CodeBlockHighlight({
  languages: {
    cLike,
    css,
    javascript,
    python,
  },
});

export default codeBlockHighlight;
