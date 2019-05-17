const iomd = require('.');

const chunks = iomd.parse(`
%% js --react
console.log('Hello world');
%% html
<html></html>
%% empty
%% fetch
https://unpkg.com/iomd-parser/parser.js
`);

console.log(chunks);
