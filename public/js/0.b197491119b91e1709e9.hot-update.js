webpackHotUpdate(0,{

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(172);
	
	var _gameContainer = __webpack_require__(276);
	
	var _gameContainer2 = _interopRequireDefault(_gameContainer);
	
	var _newGame = __webpack_require__(309);
	
	var _newGame2 = _interopRequireDefault(_newGame);
	
	var _main = __webpack_require__(310);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _games = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/games;\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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

/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(235);
	
	var _redux = __webpack_require__(242);
	
	var _gameActions = __webpack_require__(286);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NewGame = function (_Component) {
	  _inherits(NewGame, _Component);
	
	  function NewGame(props, context) {
	    _classCallCheck(this, NewGame);
	
	    var _this = _possibleConstructorReturn(this, (NewGame.__proto__ || Object.getPrototypeOf(NewGame)).call(this, props));
	
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
	                { "data-user": JSON.stringify(user), key: user.id },
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
	
	  _createClass(NewGame, [{
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
	              "×"
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
	}(_react.Component);
	
	NewGame.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	
	
	var mapStateToProps = function mapStateToProps(_ref) {
	  var usersQuery = _ref.usersQuery;
	
	  return { usersQuery: usersQuery };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ fetchUsers: _gameActions.fetchUsers, createGame: _gameActions.createGame }, dispatch);
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NewGame);

/***/ }

})
//# sourceMappingURL=0.b197491119b91e1709e9.hot-update.js.map