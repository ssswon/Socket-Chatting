import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import room, { roomSaga } from './room';
import roomList, { roomListSaga } from './roomList';
import messageLog from './messageLog';
import user from './user';

const rootReducer = combineReducers({
  loading,
  room,
  roomList,
  user,
  messageLog,
});

export const rootSaga = function* () {
  yield all([roomSaga(), roomListSaga()]);
};

export default rootReducer;
