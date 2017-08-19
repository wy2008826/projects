webpackJsonp([0],{

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(97)

/* script */
__vue_exports__ = __webpack_require__(81)

/* template */
var __vue_template__ = __webpack_require__(104)
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
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/components/Dialog/Dialog.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-30bec232"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30bec232", __vue_options__)
  } else {
    hotAPI.reload("data-v-30bec232", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Dialog.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('transition', {
    attrs: {
      "name": "fade1"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showStatus),
      expression: "showStatus"
    }],
    staticClass: "shade",
    on: {
      "click": _vm.closeSelf
    }
  })]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "bounce"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showStatus),
      expression: "showStatus"
    }],
    staticClass: "dialog"
  }, [_c('span', {
    staticClass: "close",
    on: {
      "click": _vm.closeSelf
    }
  }), _vm._v(" "), _vm._t("default")], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-30bec232", module.exports)
  }
}

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('p', {
    staticClass: "title_desc"
  }, [_c('span', {
    domProps: {
      "textContent": _vm._s(_vm.code)
    }
  }), _vm._v(" "), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.historyData.name)
    }
  }), _vm._v(" "), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.start)
    }
  }), _vm._v("至"), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.end)
    }
  }), _vm._v(" "), (!_vm.zixuan[_vm.code]) ? _c('span', {
    staticClass: "iconfont icon-tianjia search",
    on: {
      "click": _vm.clickAddZixuan
    }
  }, [_vm._v("加入自选")]) : _vm._e(), _vm._v(" "), (_vm.zixuan[_vm.code]) ? _c('span', {
    on: {
      "click": function($event) {
        _vm.clickAddZixuan(_vm.code)
      }
    }
  }, [_vm._v("添加备注")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "svgWraper",
    attrs: {
      "id": "svgWraper"
    }
  }, [_c('svg', {
    ref: "svg",
    staticClass: "svg",
    attrs: {
      "preserveAspectRatio": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "click": _vm.resetStatus
    }
  }, [_c('polyline', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.averLineStatus.aver5),
      expression: "averLineStatus.aver5"
    }],
    attrs: {
      "id": "aver5"
    }
  }), _vm._v(" "), _c('polyline', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.averLineStatus.aver10),
      expression: "averLineStatus.aver10"
    }],
    attrs: {
      "id": "aver10"
    }
  }), _vm._v(" "), _c('polyline', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.averLineStatus.aver20),
      expression: "averLineStatus.aver20"
    }],
    attrs: {
      "id": "aver20"
    }
  }), _vm._v(" "), _c('polyline', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.averLineStatus.aver30),
      expression: "averLineStatus.aver30"
    }],
    attrs: {
      "id": "aver30"
    }
  }), _vm._v(" "), _c('polyline', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.averLineStatus.aver60),
      expression: "averLineStatus.aver60"
    }],
    attrs: {
      "id": "aver60"
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "average_set_ul"
  }, [_c('p', {
    on: {
      "click": _vm.toggleAverageSettingStatus
    }
  }, [_vm._v("均线设置")]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "scaleY"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show_average_settings),
      expression: "show_average_settings"
    }]
  }, _vm._l(([5, 10, 20, 30, 60]), function(aver) {
    return _c('li', {
      class: {
        selected: _vm.averLineStatus['aver' + aver]
      },
      style: ({
        color: _vm.averLineColor['_' + aver]
      }),
      on: {
        "click": function () {
          _vm.setLineStatus(aver)
        }
      }
    }, [_vm._v("\n                        " + _vm._s(aver) + "日\n                        "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.averLineStatus['aver' + aver]),
        expression: "averLineStatus['aver'+aver]"
      }],
      staticClass: "iconfont icon-wancheng fn-fr"
    })])
  }))])], 1)]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "count"
    }
  }), _vm._v(" "), _c('vDialog', {
    attrs: {
      "show": _vm.showDialog,
      "close": function () {
        _vm.showDialog = false
      }
    }
  }, [_c('div', {
    staticClass: "dialog_wraper"
  }, [_c('vInput', [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.comment),
      expression: "comment"
    }],
    attrs: {
      "cols": "30",
      "placeholder": "请输入自选备注",
      "rows": "10"
    },
    domProps: {
      "value": (_vm.comment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.comment = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('Btn', {
    attrs: {
      "label": '确定',
      "click": function () {
        _vm.addZixuan(_vm.code)
      },
      "type": 'red'
    }
  })], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-79771185", module.exports)
  }
}

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(99)

/* script */
__vue_exports__ = __webpack_require__(86)

/* template */
var __vue_template__ = __webpack_require__(106)
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
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/page/detail.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-79771185"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-79771185", __vue_options__)
  } else {
    hotAPI.reload("data-v-79771185", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] detail.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 65:
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

exports.default = {
    name: 'Btn',
    props: ['label', 'click', 'href', 'type'],
    mounted: function mounted() {},

    methods: {
        clickEvent: function clickEvent() {
            if (typeof this.click == 'function') {
                this.click();
            }
        }
    },
    computed: {},
    components: {}
};

/***/ }),

