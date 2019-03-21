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

JSMD is a text container created to mix JS, Markdown, LaTeX and any other
text format in one file. It's developed by Mozilla for
[Iodide](https://iodide-project.github.io) project.

%% js

console.log('This part of JS mixed with markdown');
`);
```

Method `parse` returns an array of Chunks. Each Chunk has properties `type`, `flags`,
`index`, `startLine`, `endLine` and `content`.

## License

MIT © [Rumkin](https://rumk.in)
