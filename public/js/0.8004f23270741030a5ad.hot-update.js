webpackHotUpdate(0,{

/***/ 315:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_SUCCESS = "hangperson/game/FETCH_SUCCESS";
	var UPDATE_SUCCESS = "hangperson/game/UPDATE_SUCESS";
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
	    type: FETCH_SUCCESS,
	    payload: game
	  };
	};
	
	var updatedGame = exports.updatedGame = function updatedGame(game) {
	  return {
	    type: UPDATE_SUCESS,
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
//# sourceMappingURL=0.8004f23270741030a5ad.hot-update.js.map