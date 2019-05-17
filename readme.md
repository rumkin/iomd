# IOMD Parser

Mozilla's [IOMD](https://iodide-project.github.io/docs/iomd/) format standalone parser.

## Usage

```shell
npm i iomd
```

Use parser:
```javascript
const iomd = require('iomd');

const chunks = iomd.parse(`
%% markdown
# IOMD

IOMD is a text container created to mix JS, Markdown, LaTeX and any other text
format in one file. It was originally developed by Mozilla for scientific
notebooks project [Iodide](https://iodide-project.github.io).

%% js

console.log('This is a part of JS mixed with markdown');
`);
```

Method `parse` returns an array of Chunks. Each Chunk has properties `type`, `flags`,
`content`, `startLine`, `endLine` and `index`.

## License

MIT © [Rumkin](https://rumk.in)
