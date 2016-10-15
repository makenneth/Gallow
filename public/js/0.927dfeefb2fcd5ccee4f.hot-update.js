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
	if (true) {
	  var _require = __webpack_require__(331);
	
	  var persistState = _require.persistState;
	
	  var DevTools = __webpack_require__(655);
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

/***/ 315:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH = "hangperson/game/FETCH";
	var FETCH_SUCCESS = "hangperson/game/FETCH_SUCCESS";
	var FETCH_FAIL = "hangperson/game/FETCH_FAIL";
	var UPDATE = "hangperson/game/UPDATE";
	var UPDATE_SUCCESS = "hangperson/game/UPDATE_SUCESS";
	var UPDATE_FAIL = "hangperson/game/UPDATE_FAIL";
	var CLEAR_GAME = "hangperson/game/CLEAR_GAME";
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case FETCHED_GAME:
	      return action.payload.state;
	    case UPDATED_GAME:
	      return action.payload;
	    case CLEAR_GAME:
	      return {};
	  }
	
	  return state;
	};
	
	module.exports = exports["default"];

/***/ }

})
//# sourceMappingURL=0.927dfeefb2fcd5ccee4f.hot-update.js.map