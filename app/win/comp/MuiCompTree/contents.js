'use strict'

const tabbedText = `
ROOT
\tNODE ONE
\t\tLEAF A
\t\tNODE TWO
\t\t\tLEAF C
\t\t\tNODE FOUR
\t\t\t\tLEAF G
\t\t\t\tLEAF B
\tNODE THREE
\t\tLEAF D
\tLEAF E
\tLEAF F
`

/* TREE
0 'ROOT'
1   'GROUP ONE'
2     'LEAF AAA'
3   'GROUP TWO'
4     'LEAF BBB'
5     'LEAF CCC'
6   'GROUP THREE'
*/
// ---> TreeConv.js
let sampleTree = [
  {// 0
    // tree root
    depth: 0,
    children: [1, 3, 6],
    title: 'ROOT'
  },
  {// 1
    depth: 1,
    children: [2], // folder ( leaf for 'undefined' )
    parentIndex: 0,
    title: 'GROUP ONE'
  },
  {// 2
    depth: 2,
    parentIndex: 1,
    title: 'LEAF AAA'
  },
  {// 3
    depth: 1,
    children: [4, 5],
    parentIndex: 0,
    title: 'GROUP TWO'
  },
  {// 4
    depth: 2,
    parentIndex: 3,
    title: 'LEAF BBB'
  },
  {// 5
    depth: 2,
    parentIndex: 3,
    title: 'LEAF CCC'
  },
  {// 6
    depth: 1,
    children: [], // EMPTY FOLDER (NOT A LEAF)
    parentIndex: 0,
    title: 'GROUP THREE'
  }
]

module.exports.tabbedText = tabbedText
module.exports.sampleTree = sampleTree
