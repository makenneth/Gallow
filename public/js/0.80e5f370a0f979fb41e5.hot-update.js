webpackHotUpdate(0,{

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
	    default:
	      return state;
	  }
	
	  return state;
	};
	
	var fetchedGameData = exports.fetchedGameData = function fetchedGameData(game) {
	  return {
	    type: FETCH,
	    payload: game
	  };
	};
	
	var updatedGame = exports.updatedGame = function updatedGame(game) {
	  return {
	    type: UPDATED_GAME,
	    payload: game
	  };
	};
	
	var clearGame = exports.clearGame = function clearGame() {
	  return {
	    type: CLEAR_GAME
	  };
	};

/***/ }

})
//# sourceMappingURL=0.80e5f370a0f979fb41e5.hot-update.js.map