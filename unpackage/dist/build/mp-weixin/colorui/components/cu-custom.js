(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"9fbc":function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,e="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(e="".concat(e,"background-image:url(").concat(a,");")),e}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};n.default=a}).call(this,a("df3c")["default"])},c5ac:function(t,n,a){"use strict";a.r(n);var e=a("e80f"),u=a("c6d7");for(var c in u)["default"].indexOf(c)<0&&function(t){a.d(n,t,(function(){return u[t]}))}(c);var o=a("828b"),r=Object(o["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],void 0);n["default"]=r.exports},c6d7:function(t,n,a){"use strict";a.r(n);var e=a("9fbc"),u=a.n(e);for(var c in e)["default"].indexOf(c)<0&&function(t){a.d(n,t,(function(){return e[t]}))}(c);n["default"]=u.a},e80f:function(t,n,a){"use strict";a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){}));var e=function(){var t=this.$createElement;this._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("c5ac"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