/***/ 66:
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

exports.default = {
    name: 'InputBorder',
    data: function data() {
        return {};
    },
    mounted: function mounted() {},

    props: [],
    methods: {},
    computed: {},
    components: {}
};

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.btn[data-v-2234bd28], .red[data-v-2234bd28], .blue[data-v-2234bd28], .red-b[data-v-2234bd28], .blue-b[data-v-2234bd28] {\n  height: 0.8rem;\n  font-size: 0.32rem;\n  line-height: 0.8rem;\n  border-radius: 0.4rem;\n  text-align: center;\n  display: block;\n}\n.red[data-v-2234bd28] {\n  background: #F64C3E;\n  color: #fff;\n}\n.blue[data-v-2234bd28] {\n  background: #4992EC;\n  color: #fff;\n}\n.red-b[data-v-2234bd28] {\n  background: #fff;\n  color: #F64C3E;\n  border: 1px solid #F64C3E;\n}\n.blue-b[data-v-2234bd28] {\n  background: #fff;\n  color: #4992EC;\n  border: 1px solid #4992EC;\n}\n", ""]);

// exports


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/**带边框的输入框**/\n.input_border[data-v-f95e71f0] {\n  font-size: 0.28rem;\n  line-height: 0.8rem;\n  display: flex;\n  margin: 0 0 0.4rem 0;\n  min-height: 0.8rem;\n  border: 1px solid #e5e5e5;\n}\n.input_border input[data-v-f95e71f0], .input_border textarea[data-v-f95e71f0] {\n    font-size: 0.28rem;\n    text-indent: 0.2rem;\n    flex: 1;\n}\n.input_border textarea[data-v-f95e71f0] {\n    padding: 0.2rem 0 0.2rem;\n    min-height: 1rem;\n    max-height: 2.4rem;\n}\n.input_border a[data-v-f95e71f0] {\n    width: 1.6rem;\n    color: #4992EC;\n    text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-2234bd28&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Btn.vue", function() {
			var newContent = require("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-2234bd28&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Btn.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-f95e71f0&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Input.vue", function() {
			var newContent = require("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-f95e71f0&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Input.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(69)

/* script */
__vue_exports__ = __webpack_require__(65)

/* template */
var __vue_template__ = __webpack_require__(73)
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
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/components/Btn/Btn.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2234bd28"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2234bd28", __vue_options__)
  } else {
    hotAPI.reload("data-v-2234bd28", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Btn.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(70)

/* script */
__vue_exports__ = __webpack_require__(66)

/* template */
var __vue_template__ = __webpack_require__(74)
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
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/components/Input/Input.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-f95e71f0"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f95e71f0", __vue_options__)
  } else {
    hotAPI.reload("data-v-f95e71f0", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Input.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(!_vm.href) ? _c('a', {
    class: _vm.type,
    domProps: {
      "textContent": _vm._s(_vm.label)
    },
    on: {
      "click": _vm.clickEvent
    }
  }) : _vm._e(), _vm._v(" "), (_vm.href) ? _c('router-link', {
    class: _vm.type,
    attrs: {
      "to": _vm.href
    }
  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2234bd28", module.exports)
  }
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "input_border"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f95e71f0", module.exports)
  }
}

/***/ }),

/***/ 81:
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
//
//
//

exports.default = {
    name: 'Dialog',
    data: function data() {
        return {
            showStatus: this.show || false
        };
    },

    props: ['show', 'close'],
    mounted: function mounted() {},

    methods: {
        closeSelf: function closeSelf() {
            this.showStatus = false;
            this.close && this.close();
        }
    },
    computed: {},
    watch: {
        show: function show(n, old) {
            this.showStatus = n;
        }
    },
    components: {}
};

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //
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

var _Dialog = __webpack_require__(101);

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Input = __webpack_require__(72);

var _Input2 = _interopRequireDefault(_Input);

var _Btn = __webpack_require__(71);

var _Btn2 = _interopRequireDefault(_Btn);

var _vuex = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isLowOpenAndHighClose = __webpack_require__(88);
var calProfitFromOneDay = __webpack_require__(87);
var calAverageLineData = __webpack_require__(18);
var averLineColor = {
    _5: "#fafafa",
    _10: "#f5fd00",
    _20: "#de00dd",
    _30: "#00f91b",
    _60: "#707070"
};

exports.default = {
    data: function data() {

        return {
            zixuan: this.$store.state.zixuan,
            averLineColor: averLineColor,
            suits: [],
            historyData: {
                historyData: {}
            },
            sortData: [],
            showDialog: false,
            comment: '',
            start: '',
            end: '',
            show_average_settings: false, //显示设置均线选项
            averLineStatus: this.$store.averLineStatus || {
                aver5: true,
                aver10: true,
                aver20: true,
                aver30: true,
                aver60: true
            }
        };
    },
    computed: {
        code: function code() {
            var self = this;
            return self.$route.params.code;
        }
    },
    methods: {
        clickAddZixuan: function clickAddZixuan() {
            if (this.$store.state.user) {
                this.showDialog = true;
            } else {
                this.$router.push('/login');
            }
        },
        addZixuan: function addZixuan(code) {
            this.$store.dispatch('addZixuan', { code: code, name: this.historyData.name, comment: this.comment });
            this.showDialog = false;
        },
        toggleAverageSettingStatus: function toggleAverageSettingStatus() {
            this.$data.show_average_settings = !this.$data.show_average_settings;
        },
        setLineStatus: function setLineStatus(days) {
            this.$data.averLineStatus['aver' + days] = !this.$data.averLineStatus['aver' + days];
        },
        resetStatus: function resetStatus() {
            this.show_average_settings = false;
        }
    },
    created: function created() {
        var _this = this;

        var self = this;
        this.$store.averLineStatus = this.$data.averLineStatus;

        this.$http.get('/api/getOneCodeHistoryData?code=' + self.code).then(function (res) {
            // console.log(res);
            self.$data.historyData = res.body.result;
            self.name = res.body.result.name;

            var data = [];
            Object.keys(self.$data.historyData.historyData.dataColects).forEach(function (timeKey) {
                data.push(self.$data.historyData.historyData.dataColects[timeKey]);
            });
            self.$data.sortData = data.sort(function (prev, next) {
                return new Date(prev[0]) - new Date(next[0]);
            });
            _this.start = _this.sortData[0][0];
            _this.end = _this.sortData[_this.sortData.length - 1][0];

            // console.log('sortData:',self.$data.sortData)
            var length = self.$data.sortData.length;
            window.draw = new drawKLine(self.$refs["svg"], length > 400 ? self.$data.sortData.slice(length - 400) : self.$data.sortData);
        }, function (res) {
            console.log("error");
        });
    },

    components: {
        vDialog: _Dialog2.default,
        vInput: _Input2.default,
        Btn: _Btn2.default
    }
};

var drawKLine = function () {
    function drawKLine(svg, data) {
        _classCallCheck(this, drawKLine);

        var self = this;
        this.svg = window.svg = svg;
        this.data = data;
        this.averageData = calAverageLineData(this.data);
        this.length = data.length;
        this.barCount = data.length;
        this.barSize = 8;
        this.strokeWidth = 1;
        this.barGap = 10;
        this.topSpace = 0;
        this.bottomSpace = 0;
        this.rightSpace = 30;
        this.max = -10000000;
        this.min = 100000000;
        this.perSize = 0;
        this.averageConfig = averLineColor;
        this.init();

        var maxMin = this.calMaxMinVal(0, data.length);
        this.max = maxMin.max;
        this.min = maxMin.min;
        this.draw();
        this.drawAverage();

        var start = this.length - 60 >= 0 ? this.length - 60 : 0;
        this.start = start;
        this.end = this.length;

        this.setViewBox(start, this.length);
        //            this.drawLabel();
    }

    _createClass(drawKLine, [{
        key: 'init',
        value: function init() {
            var self = this;

            var client = self.svg.getBoundingClientRect();
            var width = self.width = client.width;
            var height = self.height = client.width * 0.7;
            self.svg.setAttribute("height", height);
            self.svg.setAttribute("width", width);
            this.move();
        }
    }, {
        key: 'calMaxMinVal',
        value: function calMaxMinVal(start, end) {
            //            console.log(start,end)
            var self = this;
            var max = -1000000;
            var min = 10000000;
            var highs = [];
            var lows = [];

            for (var i = start; i < end; i++) {
                var day = self.data[i];
                var high = day[2];
                var low = day[3];
                highs.push(high);
                lows.push(low);
            }
            max = Math.max.apply(null, highs);
            min = Math.min.apply(null, lows);
            return {
                max: max,
                min: min
            };
        }
    }, {
        key: 'setViewBox',
        value: function setViewBox(start, end) {
            var self = this;

            var _calMaxMinVal = this.calMaxMinVal(start, end),
                max = _calMaxMinVal.max,
                min = _calMaxMinVal.min;

            var hight = max - min;
            var barRelative = self.barSize + self.barGap;
            var width = (end - start + 3) * barRelative;
            var x = start * barRelative;

            this.perSize = width / this.width;
            this.start = start;
            this.canviewCount = end - start;
            this.svg.setAttribute("viewBox", x + ' ' + (-max - hight * 0.08) + ' ' + width + ' ' + hight * 1.16);
        }
    }, {
        key: 'draw',
        value: function draw() {
            var self = this;
            for (var i = 0; i < self.barCount; i++) {
                var bar = self.data[i];
                self.drawOneK(bar, i);
            }
        }
    }, {
        key: 'drawOneK',
        value: function drawOneK(bar, index) {
            var self = this;

            var _open = bar[1];
            var _high = bar[2];
            var _low = bar[3];
            var _close = bar[4];

            var _height = _close - _open;

            var x = (self.barSize + self.barGap) * index;
            var y = _height >= 0 ? -_close : -_open;
            // let y=start_y * 1;
            var height = Math.abs(_height);

            var stroke = _height >= 0 ? "#ff0000" : "#00ffff";
            var fill = _height >= 0 ? "transparent" : "#00ffff";
            var high = -_high;
            var low = -_low;

            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);

            rect.setAttribute("width", self.barSize);
            rect.setAttribute("height", height);
            rect.setAttribute("stroke", stroke);
            rect.setAttribute("stroke-width", self.strokeWidth);
            rect.setAttribute("fill", fill);
            rect.setAttribute("vector-effect", "non-scaling-stroke");
            self.svg.appendChild(rect);

            var line_top = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line_top.setAttribute("x1", x + self.barSize * 0.5);
            line_top.setAttribute("y1", high);
            line_top.setAttribute("x2", x + self.barSize * 0.5);
            line_top.setAttribute("y2", y);

            line_top.setAttribute("stroke", stroke);
            line_top.setAttribute("stroke-width", self.strokeWidth);
            line_top.setAttribute("vector-effect", "non-scaling-stroke");
            self.svg.appendChild(line_top);

            var line_bottom = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line_bottom.setAttribute("x1", x + self.barSize * 0.5);
            line_bottom.setAttribute("y1", y + height);
            line_bottom.setAttribute("x2", x + self.barSize * 0.5);
            line_bottom.setAttribute("y2", low);

            line_bottom.setAttribute("stroke", stroke);
            line_bottom.setAttribute("stroke-width", self.strokeWidth);
            line_bottom.setAttribute("vector-effect", "non-scaling-stroke");
            self.svg.appendChild(line_bottom);
        }
    }, {
        key: 'drawAverage',
        value: function drawAverage() {
            var avers = [5, 10, 20, 30, 60];
            for (var i = 0; i < avers.length; i++) {
                this.drawAverageLine(avers[i]);
            }
        }
    }, {
        key: 'drawAverageLine',
        value: function drawAverageLine(days) {
            var self = this;
            var polyline = document.getElementById('aver' + days);
            var avers = [];
            for (var i = 0; i < this.averageData.length; i++) {
                var averDay = this.averageData[i]['_' + days];
                var x = (self.barSize + self.barGap) * i;

                if (averDay) {
                    avers.push(x + ',' + -averDay);
                }
            }
            var points = avers.join(' ');

            polyline.setAttribute("points", points);
            polyline.setAttribute("fill", 'transparent');
            polyline.setAttribute("stroke", self.averageConfig['_' + days]);
            polyline.setAttribute("stroke-width", self.strokeWidth);
            polyline.setAttribute("vector-effect", "non-scaling-stroke");
            self.svg.appendChild(polyline);
        }
    }, {
        key: 'drawLabel',
        value: function drawLabel() {
            var self = this;
            var averageData = this.averageData;
            var historyData = this.data;
            var hisLength = averageData.length;
            var suitsIndex = [];
            for (var i = 60; i < hisLength - 3; i++) {
                var _averageData$i = averageData[i],
                    _5 = _averageData$i._5,
                    _10 = _averageData$i._10,
                    _20 = _averageData$i._20,
                    _30 = _averageData$i._30,
                    _60 = _averageData$i._60;

                var _historyData = _slicedToArray(historyData[i + 3], 5),
                    buyTime = _historyData[0],
                    open = _historyData[1],
                    hign = _historyData[2],
                    low = _historyData[3],
                    close = _historyData[4];

                var max_aver = Math.max.apply(null, [_5, _10, _20, _30, _60]);
                var min_aver = Math.min.apply(null, [_5, _10, _20, _30, _60]);
                if ((max_aver - min_aver) / close < 0.015 && nextDaysUp(i, averageData)) {
                    self.markOneDay(i + 3);
                    suitsIndex.push(i);
                }
            }
            console.log('suitsIndex:', suitsIndex);

            function nextDaysUp(i, averageData) {
                return averageData[i + 1]['_5'] < averageData[i + 2]['_5'] && averageData[i + 2]['_5'] < averageData[i + 3]['_5'];
            }
        }
    }, {
        key: 'markOneDay',
        value: function markOneDay(i) {
            var self = this;
            var averageData = this.averageData;
            var historyData = this.data;

            var _averageData$i2 = averageData[i],
                _5 = _averageData$i2._5,
                _10 = _averageData$i2._10,
                _20 = _averageData$i2._20,
                _30 = _averageData$i2._30,
                _60 = _averageData$i2._60;

            var _historyData$i = _slicedToArray(historyData[i], 5),
                buyTime = _historyData$i[0],
                open = _historyData$i[1],
                hign = _historyData$i[2],
                low = _historyData$i[3],
                close = _historyData$i[4];

            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var x = (self.barSize + self.barGap) * i;
            var y = -low * 0.99;
            var height = low * 0.03;

            rect.setAttribute("x", x);
            rect.setAttribute("y", y);

            rect.setAttribute("width", self.barSize * 0.4);
            rect.setAttribute("height", height);
            rect.setAttribute("stroke", '#f93');
            rect.setAttribute("stroke-width", self.strokeWidth);
            rect.setAttribute("fill", '#f93');
            rect.setAttribute("vector-effect", "non-scaling-stroke");
            self.svg.appendChild(rect);
        }
    }, {
        key: 'move',
        value: function move() {
            var self = this;
            var start_x0 = void 0,
                start_x1 = void 0;
            var start_y0 = void 0,
                start_y1 = void 0;
            var move_x0 = void 0,
                move_x1 = void 0;
            var move_y0 = void 0,
                move_y1 = void 0;
            var startViewBox = void 0;
            var _start = self.start;
            var click_relativeX = void 0;
            var cickStart = self.start;
            var wraper = document.querySelector('#svgWraper');
            wraper.addEventListener('touchstart', function (e) {
                e.preventDefault();
                var touch0 = e.touches[0];

                var pageX0 = touch0['pageX'];
                var pageY0 = touch0['pageY'];
                start_x0 = move_x0 = pageX0;
                start_y0 = move_y0 = pageY0;

                if (e.touches[1]) {
                    var touch1 = e.touches[1];
                    var pageX1 = touch1['pageX'];
                    var pageY1 = touch1['pageY'];
                    start_x1 = move_x1 = pageX1;
                    start_y1 = move_y1 = pageY1;

                    click_relativeX = start_x1 - start_x0;
                    cickStart = self.start;
                }

                startViewBox = self.svg.getAttribute('viewBox').split(' ');
                _start = self.start;
            });
            wraper.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var touch0 = e.touches[0];
                var pageX0 = touch0['pageX'];
                var pageY0 = touch0['pageY'];

                var dis_x0 = move_x0 - start_x0;
                var move_dis_x0 = (pageX0 - move_x0) * self.perSize;

                if (e.touches.length == 2) {
                    var touch1 = e.touches[1];
                    var pageX1 = touch1['pageX'];
                    var pageY1 = touch1['pageY'];

                    var move_relativeX = pageX1 - pageX0;

                    var count = 3 * Math.round((move_relativeX - click_relativeX) / (self.barSize + self.barGap));

                    document.getElementById('count').innerHTML = count;

                    _start = cickStart - count >= 0 ? cickStart - count : 0;

                    if (_start < 0) {
                        _start = self.start = 0;
                    }
                    if (_start > self.length - 5) {
                        _start = self.start = self.length - 5;
                    }

                    document.getElementById('count').innerHTML = 'count:' + count + ',_start:' + _start;

                    self.setViewBox(_start, self.end);
                    move_x1 = pageX1;
                    move_y1 = pageY1;
                } else {

                    var _count = Math.round(move_dis_x0 / (self.barSize + self.barGap));
                    if (_start - _count < 0) {
                        _start = 0;
                    }
                    if (_start - _count > self.length - self.canviewCount) {
                        return;
                    }
                    _start = _start - _count >= 0 ? _start - _count : 0;
                    var end = _start + (self.end - self.start);

                    self.setViewBox(_start, end);
                    self.start = _start;
                    self.end = end;

                    move_x0 = pageX0;
                    move_y0 = pageY0;
                }
            });
        }
    }]);

    return drawKLine;
}();

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (i, sortData) {
	if (i == sortData.length - 1) {
		return {
			rate3: 0,
			rate6: 0,
			rate9: 0,
			rate12: 0,
			rate20: 0,
			rate30: 0,
			rate3Days: 0,
			rate6Days: 0,
			rate9Days: 0,
			rate12Days: 0,
			rate20Days: 0,
			rate30Days: 0
		};
	}

	var rate3s = calRate(i, 3, sortData);
	var rate6s = calRate(i, 6, sortData);
	var rate9s = calRate(i, 9, sortData);
	var rate12s = calRate(i, 12, sortData);
	var rate20s = calRate(i, 20, sortData);
	var rate30s = calRate(i, 30, sortData);

	return {
		rate3: (rate3s.max - sortData[i][4]) / sortData[i][4] * 100,
		rate6: (rate6s.max - sortData[i][4]) / sortData[i][4] * 100,
		rate9: (rate9s.max - sortData[i][4]) / sortData[i][4] * 100,
		rate12: (rate12s.max - sortData[i][4]) / sortData[i][4] * 100,
		rate20: (rate20s.max - sortData[i][4]) / sortData[i][4] * 100,
		rate30: (rate30s.max - sortData[i][4]) / sortData[i][4] * 100,
		rate3Days: rate3s.calDays,
		rate6Days: rate6s.calDays,
		rate9Days: rate9s.calDays,
		rate12Days: rate12s.calDays,
		rate20Days: rate20s.calDays,
		rate30Days: rate30s.calDays
	};
};

