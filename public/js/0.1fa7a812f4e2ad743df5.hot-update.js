webpackHotUpdate(0,{

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCurrentUser = exports.logOut = undefined;
	
	var _constants = __webpack_require__(313);
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _constants.LOGGED_IN:
	      var user = action.payload.data;
	      return user;
	    case _constants.LOGGED_OUT:
	      return {};
	    default:
	      return state;
	  }
	};
	
	var logOut = exports.logOut = function logOut() {
	  var req = axios.delete("/api/session");
	
	  return {
	    type: _constants.LOGGED_OUT,
	    payload: req
	  };
	};
	
	var getCurrentUser = exports.getCurrentUser = function getCurrentUser() {
	  var req = axios.get("/api/user/current");
	
	  return {
	    type: _constants.LOGGED_IN,
	    payload: req
	  };
	};

/***/ }

})
//# sourceMappingURL=0.1fa7a812f4e2ad743df5.hot-update.js.map