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
	
	var Chat = exports.Chat = (_dec = (0, _reactRedux.connect)({ messages: messages, chatScreen: chatScreen }), _dec(_class = function (_Component) {
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

/***/ },

/***/ 763:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _stringify = __webpack_require__(472);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _assign = __webpack_require__(319);
	
	var _assign2 = _interopRequireDefault(_assign);
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Input = (_dec = (0, _reactRedux.connect)(function (_ref) {
	  var chat = _ref.chat;
	  return { chat: chat };
	}), _dec(_class = function (_Component) {
	  (0, _inherits3.default)(Input, _Component);
	
	  function Input(props) {
	    (0, _classCallCheck3.default)(this, Input);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call(this, props));
	
	    _this.handleSubmit = function (e) {
	      e.preventDefault();
	      var msg = (0, _assign2.default)({}, _this.props.chat);
	      msg.body = _this.state.body;
	      _this.props.ws.send((0, _stringify2.default)({
	        type: "NEW_MESSAGE",
	        data: msg
	      }));
	      _this.setState({ body: "" });
	    };
	
	    _this.handleChange = function (e) {
	      _this.setState({ body: e.target.value });
	    };
	
	    _this.state = {
	      body: ""
	    };
	    return _this;
	  }
	
	  (0, _createClass3.default)(Input, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.chatOpen === false && nextProps.chatOpen === true) {
	        document.getElementById("body").focus();
	      }
	    }
	  }, {
	    key: "shouldComponentUpdate",
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      if (this.state.body !== nextState.body || this.props.chat.author !== nextProps.chat.author || this.props.chat.gameId !== nextProps.chat.gameId) {
	        return true;
	      }
	
	      return false;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "form",
	        { onSubmit: this.handleSubmit, className: "msg-input-form" },
	        _react2.default.createElement("input", {
	          type: "text",
	          id: "body",
	          onChange: this.handleChange,
	          value: this.state.body,
	          placeholder: "Enter your message..."
	        }),
	        _react2.default.createElement("input", { type: "submit", value: "Submit" })
	      );
	    }
	  }]);
	  return Input;
	}(_react.Component)) || _class);
	exports.default = Input;
	module.exports = exports["default"];

/***/ }

})
//# sourceMappingURL=0.81d82423d8b5d71eef20.hot-update.js.map