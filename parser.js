/* global self define */
(function(global) {
  function hashCode(str) {
    // this is an implementation of java's hashcode method
    // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    let hash = 0;
    let chr;
    if (str.length !== 0) {
      for (let i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
      }
    }
    return hash.toString();
  }

  class ParserState {
    constructor({makeHash = hashCode} = {}) {
      this.chunks = [];
      this.tail = [];
      this.current = null;
      this.line = 0;
      this.index = 0;
      this.makeHash = makeHash;
    }

    commit() {
      const chunk = this.current;
      chunk.commit();
      chunk.id = this.hashCode(chunk.content);
      this.chunks.push(chunk);
      this.current = null;
    }

    hashCode(str) {
      const hash = this.makeHash(str);
      let hashNum = '0';
      for (const chunk of this.chunks) {
        const [prevHash, prevHashNum] = chunk.id.split('_');
        if (hash === prevHash) {
          hashNum = (parseInt(prevHashNum, 10) + 1).toString();
        }
      }
      return `${hash}_${hashNum}`;
    }

    addLines(lines) {
      this.current.addLines(lines);
      this.line += lines.length;
      for (const line of lines) {
        this.index += line.length + 1;
      }
    }
  }

  class Chunk {
    constructor(type, flags, index, startLine) {
      this.type = type;
      this.flags = flags;
      this.index = index;
      this.startLine = startLine;
      this.endLine = startLine;
      this.content = '';
      this.lines = [];
    }

    addLines(lines) {
      this.lines.push(...lines);
      this.endLine += lines.length;
    }

    commit() {
      this.content = this.lines.join('\n');
      this.lines = [];
    }
  }

  function parseLines(state, input, isLast = true) {
    const lines = input.split('\n');
    let collected = [];
    lines.forEach(function (line) {
      if (line.slice(0, 2) === '%%') {
        if (collected.length && ! state.current) {
          state.current = new Chunk('', [], 0, 0);
        }

        if (state.current) {
          state.addLines(collected);
          state.commit();
          collected = [];
        }

        let lineColNum = 0;
        while (line[lineColNum] === '%') {
          lineColNum += 1;
        }
        const flags = line
        .slice(lineColNum)
        .split(/[ \t]+/)
        .filter(s => s !== '');

        state.current = new Chunk(
          flags[0],
          flags.slice(1),
          state.index,
          state.line,
        );

        state.index += line.length + 1;
      }
      else {
        collected.push(line);
      }
    });

    if (isLast) {
      state.addLines(collected);
      state.commit();
      state.tail = [];
    }
    else {
      state.tail.push(...collected);
    }

    return state;
  }

  function parse(string, options) {
    const parser = parseLines(new ParserState(options), string, true);

    return parser.chunks;
  }

  const jsmd = {};
  jsmd.ParserState = ParserState;
  jsmd.Chunk = Chunk;
  jsmd.parseLines = parseLines;
  jsmd.parse = parse;

  if (typeof module.exports === 'object') {
    module.exports = jsmd;
  }
  else if (typeof define === 'function' && define.amd) {
    define(function() {
      return jsmd;
    });
  }
  else {
    global.jsmd = jsmd;
  }
})(typeof self !== 'undefined' ? self : this);
