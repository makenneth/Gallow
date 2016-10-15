webpackHotUpdate(0,{

/***/ 547:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stopLoading = exports.startLoading = exports.clearError = exports.setError = exports.fetchGames = undefined;
	
	var _axios = __webpack_require__(522);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _constants = __webpack_require__(313);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var intId = void 0;
	
	var fetchGames = exports.fetchGames = function fetchGames() {
	  var req = _axios2.default.get("/api/user/games");
	  return {
	    type: _constants.FETCHED_GAMES,
	    payload: req
	  };
	};
	
	var setError = exports.setError = function setError(message) {
	  return {
	    type: _constants.SET_ERROR,
	    payload: message
	  };
	};
	
	var clearError = exports.clearError = function clearError() {
	  return {
	    type: _constants.CLEAR_ERROR
	  };
	};
	
	var startLoading = exports.startLoading = function startLoading(cb) {
	  intId = setTimeout(function () {
	    cb("An error has occured, please reload..");
	  }, 5000);
	  return {
	    type: _constants.STARTED_LOADING
	  };
	};
	
	var stopLoading = exports.stopLoading = function stopLoading() {
	  if (intId) clearTimeout(intId);
	  return {
	    type: _constants.STOPPED_LOADING
	  };
	};

/***/ }

})
//# sourceMappingURL=0.028539711cc9ac68a236.hot-update.js.map