function calRate(i, days, historyData) {
	var rate = void 0;
	var datas = historyData.slice(i + 1, i + 1 + days);
	var maxs = [];
	for (var j = 0; j < datas.length; j++) {
		maxs.push(datas[j][2]);
	}

	return {
		max: Math.max.apply(null, maxs),
		calDays: datas.length
	};
}

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//该算法判定前一日为下跌k线，而当日是低开高走的股票


function isLowOpenAndHignClose(recentData) {
	var prev = recentData[0];
	var today = recentData[1];

	var _prev = _slicedToArray(prev, 5),
	    prev_time = _prev[0],
	    prev_open = _prev[1],
	    prev_high = _prev[2],
	    prev_low = _prev[3],
	    prev_now = _prev[4];

	var _today = _slicedToArray(today, 5),
	    today_time = _today[0],
	    today_open = _today[1],
	    today_high = _today[2],
	    today_low = _today[3],
	    today_now = _today[4];

	if (isFall(prev) && isUp(today) && today_open < prev_now) {
		return {
			isSuit: true,
			buyTime: today_time
		};
	}
	return {
		isSuit: false
	};
}

function isFall(data) {
	var _data = _slicedToArray(data, 5),
	    time = _data[0],
	    open = _data[1],
	    high = _data[2],
	    low = _data[3],
	    now = _data[4];

	return now < open * 0.99;
}

