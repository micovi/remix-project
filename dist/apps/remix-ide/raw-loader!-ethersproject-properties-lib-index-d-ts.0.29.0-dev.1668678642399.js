(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["raw-loader!-ethersproject-properties-lib-index-d-ts"],{

/***/ "../../../node_modules/raw-loader/dist/cjs.js!../../../node_modules/@ethersproject/properties/lib/index.d.ts":
/*!*********************************************************************************************************************************************************************************!*\
  !*** /Users/ovi/Desktop/micovi/remix-project/node_modules/raw-loader/dist/cjs.js!/Users/ovi/Desktop/micovi/remix-project/node_modules/@ethersproject/properties/lib/index.d.ts ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("export declare function defineReadOnly<T, K extends keyof T>(object: T, name: K, value: T[K]): void;\nexport declare function getStatic<T>(ctor: any, key: string): T;\nexport declare type Deferrable<T> = {\n    [K in keyof T]: T[K] | Promise<T[K]>;\n};\nexport declare function resolveProperties<T>(object: Readonly<Deferrable<T>>): Promise<T>;\nexport declare function checkProperties(object: any, properties: {\n    [name: string]: boolean;\n}): void;\nexport declare function shallowCopy<T>(object: T): T;\nexport declare function deepCopy<T>(object: T): T;\nexport declare class Description<T = any> {\n    constructor(info: {\n        [K in keyof T]: T[K];\n    });\n}\n//# sourceMappingURL=index.d.ts.map");

/***/ })

}]);
//# sourceMappingURL=raw-loader!-ethersproject-properties-lib-index-d-ts.0.29.0-dev.1668678642399.js.map