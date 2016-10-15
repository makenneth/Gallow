webpackHotUpdate(0,{

/***/ 548:
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
	
	var _dec, _class, _class2, _temp;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(235);
	
	var _moment = __webpack_require__(549);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _userActions = __webpack_require__(547);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Games = (_dec = (0, _reactRedux.connect)(function (_ref) {
	  var games = _ref.games;
	  return { games: games };
	}, { fetchGames: _userActions.fetchGames, startLoading: _userActions.startLoading, stopLoading: _userActions.stopLoading, setError: _userActions.setError }), _dec(_class = (_temp = _class2 = function (_Component) {
	  (0, _inherits3.default)(Games, _Component);
	
	  function Games(props, context) {
	    (0, _classCallCheck3.default)(this, Games);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Games.__proto__ || (0, _getPrototypeOf2.default)(Games)).call(this, props));
	
	    _this.handleClick = function (e) {
	      _this.context.router.push("/games/" + e.target.dataset.id);
	    };
	
	    return _this;
	  }
	
	  (0, _createClass3.default)(Games, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      if (this.props.user.id && !this.props.games.fetched) {
	        this.props.fetchGames();
	        this.props.startLoading(this.props.setError);
	      }
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.games.fetched && nextProps.games.fetched) {
	        this.props.stopLoading();
	      }
	      if (!this.props.user && nextProps.user || this.props.user && nextProps.user.id !== this.props.user.id) {
	        this.props.fetchGames();
	        this.props.startLoading(this.props.setError);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        "div",
	        { className: "games-container" },
	        _react2.default.createElement(
	          "div",
	          null,
	          _react2.default.createElement(
	            "h1",
	            null,
	            "Ongoing Games"
	          ),
	          _react2.default.createElement(
	            "ul",
	            { onClick: this.handleClick },
	            this.props.games.unfinished.map(function (game) {
	              return _react2.default.createElement(
	                "li",
	                { key: game.id, "data-id": game.id },
	                game.nickname1,
	                _react2.default.createElement(
	                  "span",
	                  null,
	                  "vs."
	                ),
	                game.nickname2,
	                _react2.default.createElement("br", null),
	                "Last Moved: ",
	                (0, _moment2.default)(game.updatedAt).fromNow()
	              );
	            })
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          null,
	          _react2.default.createElement(
	            "h1",
	            null,
	            "Finished Games"
	          ),
	          _react2.default.createElement(
	            "ul",
	            { onClick: this.handleClick },
	            this.props.games.finished.map(function (game) {
	              return _react2.default.createElement(
	                "li",
	                { key: game.id, "data-id": game.id },
	                game.nickname1,
	                _react2.default.createElement(
	                  "span",
	                  null,
	                  "vs."
	                ),
	                game.nickname2,
	                _react2.default.createElement("br", null),
	                "Result: " + (game.winner === _this2.props.user.id ? "Won" : "Lost")
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);
	  return Games;
	}(_react.Component), _class2.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	}, _temp)) || _class);
	exports.default = Games;
	module.exports = exports["default"];

/***/ }

})
//# sourceMappingURL=0.14b58e700218d423f5c3.hot-update.js.map