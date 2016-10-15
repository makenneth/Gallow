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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NEW = "hangperson/messages/NEW";
	var FETCHED = "hangperson/messages/FETCHED";
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];
	
	  var newState = void 0;
	  switch (action.type) {
	    case FETCHED:
	      return action.payload;
	    case NEW:
	      newState = [].concat((0, _toConsumableArray3.default)(state), [action.payload]);
	      return newState;
	    default:
	      return state;
	  }
	};
	
	var addNewMessage = exports.addNewMessage = function addNewMessage(message) {
	  return {
	    type: NEW,
	    payload: message
	  };
	};
	
	var fetchedMessages = exports.fetchedMessages = function fetchedMessages(messages) {
	  return {
	    type: FETCHED,
	    payload: messages
	  };
	};

/***/ }

})
//# sourceMappingURL=0.e7f3a81220700722ceb7.hot-update.js.map