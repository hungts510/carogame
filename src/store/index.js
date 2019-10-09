/* eslint-disable import/no-unresolved */
import { createStore } from 'redux';
import gameReducer from '../reducers';

export default createStore(gameReducer);
