webpackHotUpdate(0,{

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Chat = undefined;
	
	var _getPrototypeOf = __webpack_require__(474);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(478);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(479);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(483);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(506);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _class;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(235);
	
	var _messages = __webpack_require__(762);
	
	var _messages2 = _interopRequireDefault(_messages);
	
	var _input = __webpack_require__(763);
	
	var _input2 = _interopRequireDefault(_input);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Chat = exports.Chat = (_dec = (0, _reactRedux.connect)(function (_ref) {
	  var messages = _ref.messages;
	  var chatScreen = _ref.chatScreen;
	  return { messages: messages, chatScreen: chatScreen };
	}), _dec(_class = function (_Component) {
	  (0, _inherits3.default)(Chat, _Component);
	
	  function Chat() {
	    (0, _classCallCheck3.default)(this, Chat);
	    return (0, _possibleConstructorReturn3.default)(this, (Chat.__proto__ || (0, _getPrototypeOf2.default)(Chat)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Chat, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "chat-screen" + (this.props.chatScreen ? " chat-open" : "") },
	        _react2.default.createElement(_messages2.default, { messages: this.props.messages }),
	        _react2.default.createElement(_input2.default, {
	          ws: this.props.ws,
	          messages: this.props.messages,
	          chatOpen: this.props.chatScreen
	        })
	      );
	    }
	  }]);
	  return Chat;
	}(_react.Component)) || _class);

/***/ }

})
//# sourceMappingURL=0.c5a41de83aa13739276f.hot-update.js.map