/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/MyUtil.js":
/*!**************************!*\
  !*** ./public/MyUtil.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShowLoggedInUserInfo\": () => (/* binding */ ShowLoggedInUserInfo)\n/* harmony export */ });\nfunction ShowLoggedInUserInfo(){\r\n    var uLabel = document.querySelector(\".usernameProfileLabel\");\r\n    uLabel.textContent = sessionStorage.getItem(\"currentUser\");\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvTXlVdGlsLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9NeVV0aWwuanM/YzgwMSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gU2hvd0xvZ2dlZEluVXNlckluZm8oKXtcclxuICAgIHZhciB1TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lUHJvZmlsZUxhYmVsXCIpO1xyXG4gICAgdUxhYmVsLnRleHRDb250ZW50ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/MyUtil.js\n");

/***/ }),

/***/ "./public/account-edit.js":
/*!********************************!*\
  !*** ./public/account-edit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MyUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyUtil */ \"./public/MyUtil.js\");\n\r\nwindow.addEventListener(\"load\", () => {\r\n    //Updates the title based on which account the user navigated from.\r\n    document.querySelector(\"#accountEditHeader\").innerHTML = window.sessionStorage.getItem(\"accountAnchorName\") + \" Ledger\";\r\n    (0,_MyUtil__WEBPACK_IMPORTED_MODULE_0__.ShowLoggedInUserInfo)();\r\n})\r\n\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvYWNjb3VudC1lZGl0LmpzLmpzIiwibWFwcGluZ3MiOiI7O0FBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLElBQUksNkRBQW9CO0FBQ3hCLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvYWNjb3VudC1lZGl0LmpzPzYyMTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hvd0xvZ2dlZEluVXNlckluZm8gfSBmcm9tIFwiLi9NeVV0aWxcIjtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgIC8vVXBkYXRlcyB0aGUgdGl0bGUgYmFzZWQgb24gd2hpY2ggYWNjb3VudCB0aGUgdXNlciBuYXZpZ2F0ZWQgZnJvbS5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWNjb3VudEVkaXRIZWFkZXJcIikuaW5uZXJIVE1MID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJhY2NvdW50QW5jaG9yTmFtZVwiKSArIFwiIExlZGdlclwiO1xyXG4gICAgU2hvd0xvZ2dlZEluVXNlckluZm8oKTtcclxufSlcclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/account-edit.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/account-edit.js");
/******/ 	
/******/ })()
;