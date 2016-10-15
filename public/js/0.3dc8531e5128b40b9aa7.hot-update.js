webpackHotUpdate(0,{

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(172);
	
	var _gameContainer = __webpack_require__(471);
	
	var _gameContainer2 = _interopRequireDefault(_gameContainer);
	
	var _newGame = __webpack_require__(544);
	
	var _newGame2 = _interopRequireDefault(_newGame);
	
	var _main = __webpack_require__(545);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _games = __webpack_require__(548);
	
	var _games2 = _interopRequireDefault(_games);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Routes = _react2.default.createElement(
	    _reactRouter.Route,
	    { path: "/", component: _main2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _games2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: "games/new", component: _newGame2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: "games/:id", component: _gameContainer2.default })
	);
	
	exports.default = Routes;
	module.exports = exports["default"];

/***/ },

/***/ 544:
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
	
	var _gameActions = __webpack_require__(521);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NewGame = (_dec = (0, _reactRedux.connect)(function (_ref) {
	  var usersQuery = _ref.usersQuery;
	  return { usersQuery: usersQuery };
	}, { fetchUsers: _gameActions.fetchUsers, createGame: _gameActions.createGame }), _dec(_class = (_temp = _class2 = function (_Component) {
	  (0, _inherits3.default)(NewGame, _Component);
	
	  function NewGame(props, context) {
	    (0, _classCallCheck3.default)(this, NewGame);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (NewGame.__proto__ || (0, _getPrototypeOf2.default)(NewGame)).call(this, props));
	
	    _this.startGame = function () {
	      if (!_this.state.selectedOpponent) {
	        alert("You have to select a player first!");
	      } else {
	        _this.props.createGame(_this.props.user, _this.state.selectedOpponent).then(function (res) {
	          _this.context.router.push("/games/" + res.payload.data.id);
	        }).catch(function (err) {
	          console.log(err);
	        });
	      }
	    };
	
	    _this.handleClear = function (e) {
	      _this.setState({
	        name: "",
	        selectedOpponent: null
	      });
	    };
	
	    _this.handleSelect = function (e) {
	      var user = JSON.parse(e.target.dataset.user);
	      _this.setState({
	        name: user.nickname,
	        selectedOpponent: user,
	        selected: true
	      });
	    };
	
	    _this.handleChange = function (e) {
	      var __timer = void 0;
	      _this.setState({
	        name: e.target.value,
	        selected: false
	      });
	      clearTimeout(__timer);
	      __timer = setTimeout(function () {
	        _this.props.fetchUsers(_this.state.name);
	      }, 700);
	    };
	
	    _this.listFoundUsers = function () {
	      return _react2.default.createElement(
	        "ul",
	        {
	          onClick: _this.handleSelect,
	          style: {
	            display: _this.props.usersQuery.length && !_this.state.selected ? "block" : "none"
	          }
	        },
	        function () {
	          var users = [],
	              usersQuery = this.props.usersQuery;
	          for (var i = 0; i < usersQuery.length; i++) {
	            var user = usersQuery[i];
	            if (user.id !== 1 && user.id !== this.props.user.id) {
	              users.push(_react2.default.createElement(
	                "li",
	                { "data-user": (0, _stringify2.default)(user), key: user.id },
	                user.nickname
	              ));
	            }
	          }
	          return users;
	        }.call(_this)
	      );
	    };
	
	    _this.state = {
	      name: "",
	      selectedOpponent: null,
	      selected: false
	    };
	    return _this;
	  }
	
	  (0, _createClass3.default)(NewGame, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "new-game-container" },
	        _react2.default.createElement(
	          "h1",
	          null,
	          "New Game"
	        ),
	        _react2.default.createElement(
	          "div",
	          null,
	          _react2.default.createElement(
	            "div",
	            { className: "user-input" },
	            _react2.default.createElement("input", { type: "text",
	              placeholder: "Enter the user name",
	              onChange: this.handleChange,
	              value: this.state.name
	            }),
	            _react2.default.createElement(
	              "div",
	              { onClick: this.handleClear },
	              "\xD7"
	            )
	          ),
	          this.listFoundUsers()
	        ),
	        _react2.default.createElement("input", { type: "submit",
	          value: "Start Game",
	          onClick: this.startGame,
	          disabled: !this.state.selectedOpponent })
	      );
	    }
	  }]);
	  return NewGame;
	}(_react.Component), _class2.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	}, _temp)) || _class);
	exports.default = NewGame;
	module.exports = exports["default"];

/***/ }

})
//# sourceMappingURL=0.3dc8531e5128b40b9aa7.hot-update.js.map