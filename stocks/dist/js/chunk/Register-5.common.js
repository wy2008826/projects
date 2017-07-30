webpackJsonp([5],{

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(107)

/* script */
__vue_exports__ = __webpack_require__(105)

/* template */
var __vue_template__ = __webpack_require__(108)
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
__vue_options__.__file = "/Users/wangyu/github/projects/stocks/src/page/Register.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8938a812"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8938a812", __vue_options__)
  } else {
    hotAPI.reload("data-v-8938a812", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Register.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Input = __webpack_require__(87);

var _Input2 = _interopRequireDefault(_Input);

var _Btn = __webpack_require__(85);

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


exports.default = {
    data: function data() {
        return {
            username: '',
            password: '',
            password1: ''
        };
    },
    computed: {},
    methods: {
        doRegister: function doRegister() {
            var _this = this;

            var userName_reg = /^[0-9a-zA-Z]{6,12}$/;
            var pass_reg = /^[0-9a-zA-Z]{6,12}$/;

            if (!userName_reg.test(this.username)) {
                alert('账户名必须为6-12位字符');
                return;
            }
            if (!pass_reg.test(this.password)) {
                alert('密码必须为6-12位字符');
                return;
            }
            if (this.password != this.password1) {
                alert('两次密码不一致！');
            }

            this.$http.get('/api/register?username=' + this.username + '&password=' + this.password).then(function (res) {
                var data = res.body;
                if (data.save) {
                    _this.$store.dispatch('login', data.username);
                    _this.$router.replace('/index');
                } else {
                    alert(data.msg);
                }
                console.log(res);
            });
        }
    },
    created: function created() {
        var self = this;
    },
    mounted: function mounted() {},

    components: {
        vInput: _Input2.default,
        Btn: _Btn2.default
    }
};

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wrap[data-v-8938a812] {\n  padding: 0.6rem 0.3rem;\n}\n.login_row[data-v-8938a812] {\n  line-height: 0.6rem;\n  text-align: right;\n  margin-bottom: 0.4rem;\n}\n.login_row span[data-v-8938a812] {\n    color: #4992EC;\n}\n", ""]);

// exports


/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-8938a812&scoped=true!../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Register.vue", function() {
			var newContent = require("!!../../node_modules/.npminstall/css-loader/0.25.0/css-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/style-rewriter.js?id=data-v-8938a812&scoped=true!../../node_modules/.npminstall/sass-loader/4.1.1/sass-loader/index.js!../../node_modules/.npminstall/vue-loader/10.0.2/vue-loader/lib/selector.js?type=styles&index=0!./Register.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrap"
  }, [_c('vInput', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    attrs: {
      "placeholder": "6至12位字符"
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('vInput', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    attrs: {
      "placeholder": "请输入密码"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('vInput', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password1),
      expression: "password1"
    }],
    attrs: {
      "placeholder": "请确认密码"
    },
    domProps: {
      "value": (_vm.password1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password1 = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "login_row"
  }, [_c('router-link', {
    attrs: {
      "tag": "span",
      "to": "/login"
    }
  }, [_vm._v("已有账号？立即登陆")])], 1), _vm._v(" "), _c('Btn', {
    attrs: {
      "label": '注册',
      "click": _vm.doRegister,
      "type": 'red'
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8938a812", module.exports)
  }
}

/***/ }),

/***/ 64:
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

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.btn[data-v-2234bd28], .red[data-v-2234bd28], .blue[data-v-2234bd28], .red-b[data-v-2234bd28], .blue-b[data-v-2234bd28] {\n  height: 0.8rem;\n  font-size: 0.32rem;\n  line-height: 0.8rem;\n  border-radius: 0.4rem;\n  text-align: center;\n  display: block;\n}\n.red[data-v-2234bd28] {\n  background: #F64C3E;\n  color: #fff;\n}\n.blue[data-v-2234bd28] {\n  background: #4992EC;\n  color: #fff;\n}\n.red-b[data-v-2234bd28] {\n  background: #fff;\n  color: #F64C3E;\n  border: 1px solid #F64C3E;\n}\n.blue-b[data-v-2234bd28] {\n  background: #fff;\n  color: #4992EC;\n  border: 1px solid #4992EC;\n}\n", ""]);

// exports


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/**带边框的输入框**/\n.input_border[data-v-f95e71f0] {\n  font-size: 0.28rem;\n  line-height: 0.8rem;\n  display: flex;\n  margin: 0 0 0.4rem 0;\n  min-height: 0.8rem;\n  border: 1px solid #e5e5e5;\n}\n.input_border input[data-v-f95e71f0], .input_border textarea[data-v-f95e71f0] {\n    font-size: 0.28rem;\n    text-indent: 0.2rem;\n    flex: 1;\n}\n.input_border textarea[data-v-f95e71f0] {\n    padding: 0.2rem 0 0.2rem;\n    min-height: 1rem;\n    max-height: 2.4rem;\n}\n.input_border a[data-v-f95e71f0] {\n    width: 1.6rem;\n    color: #4992EC;\n    text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
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

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
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

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(80)

/* script */
__vue_exports__ = __webpack_require__(64)

/* template */
var __vue_template__ = __webpack_require__(91)
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

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(84)

/* script */
__vue_exports__ = __webpack_require__(66)

/* template */
var __vue_template__ = __webpack_require__(95)
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

/***/ 91:
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

/***/ 95:
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

/***/ })

});