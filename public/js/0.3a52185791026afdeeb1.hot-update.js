webpackHotUpdate(0,{

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchedMessages = exports.addNewMessage = undefined;
	
	var _toConsumableArray2 = __webpack_require__(259);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _constants = __webpack_require__(313);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  var newState = void 0;
	  switch (action.type) {
	    case _constants.FETCHED_MESSAGES:
	      return action.payload;
	    case _constants.NEW_MESSAGE:
	      newState = [].concat((0, _toConsumableArray3.default)(state), [action.payload]);
	      return newState;
	    default:
	      return state;
	  }
	};
	
	var addNewMessage = exports.addNewMessage = function addNewMessage(message) {
	  return {
	    type: _constants.NEW_MESSAGE,
	    payload: message
	  };
	};
	
	var fetchedMessages = exports.fetchedMessages = function fetchedMessages(messages) {
	  return {
	    type: _constants.FETCHED_MESSAGES,
	    payload: messages
	  };
	};

/***/ }

})
//# sourceMappingURL=0.3a52185791026afdeeb1.hot-update.js.map