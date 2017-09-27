webpackJsonp([4],{

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrap"
  }, [_c('div', [_c('Loading', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }]
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.loading),
      expression: "!loading"
    }],
    staticClass: "clearfix strategy_ul"
  }, [_c('h4', {
    staticClass: "strategy_title text-center",
    domProps: {
      "textContent": _vm._s(_vm.labelTxt)
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "amount_line text-right"
  }, [_vm._v("共"), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.dataLists.length)
    }
  }), _vm._v("条 更新时间:"), _c('i', {
    domProps: {
      "textContent": _vm._s(_vm.createTime)
    }
  })]), _vm._v(" "), _c('li', {
    staticClass: "stock head text-center"
  }, [_c('p', {
    on: {
      "click": function($event) {
        _vm.sortBy('t')
      }
    }
  }, [_vm._v("名称／代码 ⇅")]), _vm._v(" "), _c('p', {
    on: {
      "click": function($event) {
        _vm.sortBy('close')
      }
    }
  }, [_vm._v("现价")]), _vm._v(" "), _c('p', {
    on: {
      "click": function($event) {
        _vm.sortBy('baseRate')
      }
    }
  }, [_vm._v("涨幅％")]), _vm._v(" "), _c('p', {
    on: {
      "click": function($event) {
        _vm.sortBy('rate6')
      }
    }
  }, [_vm._v("6日收益 ⇅")]), _vm._v(" "), _c('p', {
    on: {
      "click": function($event) {
        _vm.sortBy('rate12')
      }
    }
  }, [_vm._v("12日收益 ⇅")])]), _vm._v(" "), _vm._l((_vm.dataLists), function(stock, index) {
    return _c('router-link', {
      staticClass: "stock text-center",
      attrs: {
        "tag": "li",
        "to": '/detail/' + stock.code
      }
    }, [_c('p', [_c('span', {
      staticClass: "index",
      domProps: {
        "textContent": _vm._s(index)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "name",
      domProps: {
        "textContent": _vm._s(stock.name)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "code",
      domProps: {
        "textContent": _vm._s(stock.code)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "time",
      domProps: {
        "textContent": _vm._s(stock.buyTime || stock.t)
      }
    })]), _vm._v(" "), _c('p', {
      class: _vm.color(stock.baseData[4] >= stock.baseData[1]),
      domProps: {
        "textContent": _vm._s(stock.baseData[4])
      }
    }), _vm._v(" "), _c('p', {
      class: _vm.color(_vm.getRate(stock.baseData) >= 0),
      domProps: {
        "textContent": _vm._s(_vm.getRate(stock.baseData))
      }
    }), _vm._v(" "), _c('p', {
      class: _vm.color(stock.rate6 >= 4),
      domProps: {
        "textContent": _vm._s(stock.rate6.toFixed(2) + '%')
      }
    }), _vm._v(" "), _c('p', {
      class: _vm.color(stock.rate12 >= 8),
      domProps: {
        "textContent": _vm._s(stock.rate12.toFixed(2) + '%')
      }
    })])
  })], 2)])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-45e438f1", module.exports)
  }
}

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(98)

/* script */
__vue_exports__ = __webpack_require__(82)

