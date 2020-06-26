
import { CodeBlockHighlight } from 'tiptap-extensions';

import cLike from 'highlight.js/lib/languages/c-like';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import r from 'highlight.js/lib/languages/r';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import csharp from 'highlight.js/lib/languages/csharp';


const codeBlockHighlight = new CodeBlockHighlight({
  languages: {
    cLike,
    css,
    javascript,
    python,
    go,
    php,
    sql,
    swift,
    r,
    java,
    json,
    csharp,
  },
});

export default codeBlockHighlight;
