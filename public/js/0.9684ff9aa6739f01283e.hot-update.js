webpackHotUpdate(0,{

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _stringify = __webpack_require__(472);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
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
	
	var _chat = __webpack_require__(514);
	
	var _chat2 = _interopRequireDefault(_chat);
	
	var _game = __webpack_require__(515);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _gameActions = __webpack_require__(521);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GameContainer = (_dec = (0, _reactRedux.connect)(function () {
	  return {};
	}, { clearGame: _gameActions.clearGame }), _dec(_class = function (_Component) {
	  (0, _inherits3.default)(GameContainer, _Component);
	
	  function GameContainer(props) {
	    (0, _classCallCheck3.default)(this, GameContainer);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (GameContainer.__proto__ || (0, _getPrototypeOf2.default)(GameContainer)).call(this, props));
	
	    _this.socketOpened = function () {
	      _this.props.ws.send((0, _stringify2.default)({
	        type: "GAME_CONNECTED",
	        data: +_this.props.params.id
	      }));
	    };
	
	    return _this;
	  }
	
	  (0, _createClass3.default)(GameContainer, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      try {
	        this.props.ws.send((0, _stringify2.default)({
	          type: "GAME_CONNECTED",
	          data: +this.props.params.id
	        }));
	      } catch (e) {
	        this.props.ws.onopen = this.socketOpened;
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.props.clearGame();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "game-container" },
	        _react2.default.createElement(_game2.default, { ws: this.props.ws, user: this.props.user }),
	        _react2.default.createElement(_chat2.default, { ws: this.props.ws })
	      );
	    }
	  }]);
	  return GameContainer;
	}(_react.Component)) || _class);
	exports.default = GameContainer;
	module.exports = exports["default"];

/***/ },

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
	
	var _input = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./input\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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
	;

/***/ },

/***/ 762:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
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
	
	var _chatActions = __webpack_require__(520);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Messages = (_dec = (0, _reactRedux.connect)(function () {
	  return {};
	}, { toggleChat: _chatActions.toggleChat }), _dec(_class = function (_Component) {
	  (0, _inherits3.default)(Messages, _Component);
	
	  function Messages(props) {
	    (0, _classCallCheck3.default)(this, Messages);
	    return (0, _possibleConstructorReturn3.default)(this, (Messages.__proto__ || (0, _getPrototypeOf2.default)(Messages)).call(this, props));
	  }
	
	  (0, _createClass3.default)(Messages, [{
	    key: "shouldComponentUpdate",
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      if (this.props.messages.length !== nextProps.messages.length) {
	        return true;
	      }
	
	      return false;
	    }
	  }, {
	    key: "mapMessages",
	    value: function mapMessages() {
	      return this.props.messages.map(function (msg, i) {
	        return _react2.default.createElement(
	          "li",
	          { key: msg.author + msg.body + i },
	          _react2.default.createElement(
	            "span",
	            null,
	            msg.author,
	            ":\xA0"
	          ),
	          msg.body
	        );
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "message-list" },
	        _react2.default.createElement(
	          "div",
	          { onClick: this.props.toggleChat },
	          "\xD7"
	        ),
	        _react2.default.createElement(
	          "ul",
	          null,
	          this.mapMessages()
	        )
	      );
	    }
	  }]);
	  return Messages;
	}(_react.Component)) || _class);
	exports.default = Messages;
	module.exports = exports["default"];

/***/ }

})
//# sourceMappingURL=0.9684ff9aa6739f01283e.hot-update.js.map