const jsmd = require('.');

const chunks = jsmd.parse(`
%% js --react
console.log('Hello world');
%% html
<html></html>
%% empty
%% fetch
https://unpkg.com/jsmd-parser/parser.js
`);

console.log(chunks);
