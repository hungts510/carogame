/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import { combineReducers } from 'redux';
import {
  PLACE, RESET, SET_WINNER, JUMP_TO,
} from '../actions/actionTypes';

const initialState = {
  history: [{
    squares: Array(400).fill(null),
    newMove: null,
  }],
  stepNumber: 0,
  colors: Array(400).fill(false),
  xIsNext: true,
};

function game(state = initialState, actions) {
  switch (actions.type) {
    case PLACE: {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (squares[actions.index] !== null) return state;
      squares[actions.index] = state.xIsNext ? 'X' : 'O';
      return {
        ...state,
        history: history.concat([{
          squares,
          newMove: actions.index,
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      };
    }
    case RESET:
      return {
        ...state,
        history: [{
          squares: Array(400).fill(null),
          newMove: null,
        }],
        stepNumber: 0,
        colors: Array(400).fill(false),
        xIsNext: true,
      };
    case JUMP_TO:
      return {
        ...state,
        stepNumber: actions.step,
        colors: Array(400).fill(false),
        xIsNext: (actions.step % 2) === 0,
      };
    case SET_WINNER:
      return {
        ...state,
        // ???
      };
    default:
      return state;
  }
}

export default combineReducers({
  game,
});
