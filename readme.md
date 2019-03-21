# JSMD Parser

Mozilla's [JSMD](https://iodide-project.github.io/docs/jsmd/) format standalone parser.

## Usage

```shell
npm i jsmd-parser
```

Use parser:
```javascript
const jsmd = require('jsmd-parser');

const chunks = jsmd.parse(`
%% markdown
# JSMD

JSMD is a text container created to mix JS, Markdown, LaTeX and any other text
format in one file. It was originally developed by Mozilla for scientific
noteboks project [Iodide](https://iodide-project.github.io).

%% js

console.log('This is a part of JS mixed with markdown');
`);
```

Method `parse` returns an array of Chunks. Each Chunk has properties `type`, `flags`,
`content`, `startLine`, `endLine` and `index`.

## License

MIT © [Rumkin](https://rumk.in)
