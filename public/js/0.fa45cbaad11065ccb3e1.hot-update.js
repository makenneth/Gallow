webpackHotUpdate(0,{

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logOut = undefined;
	
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

/***/ },

/***/ 515:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(235);
	
	var _diagram = __webpack_require__(516);
	
	var _diagram2 = _interopRequireDefault(_diagram);
	
	var _gameInput = __webpack_require__(517);
	
	var _gameInput2 = _interopRequireDefault(_gameInput);
	
	var _letters = __webpack_require__(518);
	
	var _letters2 = _interopRequireDefault(_letters);
	
	var _chatActions = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../actions/chatActions\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Game = function (_Component) {
	  (0, _inherits3.default)(Game, _Component);
	
	  function Game(props) {
	    (0, _classCallCheck3.default)(this, Game);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Game.__proto__ || (0, _getPrototypeOf2.default)(Game)).call(this, props));
	
	    _this.handleClick = function () {
	      if (_this.props.game.turn === _this.props.user.id && !_this.props.game.solving) {
	        _this.props.ws.send((0, _stringify2.default)({
	          type: "SOLVE_GAME",
	          data: {
	            id: _this.props.gameInfo.id,
	            userId: _this.props.user.id
	          }
	        }));
	      }
	    };
	
	    return _this;
	  }
	
	  (0, _createClass3.default)(Game, [{
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      var game = this.props.game;
	      return _react2.default.createElement(
	        "div",
	        { className: "game-screen" },
	        _react2.default.createElement(_diagram2.default, { guessCount1: game.wrongGuesses1,
	          guessCount2: game.wrongGuesses2 }),
	        _react2.default.createElement(_gameInput2.default, { guesses: game.correctGuesses || [] }),
	        _react2.default.createElement(
	          "div",
	          { className: "button-div" },
	          _react2.default.createElement(
	            "button",
	            { className: "solve-it",
	              onClick: this.handleClick,
	              disabled: game.solving
	            },
	            "Solve it"
	          ),
	          _react2.default.createElement(
	            "button",
	            { className: "open-chat",
	              onClick: function onClick() {
	                return _this2.props.toggleChat();
	              }
	            },
	            "Chat"
	          )
	        ),
	        _react2.default.createElement(_letters2.default, { usedLetters: game.usedLetters || [],
	          guesses: game.correctGuesses || [],
	          turn: game.turn === this.props.user.id,
	          user: this.props.user,
	          ws: this.props.ws
	        })
	      );
	    }
	  }]);
	  return Game;
	}(_react.Component);
	
	var mapStateToProps = function mapStateToProps(_ref) {
	  var game = _ref.game;
	  var gameInfo = _ref.gameInfo;
	
	  return { game: game, gameInfo: gameInfo };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, { toggleChat: _chatActions.toggleChat })(Game);
	module.exports = exports["default"];

/***/ },

/***/ 545:
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
	
	var _dec, _class, _class2, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(235);
	
	var _navBar = __webpack_require__(546);
	
	var _navBar2 = _interopRequireDefault(_navBar);
	
	var _userActions = __webpack_require__(547);
	
	var _gameActions = __webpack_require__(521);
	
	var _chatActions = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../actions/chatActions\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var url = ("ws://localhost:8080") + "/ws";
	var ws = new WebSocket(url);
	
	var Main = (_dec = (0, _reactRedux.connect)(function (_ref) {
	  var user = _ref.user;
	  var error = _ref.error;
	  var loading = _ref.loading;
	  return { user: user, error: error, loading: loading };
	}, {
	  getCurrentUser: _userActions.getCurrentUser,
	  logOut: _userActions.logOut,
	  fetchedGameData: _gameActions.fetchedGameData,
	  updatedGame: _gameActions.updatedGame,
	  addNewMessage: _chatActions.addNewMessage,
	  fetchedMessages: _chatActions.fetchedMessages,
	  createdGame: _gameActions.createdGame,
	  clearError: _userActions.clearError,
	  setError: _userActions.setError,
	  stopLoading: _userActions.stopLoading
	}), _dec(_class = (_temp = _class2 = function (_Component) {
	  (0, _inherits3.default)(Main, _Component);
	
	  function Main(props, context) {
	    (0, _classCallCheck3.default)(this, Main);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).call(this, props));
	
	    _this.catchError = function () {
	      if (!_this.props.user) {
	        window.location.replace("/login");
	      }
	    };
	
	    _this.handleNewMessage = function (res) {
	      var message = JSON.parse(res.data);
	      switch (message.type) {
	        case "GAME_CONNECTED":
	          _this.props.fetchedGameData(message.data);
	          break;
	        case "MOVE_MADE":
	        case "GAME_FINISHED":
	          _this.props.updatedGame(message.data);
	          break;
	        case "NEW_MESSAGE":
	          _this.props.addNewMessage(message.data);
	          break;
	        case "FETCHED_MESSAGES":
	          _this.props.fetchedMessages(message.data);
	          break;
	        case "CREATED_GAME":
	          _this.props.createdGame(message.data);
	          break;
	        default:
	          break;
	      }
	    };
	
	    _this.logOut = function () {
	      _this.setState({ loading: true });
	      _this.props.logOut().then(function () {
	        window.location.replace("/");
	      }).catch(function () {
	        window.location.replace("/");
	      });
	    };
	
	    return _this;
	  }
	
	  (0, _createClass3.default)(Main, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      var _this2 = this;
	
	      if (!this.props.user.id) {
	        this.props.getCurrentUser();
	      }
	
	      ws.onmessage = this.handleNewMessage;
	      ws.onclose = function () {
	        return _this2.props.setError("Connection lost, please try again later...");
	      };
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.user.id && nextProps.user.id) {
	        this.props.stopLoading();
	        ws.send((0, _stringify2.default)({
	          type: "USER_CONNECTED",
	          data: {
	            username: nextProps.user.username,
	            nickname: nextProps.user.nickname
	          }
	        }));
	      }
	    }
	  }, {
	    key: "loadingScreen",
	    value: function loadingScreen() {
	      if (this.props.loading) {
	        return _react2.default.createElement(
	          "div",
	          { className: "overlay" },
	          _react2.default.createElement("div", { className: "loader" })
	        );
	      }
	    }
	  }, {
	    key: "flashError",
	    value: function flashError() {
	      if (this.props.error.message) {
	        return _react2.default.createElement(
	          "div",
	          { className: "flash-error" },
	          this.props.error.message
	        );
	      }
	    }
	  }, {
	    key: "children",
	    value: function children() {
	      var _this3 = this;
	
	      if (this.props.user) {
	        return _react2.default.Children.map(this.props.children, function (child) {
	          return _react2.default.cloneElement(child, {
	            user: _this3.props.user,
	            ws: ws
	          });
	        });
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        null,
	        _react2.default.createElement(_navBar2.default, { user: this.props.user, logOut: this.logOut }),
	        this.flashError(),
	        this.children(),
	        this.loadingScreen()
	      );
	    }
	  }]);
	  return Main;
	}(_react.Component), _class2.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	}, _temp)) || _class);
	exports.default = Main;
	module.exports = exports["default"];

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
	
	var _chatActions = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../actions/chatActions\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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
//# sourceMappingURL=0.fa45cbaad11065ccb3e1.hot-update.js.map