(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pla-js"],{

/***/ "../../../node_modules/monaco-editor/esm/vs/basic-languages/pla/pla.js":
/*!************************************************************************************************************!*\
  !*** /Users/ovi/Desktop/micovi/remix-project/node_modules/monaco-editor/esm/vs/basic-languages/pla/pla.js ***!
  \************************************************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var conf = {
    comments: {
        lineComment: '#'
    },
    brackets: [
        ['[', ']'],
        ['<', '>'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '<', close: '>' },
        { open: '(', close: ')' }
    ],
    surroundingPairs: [
        { open: '[', close: ']' },
        { open: '<', close: '>' },
        { open: '(', close: ')' }
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.pla',
    brackets: [
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '<', close: '>', token: 'delimiter.angle' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
    keywords: [
        '.i',
        '.o',
        '.mv',
        '.ilb',
        '.ob',
        '.label',
        '.type',
        '.phase',
        '.pair',
        '.symbolic',
        '.symbolic-output',
        '.kiss',
        '.p',
        '.e',
        '.end'
    ],
    // regular expressions
    comment: /#.*$/,
    identifier: /[a-zA-Z]+[a-zA-Z0-9_\-]*/,
    plaContent: /[01\-~\|]+/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // comments and whitespace
            { include: '@whitespace' },
            [/@comment/, 'comment'],
            // keyword
            [
                /\.([a-zA-Z_\-]+)/,
                {
                    cases: {
                        '@eos': { token: 'keyword.$1' },
                        '@keywords': {
                            cases: {
                                '.type': { token: 'keyword.$1', next: '@type' },
                                '@default': { token: 'keyword.$1', next: '@keywordArg' }
                            }
                        },
                        '@default': { token: 'keyword.$1' }
                    }
                }
            ],
            // identifiers
            [/@identifier/, 'identifier'],
            // PLA row
            [/@plaContent/, 'string']
        ],
        whitespace: [[/[ \t\r\n]+/, '']],
        type: [{ include: '@whitespace' }, [/\w+/, { token: 'type', next: '@pop' }]],
        keywordArg: [
            // whitespace
            [
                /[ \t\r\n]+/,
                {
                    cases: {
                        '@eos': { token: '', next: '@pop' },
                        '@default': ''
                    }
                }
            ],
            // comments
            [/@comment/, 'comment', '@pop'],
            // brackets
            [
                /[<>()\[\]]/,
                {
                    cases: {
                        '@eos': { token: '@brackets', next: '@pop' },
                        '@default': '@brackets'
                    }
                }
            ],
            // numbers
            [
                /\-?\d+/,
                {
                    cases: {
                        '@eos': { token: 'number', next: '@pop' },
                        '@default': 'number'
                    }
                }
            ],
            // identifiers
            [
                /@identifier/,
                {
                    cases: {
                        '@eos': { token: 'identifier', next: '@pop' },
                        '@default': 'identifier'
                    }
                }
            ],
            // delimiter
            [
                /[;=]/,
                {
                    cases: {
                        '@eos': { token: 'delimiter', next: '@pop' },
                        '@default': 'delimiter'
                    }
                }
            ]
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=pla-js.0.29.0-dev.1668678642399.js.map