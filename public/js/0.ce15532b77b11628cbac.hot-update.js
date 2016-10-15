webpackHotUpdate(0,{

/***/ 317:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOGGLE = "hangperson/chat-screen/TOGGLE";
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var action = arguments[1];
	
	  if (action.type === TOGGLE) {
	    return !state;
	  }
	
	  return state;
	};
	
	var toggleChat = exports.toggleChat = function toggleChat() {
	  return {
	    type: TOGGLE
	  };
	};

/***/ }

})
//# sourceMappingURL=0.ce15532b77b11628cbac.hot-update.js.map