webpackHotUpdate(0,{

/***/ 314:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LOGGED_IN = "hangperson/user/LOGGED_IN";
	var LOG_OUT = "hangperson/user/LOG_OUT";
	var LOG_OUT_SUCCESS = "hangperson/user/LOG_OUT_SUCCESS";
	var LOG_OUT_FAIL = "hangperson/user/LOG_OUT_FAIL";
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case LOGGED_IN:
	      var user = action.payload.data;
	      return user;
	    case LOGGED_OUT:
	      return {};
	    default:
	      return state;
	  }
	};
	
	var logOut = exports.logOut = function logOut() {
	  var req = axios.delete("/api/session");
	
	  return {
	    type: LOGGED_OUT,
	    payload: req
	  };
	};
	
	var getCurrentUser = exports.getCurrentUser = function getCurrentUser() {
	  var req = axios.get("/api/user/current");
	
	  return {
	    type: LOGGED_IN,
	    payload: req
	  };
	};

/***/ }

})
//# sourceMappingURL=0.be006bf0c43f6196e87f.hot-update.js.map