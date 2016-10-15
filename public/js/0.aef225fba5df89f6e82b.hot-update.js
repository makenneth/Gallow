webpackHotUpdate(0,{

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearGame = exports.fetchedGameData = exports.createdGame = exports.createGame = exports.fetchUsers = undefined;
	
	var _axios = __webpack_require__(522);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _constants = __webpack_require__(313);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fetchUsers = exports.fetchUsers = function fetchUsers(string) {
	  var req = _axios2.default.get("/api/users?name=" + string.toLowerCase());
	  return {
	    type: _constants.FETCHED_USERS,
	    payload: req
	  };
	};
	
	var createGame = exports.createGame = function createGame(user1, user2) {
	  var req = (0, _axios2.default)({
	    url: "/api/games/new",
	    method: "post",
	    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	    data: {
	      id: 0,
	      username1: user1.username,
	      username2: user2.username,
	      nickname1: user1.nickname,
	      nickname2: user2.nickname,
	      userId1: user1.id,
	      userId2: user2.id
	    }
	  });
	  return {
	    type: _constants.CREATED_GAME,
	    payload: req
	  };
	};
	var createdGame = exports.createdGame = function createdGame(game) {
	  return {
	    type: _constants.OTHER_CREATED_GAME,
	    payload: game
	  };
	};
	
	var fetchedGameData = exports.fetchedGameData = function fetchedGameData(game) {
	  return {
	    type: _constants.FETCHED_GAME,
	    payload: game
	  };
	};
	
	var clearGame = exports.clearGame = function clearGame() {
	  return {
	    type: _constants.CLEAR_GAME
	  };
	};

/***/ }

})
//# sourceMappingURL=0.aef225fba5df89f6e82b.hot-update.js.map