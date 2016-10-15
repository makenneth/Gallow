webpackHotUpdate(0,{

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(242);
	
	var _messages_reducer = __webpack_require__(258);
	
	var _messages_reducer2 = _interopRequireDefault(_messages_reducer);
	
	var _user_reducer = __webpack_require__(314);
	
	var _user_reducer2 = _interopRequireDefault(_user_reducer);
	
	var _game_reducer = __webpack_require__(315);
	
	var _game_reducer2 = _interopRequireDefault(_game_reducer);
	
	var _users_query_reducer = __webpack_require__(316);
	
	var _users_query_reducer2 = _interopRequireDefault(_users_query_reducer);
	
	var _chat_screen_reducer = __webpack_require__(317);
	
	var _chat_screen_reducer2 = _interopRequireDefault(_chat_screen_reducer);
	
	var _games_reducer = __webpack_require__(318);
	
	var _games_reducer2 = _interopRequireDefault(_games_reducer);
	
	var _game_info_reducer = __webpack_require__(325);
	
	var _game_info_reducer2 = _interopRequireDefault(_game_info_reducer);
	
	var _chat_reducer = __webpack_require__(327);
	
	var _chat_reducer2 = _interopRequireDefault(_chat_reducer);
	
	var _error_reducer = __webpack_require__(328);
	
	var _error_reducer2 = _interopRequireDefault(_error_reducer);
	
	var _loading_reducer = __webpack_require__(329);
	
	var _loading_reducer2 = _interopRequireDefault(_loading_reducer);
	
	var _middleware = __webpack_require__(330);
	
	var _middleware2 = _interopRequireDefault(_middleware);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createStoreWithMiddleware = void 0;
	if (__DEVTOOLS__) {
	  var _require = __webpack_require__(331);
	
	  var persistState = _require.persistState;
	
	  var DevTools = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../containers/DevTools/DevTools\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	  createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(_middleware2.default), window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(_redux.createStore);
	} else {
	  createStoreWithMiddleware = (0, _redux.applyMiddleware)(_middleware2.default)(_redux.createStore);
	}
	
	var reducers = (0, _redux.combineReducers)({
	  messages: _messages_reducer2.default,
	  user: _user_reducer2.default,
	  usersQuery: _users_query_reducer2.default,
	  games: _games_reducer2.default,
	  chat: _chat_reducer2.default,
	  game: _game_reducer2.default,
	  gameInfo: _game_info_reducer2.default,
	  chatScreen: _chat_screen_reducer2.default,
	  error: _error_reducer2.default,
	  loading: _loading_reducer2.default
	});
	
	var store = createStoreWithMiddleware(reducers);
	
	exports.default = store;
	module.exports = exports["default"];

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(326);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _slicedToArray2 = __webpack_require__(764);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _objectWithoutProperties2 = __webpack_require__(707);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (client) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === "function") {
	          return action(dispatch, getState);
	        }
	
	        var promise = action.promise;
	        var types = action.types;
	        var rest = (0, _objectWithoutProperties3.default)(action, ["promise", "types"]);
	
	        if (!promise) {
	          return next(action);
	        }
	
	        var _types = (0, _slicedToArray3.default)(types, 3);
	
	        var REQUEST = _types[0];
	        var SUCCESS = _types[1];
	        var FAILURE = _types[2];
	
	        next((0, _extends3.default)({}, rest, { type: REQUEST }));
	        var actionPromise = promise(client);
	        actionPromise.then(function (result) {
	          return next((0, _extends3.default)({}, rest, { result: result, type: SUCCESS }));
	        }, function (error) {
	          return next((0, _extends3.default)({}, rest, { error: error, type: FAILURE }));
	        }).catch(function (error) {
	          next((0, _extends3.default)({}, rest, { error: error, type: FAILURE }));
	        });
	
	        return actionPromise;
	      };
	    };
	  };
	};
	
	module.exports = exports["default"];

/***/ },

/***/ 764:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(765);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(723);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },

/***/ 765:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(766), __esModule: true };

/***/ },

/***/ 766:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(487);
	__webpack_require__(262);
	module.exports = __webpack_require__(767);

/***/ },

/***/ 767:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(311)
	  , ITERATOR  = __webpack_require__(303)('iterator')
	  , Iterators = __webpack_require__(285);
	module.exports = __webpack_require__(270).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ }

})
//# sourceMappingURL=0.b8bbf8226ac74b5b2dd0.hot-update.js.map