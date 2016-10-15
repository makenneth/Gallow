webpackHotUpdate(0,{

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
	
	var _chatActions = __webpack_require__(520);
	
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

/***/ }

})
//# sourceMappingURL=0.757fd2ba5b24cb48ec93.hot-update.js.map