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
%% js
console.log('Hello world');
`);
```

Method `parse` returns an array of Chunks. Each Chunk has properties `id`, `type`, `flags`,
`index`, `startLine`, `endLine` and `content`.

## License

MIT © [Rumkin](https://rumk.in)