/* template */
var __vue_template__ = __webpack_require__(105)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/page/Lists.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-45e438f1"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-45e438f1", __vue_options__)
  } else {
    hotAPI.reload("data-v-45e438f1", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Lists.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//


exports.default = {
    data: function data() {
        return {};
    },
    computed: {},
    methods: {},
    created: function created() {
        var self = this;
    },
    mounted: function mounted() {},

    components: {}
};

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.loading[data-v-13d6cdac] {\n  position: absolute;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 6.250em;\n  height: 6.250em;\n  -webkit-animation: rotate 2.4s linear infinite;\n  -moz-animation: rotate 2.4s linear infinite;\n  -o-animation: rotate 2.4s linear infinite;\n  animation: rotate 2.4s linear infinite;\n}\n.loading .white[data-v-13d6cdac] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: white;\n  opacity: 0;\n  -webkit-animation: flash 2.4s linear infinite;\n  -moz-animation: flash 2.4s linear infinite;\n  -o-animation: flash 2.4s linear infinite;\n  animation: flash 2.4s linear infinite;\n}\n.loading .dot[data-v-13d6cdac] {\n  position: absolute;\n  margin: auto;\n  width: 2.4em;\n  height: 2.4em;\n  border-radius: 100%;\n  -webkit-transition: all 1s ease;\n  -moz-transition: all 1s ease;\n  -o-transition: all 1s ease;\n  transition: all 1s ease;\n}\n.loading .dot[data-v-13d6cdac]:nth-child(2) {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  background: #FF4444;\n  -webkit-animation: dotsY 2.4s linear infinite;\n  -moz-animation: dotsY 2.4s linear infinite;\n  -o-animation: dotsY 2.4s linear infinite;\n  animation: dotsY 2.4s linear infinite;\n}\n.loading .dot[data-v-13d6cdac]:nth-child(3) {\n  left: 0;\n  right: 0;\n  top: 0;\n  background: #FFBB33;\n  -webkit-animation: dotsX 2.4s linear infinite;\n  -moz-animation: dotsX 2.4s linear infinite;\n  -o-animation: dotsX 2.4s linear infinite;\n  animation: dotsX 2.4s linear infinite;\n}\n.loading .dot[data-v-13d6cdac]:nth-child(4) {\n  top: 0;\n  bottom: 0;\n  right: 0;\n  background: #99CC00;\n  -webkit-animation: dotsY 2.4s linear infinite;\n  -moz-animation: dotsY 2.4s linear infinite;\n  -o-animation: dotsY 2.4s linear infinite;\n  animation: dotsY 2.4s linear infinite;\n}\n.loading .dot[data-v-13d6cdac]:nth-child(5) {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #33B5E5;\n  -webkit-animation: dotsX 2.4s linear infinite;\n  -moz-animation: dotsX 2.4s linear infinite;\n  -o-animation: dotsX 2.4s linear infinite;\n  animation: dotsX 2.4s linear infinite;\n}\n@keyframes rotate {\n0% {\n    -webkit-transform: rotate(0);\n    -moz-transform: rotate(0);\n    -o-transform: rotate(0);\n    transform: rotate(0);\n}\n10% {\n    width: 6.250em;\n    height: 6.250em;\n}\n66% {\n    width: 2.4em;\n    height: 2.4em;\n}\n100% {\n    -webkit-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n    width: 6.250em;\n    height: 6.250em;\n}\n}\n@keyframes dotsY {\n66% {\n    opacity: .1;\n    width: 2.4em;\n}\n77% {\n    opacity: 1;\n    width: 0;\n}\n}\n@keyframes dotsX {\n66% {\n    opacity: .1;\n    height: 2.4em;\n}\n77% {\n    opacity: 1;\n    height: 0;\n}\n}\n@keyframes flash {\n33% {\n    opacity: 0;\n    border-radius: 0%;\n}\n55% {\n    opacity: .6;\n    border-radius: 100%;\n}\n66% {\n    opacity: 0;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(80)

/* script */
__vue_exports__ = __webpack_require__(75)

/* template */
var __vue_template__ = __webpack_require__(78)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/components/Loading/Loading.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-13d6cdac"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13d6cdac", __vue_options__)
  } else {
    hotAPI.reload("data-v-13d6cdac", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Loading.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loading"
  }, [_c('div', {
    staticClass: "dot white"
  }), _vm._v(" "), _c('div', {
    staticClass: "dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "dot"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-13d6cdac", module.exports)
  }
}

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(79)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-13d6cdac&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Loading.vue", function() {
			var newContent = require("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-13d6cdac&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Loading.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Loading = __webpack_require__(77);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            type: this.$route.params.type,
            loading: true,
            sortDirection: 1,
            createTime: '',
            dataLists: [],
            apiConfog: {
                T: {
                    label: '最近收T',
                    url: '/api/getAllCodeRecentT'
                },
                singleSunKeepDays: {
                    label: '最近单阳不破',
                    url: '/api/selectSingleSunKeepedDays'
                },
                bouncePrice: {
                    label: '最近涨幅居前',
                    url: '/api/bouncePrice'
                },
                bounceVol: {
                    label: '最近成交量暴增',
                    url: '/api/bounceVol'
                },
                singleSunUpClosedAverage: {
                    label: '最近单阳突破密集均线',
                    url: '/api/singleSunUpClosedAverage'
                },
                jumpUpWithSpace: {
                    label: '最近跳空上涨',
                    url: '/api/jumpUpWithSpace'
                }
            }
        };
    },
    computed: {
        labelTxt: function labelTxt() {
            return this.apiConfog[this.type].label;
        }
    },
    methods: {
        toggleStocks: function toggleStocks() {
            this.$store.dispatch("toggleStocks", !this.showStocks);
        },
        color: function color(cal) {
            return cal ? 'red' : 'green';
        },
        getRate: function getRate(nowData) {
            return ((nowData[4] - nowData[1]) / nowData[1] * 100).toFixed(2);
        },
        sortBy: function sortBy(key) {
            var self = this;
            this.sortDirection = this.sortDirection * -1;
            this.dataLists = this.dataLists.sort(function (prev, next) {
                if (key == 't') {
                    return (new Date(next[key]) - new Date(prev[key])) * self.sortDirection;
                }
                if (key == 'close') {
                    return (next.baseData[4] - prev.baseData[4]) * self.sortDirection;
                }
                if (key == 'baseRate') {
                    var prevRate = (prev.baseData[4] - prev.baseData[1]) / prev.baseData[1];
                    var nextRate = (next.baseData[4] - next.baseData[1]) / next.baseData[1];
                    return (nextRate - prevRate) * self.sortDirection;
                }
                return (next[key] - prev[key]) * self.sortDirection;
            });
        },
        formatTime: function formatTime(_time) {
            var time = _time ? new Date(_time) : new Date();

            var o = {
                year: time.getFullYear(),
                month: prefix(time.getMonth() + 1),
                date: prefix(time.getDate()),
                day: time.getDay(),
                hour: prefix(time.getHours()),
                minute: prefix(time.getMinutes()),
                second: prefix(time.getSeconds())
            };
            function prefix(num) {
                return num < 10 ? '0' + num : num;
            }
            return o.year + "-" + o.month + "-" + o.date + "  " + o.hour + ":" + o.minute + ":" + o.second;
        },
        lowOpenAndHighCloseRateClass: function lowOpenAndHighCloseRateClass(item) {
            var rate3 = item.rate3,
                rate6 = item.rate6,
                rate9 = item.rate9,
                rate12 = item.rate12,
                isTuPo = item.isTuPo,
                diepo = item.diepo;

            var averRate = (rate3 * 1 + rate6 * 1 + rate9 * 1 + rate12 * 1) / 4;

            if (diepo) {
                return 'diepo';
            }
            if (isTuPo) {
                return 'tupo';
            }

            if (averRate >= 3) {
                return "high";
            } else if (item.rate3 < 2) {
                return "low";
            }
        }
    },
    created: function created() {
        var _this = this;

        var self = this;
        var url = this.$data.apiConfog[this.$data.type].url;
        var type = this.$data.type;

        var storeLists = this.$store[type];
        console.log(this.$store, storeLists);
        if (storeLists) {
            self.$data.dataLists = self.$store[type]['dataLists'];
            self.createTime = self.$store[type]['createTime'];
            this.loading = false;
        } else {
            this.$http.get(url).then(function (res) {

                _this.loading = false;
                self.$data.dataLists = res.body.lists.sort(function (prev, next) {
                    var t = prev.buyTime ? 'buyTime' : 't';
                    return new Date(next[t]) - new Date(prev[t]);
                });
                self.$data.createTime = res.body.createTime;

                self.$set(self.$store, type, {});
                self.$store[type]['dataLists'] = self.$data.dataLists;
                self.$store[type]['createTime'] = self.$data.createTime;
            }, function (res) {
                _this.loading = false;
                console.log("error");
            });
        }
    },
    mounted: function mounted() {
        console.log(1, localStorage.getItem('scrollY'));
        var sessionScrollY = localStorage.getItem('scrollY');
        var curScrollY = 0;

        setTimeout(function () {
            var scrollInterval = setInterval(function () {
                curScrollY += 50;
                if (curScrollY <= sessionScrollY) {
                    document.body.scrollTop = curScrollY;
                } else {
                    document.body.scrollTop = sessionScrollY;
                    clearInterval(scrollInterval);
                }
            }, 2);
        }, 10);
    },
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
        var scrollY = document.body.scrollTop;
        localStorage.setItem('scrollY', scrollY);
        next();
    },

    components: {
        Loading: _Loading2.default
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wrap[data-v-45e438f1] {\n  background-color: #090a0a;\n}\n.red[data-v-45e438f1] {\n  color: #ff0000;\n}\n.green[data-v-45e438f1] {\n  color: #00a649;\n}\n.strategy_title[data-v-45e438f1] {\n  line-height: 1rem;\n  background-color: #17191e;\n  color: #cc001f;\n  border-bottom: 0.01rem solid #585858;\n}\n.amount_line[data-v-45e438f1] {\n  line-height: 0.8rem;\n  color: #e9e9e9;\n  fs: 0.3rem;\n  padding-right: 0.3rem;\n}\n.amount_line span[data-v-45e438f1] {\n    color: #f93;\n    margin: 0 0.05rem;\n}\n.strategy_ul li.high[data-v-45e438f1] {\n  background-color: #FF7256;\n}\n.strategy_ul li.low[data-v-45e438f1] {\n  background-color: #98FB98;\n}\n.strategy_ul li.tupo[data-v-45e438f1] {\n  background-color: #f93;\n}\n.strategy_ul li.diepo[data-v-45e438f1] {\n  background-color: #3f3;\n}\n.stock[data-v-45e438f1] {\n  line-height: 0.6rem;\n  padding: 0.15rem 0;\n  display: flex;\n  border-bottom: 0.011rem solid #1c1922;\n}\n.stock.head[data-v-45e438f1] {\n    background-color: #0d0c12;\n    color: #646464;\n}\n.stock p[data-v-45e438f1] {\n    flex: 1;\n    line-height: 0.3rem;\n}\n.stock .index[data-v-45e438f1] {\n    color: #f93;\n    font-size: 0.2rem;\n    margin: 0 0.06rem;\n}\n.stock .name[data-v-45e438f1] {\n    font-size: 0.28rem;\n    color: #e9e9e9;\n}\n.stock .code[data-v-45e438f1] {\n    display: block;\n    margin: 0.07rem 0;\n    color: #606060;\n    font-size: 0.24rem;\n}\n.stock .time[data-v-45e438f1] {\n    color: #606060;\n    font-size: 0.26rem;\n}\n.label[data-v-45e438f1] {\n  padding: 0.05rem 0.1rem;\n  border: 1px solid #f93;\n  margin: 0.2rem;\n  display: inline-block;\n}\n", ""]);

// exports


/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-45e438f1&scoped=true!../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Lists.vue", function() {
			var newContent = require("!!../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-45e438f1&scoped=true!../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Lists.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});