function isUp(data) {
	var _data2 = _slicedToArray(data, 5),
	    time = _data2[0],
	    open = _data2[1],
	    high = _data2[2],
	    low = _data2[3],
	    now = _data2[4];

	return now > open * 1.005;
}

module.exports = isLowOpenAndHignClose;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.shade[data-v-30bec232] {\n  width: 100%;\n  height: 100%;\n  background: rgba(100, 100, 100, 0.5);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.dialog[data-v-30bec232] {\n  width: 6rem;\n  background: #fff;\n  border-radius: 0.1rem;\n  margin: 0 0 0 -3rem;\n  position: fixed;\n  top: 20%;\n  left: 50%;\n  min-height: 1rem;\n}\n.dialog .close[data-v-30bec232] {\n    width: 0.34rem;\n    height: 0.34rem;\n    position: absolute;\n    top: 0.16rem;\n    right: 0.16rem;\n}\n", ""]);

// exports


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.strategy_title[data-v-79771185] {\n  text-align: center;\n  line-height: 0.6rem;\n  color: #456;\n}\n.title_desc[data-v-79771185] {\n  font-size: 0.24rem;\n  line-height: 0.6rem;\n  padding-left: 0.3rem;\n}\n.title_desc span[data-v-79771185] {\n    margin: 0 0.05rem;\n}\n.svgWraper[data-v-79771185] {\n  position: relative;\n}\n.svg[data-v-79771185] {\n  display: block;\n  width: 7.5rem;\n  margin: 0 auto;\n  border: 1px solid red;\n  background-color: #000;\n}\n.dialog_wraper[data-v-79771185] {\n  padding: 0.3rem 0.2rem;\n}\n.average_set_ul[data-v-79771185] {\n  position: absolute;\n  right: 0.1rem;\n  top: 0;\n  line-height: 0.4rem;\n  color: #fff;\n  border: 1px solid red;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n.average_set_ul li[data-v-79771185] {\n    padding: 0 0.1rem;\n    border-bottom: 1px solid red;\n}\n", ""]);

// exports


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-30bec232&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Dialog.vue", function() {
			var newContent = require("!!../../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-30bec232&scoped=true!../../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Dialog.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-79771185&scoped=true!../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue", function() {
			var newContent = require("!!../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-79771185&scoped=true!../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});