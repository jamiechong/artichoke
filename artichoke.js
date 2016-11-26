#!/usr/bin/env node
"use strict";
var program = require('commander');
var x = 'abcdefghijklmnopqrstuvwxyz_';
var matrix = [];
for (let i=0; i<x.length; i++) {
  let cols = [];
  for (let j=0; j<x.length; j++) {
    cols.push(x[(j+i)%x.length]);
  }
  matrix.push(cols);
}

function encode(phrase, keyword='artichoke') {
  let result = [];
  for (let i=0; i<phrase.length; i++) {
    let c = phrase[i];
    let r = keyword[i%keyword.length];
    let row = x.indexOf(r);
    let col = (x.indexOf(c)+1)%x.length;
    result.push(matrix[row][col]);
  }
  return result.join('');
}

function decode(phrase, keyword='artichoke') {
  let result = [];
  for (let i=0; i<phrase.length; i++) {
    let c = phrase[i];
    let r = keyword[i%keyword.length];
    let row = x.indexOf(r);

    for (var p=0; p<matrix[row].length; p++) {
      if (matrix[row][p] == c) {
        break;
      }
    }
    p = p-1; 
    if (p<0) {
      p = x.length-1; // handle negative -1
    }
    result.push(x[p]);
  }
  return result.join('');
}

program
  .option('-k, --keyword <keyword>', 'keyword to use. Default "artichoke"')
  .option('-e, --encode', 'encode the given phrase. Default')
  .option('-d, --decode', 'decode the given phrase')
  .arguments('<phrase>')
  .action((phrase) => {
    phrase = phrase.toLowerCase();
    if (program.decode) {
      console.log(decode(phrase, program.keyword));
    } else {
      console.log(encode(phrase, program.keyword));
    }
  })
.parse(process.argv);
