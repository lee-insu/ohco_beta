"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./service/location.js":
/*!*****************************!*\
  !*** ./service/location.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleGeoSuccess\": function() { return /* binding */ handleGeoSuccess; },\n/* harmony export */   \"defaultGeo\": function() { return /* binding */ defaultGeo; }\n/* harmony export */ });\n/* harmony import */ var _Users_insu_Desktop_coding_ohco_beta_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _Users_insu_Desktop_coding_ohco_beta_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_insu_Desktop_coding_ohco_beta_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\n\n\nvar handleGeoSuccess = function() {\n    var _ref = _asyncToGenerator(_Users_insu_Desktop_coding_ohco_beta_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(position) {\n        var lat, lon, weatherApi, location;\n        return _Users_insu_Desktop_coding_ohco_beta_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n            while(1)switch(_ctx.prev = _ctx.next){\n                case 0:\n                    lat = position.coords.latitude;\n                    lon = position.coords.longitude;\n                    weatherApi = \"d204c51cb9b8524512e502b2099ec5f6\";\n                    _ctx.next = 5;\n                    return axios__WEBPACK_IMPORTED_MODULE_1___default().all([\n                        axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=\".concat(lon, \"&y=\").concat(lat), {\n                            headers: {\n                                Authorization: \"KakaoAK 098c5ee096d1cd501fde6feb559cc861\"\n                            }\n                        }),\n                        axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"https://api.openweathermap.org/data/2.5/forecast/daily?lat=\".concat(lat, \"&lon=\").concat(lon, \"&cnt=2&appid=\").concat(weatherApi)), \n                    ]);\n                case 5:\n                    location = _ctx.sent;\n                    return _ctx.abrupt(\"return\", location);\n                case 7:\n                case \"end\":\n                    return _ctx.stop();\n            }\n        }, _callee);\n    }));\n    return function handleGeoSuccess(position) {\n        return _ref.apply(this, arguments);\n    };\n}();\nvar defaultGeo = function() {\n    var weatherApi = \"d204c51cb9b8524512e502b2099ec5f6\";\n    var location = axios__WEBPACK_IMPORTED_MODULE_1___default().all([\n        axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.04020267241&y=37.547076399306\", {\n            headers: {\n                Authorization: \"KakaoAK 098c5ee096d1cd501fde6feb559cc861\"\n            }\n        }),\n        axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"https://api.openweathermap.org/data/2.5/forecast/daily?lat=36.8166117&lon=127.1580958&cnt=2&appid=\".concat(weatherApi)), \n    ]);\n    return location;\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlL2xvY2F0aW9uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QjtBQUV6QixHQUFLLENBQUNDLGdCQUFnQjtpTEFBRyxRQUFRLFNBQURDLFFBQVEsRUFBSyxDQUFDO1lBQ3RDQyxHQUFHLEVBQ0hDLEdBQUcsRUFDSEMsVUFBVSxFQUVWQyxRQUFROzs7O29CQUpSSCxHQUFHLEdBQUdELFFBQVEsQ0FBQ0ssTUFBTSxDQUFDQyxRQUFRLENBQUM7b0JBQy9CSixHQUFHLEdBQUdGLFFBQVEsQ0FBQ0ssTUFBTSxDQUFDRSxTQUFTLENBQUM7b0JBQ2hDSixVQUFVLEdBQUdLLGtDQUFtQyxDQUFDOzsyQkFFaENWLGdEQUFTLENBQUMsQ0FBQzt3QkFDaENBLGdEQUFTLENBQ04sQ0FBNEQsOERBQVdHLE1BQUcsQ0FBWkMsR0FBRyxFQUFDLENBQUcsTUFBTSxPQUFKRCxHQUFHLEdBQzNFLENBQUM7NEJBQ0NZLE9BQU8sRUFBRSxDQUFDO2dDQUNSQyxhQUFhLEVBQUVOLDBDQUFtQzs0QkFDcEQsQ0FBQzt3QkFDSCxDQUFDO3dCQUVIVixnREFBUyxDQUNOLENBQTJELDZEQUFhSSxNQUFHLENBQWRELEdBQUcsRUFBQyxDQUFLLFFBQXFCRSxNQUFVLENBQTdCRCxHQUFHLEVBQUMsQ0FBYSxnQkFBYSxPQUFYQyxVQUFVO29CQUUxRyxDQUFDOztvQkFaS0MsUUFBUSxZQVBoQixDQW1CSTtpREFDS0EsUUFBUTs7Ozs7O0lBQ2pCLENBQUM7b0JBbkJLTCxnQkFBZ0IsQ0FBVUMsUUFBUTs7OztBQXFCeEMsR0FBSyxDQUFDZ0IsVUFBVSxHQUFHLFFBQ25CLEdBRHlCLENBQUM7SUFDeEIsR0FBSyxDQUFDYixVQUFVLEdBQUdLLGtDQUFtQztJQUV0RCxHQUFLLENBQUNKLFFBQVEsR0FBR04sZ0RBQVMsQ0FBQyxDQUFDO1FBQzFCQSxnREFBUyxDQUNOLENBQTZGLGdHQUM5RixDQUFDO1lBQ0NlLE9BQU8sRUFBRSxDQUFDO2dCQUNSQyxhQUFhLEVBQUVOLDBDQUFtQztZQUNwRCxDQUFDO1FBQ0gsQ0FBQztRQUVIVixnREFBUyxDQUNOLENBQWtHLG9HQUFhLE9BQVhLLFVBQVU7SUFFbkgsQ0FBQztJQUNELE1BQU0sQ0FBQ0MsUUFBUTtBQUNqQixDQUFDO0FBRXVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NlcnZpY2UvbG9jYXRpb24uanM/MzExZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbmNvbnN0IGhhbmRsZUdlb1N1Y2Nlc3MgPSBhc3luYyAocG9zaXRpb24pID0+IHtcbiAgY29uc3QgbGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICBjb25zdCBsb24gPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICBjb25zdCB3ZWF0aGVyQXBpID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfV0VBVEhFUl9BUEk7XG5cbiAgY29uc3QgbG9jYXRpb24gPSBhd2FpdCBheGlvcy5hbGwoW1xuICAgIGF4aW9zLmdldChcbiAgICAgIGBodHRwczovL2RhcGkua2FrYW8uY29tL3YyL2xvY2FsL2dlby9jb29yZDJyZWdpb25jb2RlLmpzb24/eD0ke2xvbn0meT0ke2xhdH1gLFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfS0FLQU9fQVVUSFosXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKSxcbiAgICBheGlvcy5nZXQoXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0L2RhaWx5P2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZjbnQ9MiZhcHBpZD0ke3dlYXRoZXJBcGl9YFxuICAgICksXG4gIF0pO1xuICByZXR1cm4gbG9jYXRpb247XG59O1xuXG5jb25zdCBkZWZhdWx0R2VvID0gKCkgPT4ge1xuICBjb25zdCB3ZWF0aGVyQXBpID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfV0VBVEhFUl9BUEk7XG5cbiAgY29uc3QgbG9jYXRpb24gPSBheGlvcy5hbGwoW1xuICAgIGF4aW9zLmdldChcbiAgICAgIGBodHRwczovL2RhcGkua2FrYW8uY29tL3YyL2xvY2FsL2dlby9jb29yZDJyZWdpb25jb2RlLmpzb24/eD0xMjcuMDQwMjAyNjcyNDEmeT0zNy41NDcwNzYzOTkzMDZgLFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfS0FLQU9fQVVUSFosXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKSxcbiAgICBheGlvcy5nZXQoXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0L2RhaWx5P2xhdD0zNi44MTY2MTE3Jmxvbj0xMjcuMTU4MDk1OCZjbnQ9MiZhcHBpZD0ke3dlYXRoZXJBcGl9YFxuICAgICksXG4gIF0pO1xuICByZXR1cm4gbG9jYXRpb247XG59O1xuXG5leHBvcnQgeyBoYW5kbGVHZW9TdWNjZXNzLCBkZWZhdWx0R2VvIH07XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJoYW5kbGVHZW9TdWNjZXNzIiwicG9zaXRpb24iLCJsYXQiLCJsb24iLCJ3ZWF0aGVyQXBpIiwibG9jYXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19XRUFUSEVSX0FQSSIsImFsbCIsImdldCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiTkVYVF9QVUJMSUNfS0FLQU9fQVVUSFoiLCJkZWZhdWx0R2VvIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./service/location.js\n");

/***/ })

});