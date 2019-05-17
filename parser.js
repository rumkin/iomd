/* global self define */
(function(global) {
  class ParserState {
    constructor() {
      this.chunks = [];
      this.tail = [];
      this.current = null;
      this.line = 0;
      this.index = 0;
    }

    commit() {
      const chunk = this.current;
      chunk.commit();
      this.chunks.push(chunk);
      this.current = null;
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

  function parse(string) {
    const parser = parseLines(new ParserState(), string, true);

    return parser.chunks;
  }

  const iomd = {};
  iomd.ParserState = ParserState;
  iomd.Chunk = Chunk;
  iomd.parseLines = parseLines;
  iomd.parse = parse;

  if (typeof module.exports === 'object') {
    module.exports = iomd;
  }
  else if (typeof define === 'function' && define.amd) {
    define(function() {
      return iomd;
    });
  }
  else {
    global.iomd = iomd;
  }
})(typeof self !== 'undefined' ? self : this);
