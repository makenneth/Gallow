webpackHotUpdate(0,{

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleChat = undefined;
	
	var _constants = __webpack_require__(313);
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  if (action.type === _constants.TOGGLE_CHAT) {
	    return !state;
	  }
	
	  return state;
	};
	
	var toggleChat = exports.toggleChat = function toggleChat() {
	  return {
	    type: _constants.TOGGLE_CHAT
	  };
	};

/***/ }

})
//# sourceMappingURL=0.eff03b2d12b81dae869d.hot-update.js.map