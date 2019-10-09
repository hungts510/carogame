import {
  PLACE, RESET, SET_WINNER, JUMP_TO,
} from './actionTypes';

export function place(index) {
  return { type: PLACE, index };
}

export function reset() {
  return { type: RESET };
}

export function setWinner(winner) {
  return { type: SET_WINNER, winner };
}

export function jumpTo(step) {
  return { type: JUMP_TO, step };
}
