import { createAction, handleActions } from 'redux-actions';
import createActionTypes from '../lib/createActionTypes';
import createRequestSaga from '../lib/createRequestSaga';
import * as roomsAPI from '../lib/api/rooms';
import { takeLatest } from 'redux-saga/effects';

const [
  GET_ROOM_LIST,
  GET_ROOM_LIST_SUCCESS,
  GET_ROOM_LIST_FAILURE,
] = createActionTypes('roomList/GET_ROOM_LIST');

const UNLOAD_ROOM_LIST = 'roomList/UNLOAD_ROOM_LIST';

export const getRoomList = createAction(GET_ROOM_LIST);
export const unloadRoomList = createAction(UNLOAD_ROOM_LIST);

const initialState = {
  roomList: [],
  error: null,
};

const getRoomListSaga = createRequestSaga(GET_ROOM_LIST, roomsAPI.getRoomList);

export function* roomListSaga() {
  yield takeLatest(GET_ROOM_LIST, getRoomListSaga);
}

const roomList = handleActions(
  {
    [GET_ROOM_LIST_SUCCESS]: (state, { payload: roomList }) => ({
      ...state,
      roomList: roomList,
      error: null,
    }),
    [GET_ROOM_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      roomList: [],
      error: error,
    }),
    [UNLOAD_ROOM_LIST]: () => initialState,
  },
  initialState
);

export default roomList;
