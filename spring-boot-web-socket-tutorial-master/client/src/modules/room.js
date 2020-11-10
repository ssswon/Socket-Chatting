import { createAction, handleActions } from 'redux-actions';
import createActionTypes from '../lib/createActionTypes';
import createRequestSaga from '../lib/createRequestSaga';
import * as roomsAPI from '../lib/api/rooms';
import { takeLatest } from 'redux-saga/effects';

const [
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
] = createActionTypes('room/CREATE_ROOM');

const [JOIN_ROOM, JOIN_ROOM_SUCCESS, JOIN_ROOM_FAILURE] = createActionTypes(
  'JOIN_ROOM'
);

export const createRoom = createAction(CREATE_ROOM, ({ name }) => ({
  name,
}));

export const joinRoom = createAction(JOIN_ROOM, ({ roomId }) => ({
  roomId,
}));

const createRoomSaga = createRequestSaga(CREATE_ROOM, roomsAPI.createRoom);
const joinRoomSaga = createRequestSaga(JOIN_ROOM, roomsAPI.joinRoom);

export function* roomSaga() {
  yield takeLatest(CREATE_ROOM, createRoomSaga);
  yield takeLatest(JOIN_ROOM, joinRoomSaga);
}

const initialState = {
  room: {
    roomId: null,
    name: null,
  },
  error: null,
};

const room = handleActions(
  {
    [CREATE_ROOM_SUCCESS]: (state, { payload: { roomId, name } }) => ({
      ...state,
      room: {
        roomId,
        name,
      },
      createError: null,
    }),
    [CREATE_ROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      room: null,
      error,
    }),
    [JOIN_ROOM_SUCCESS]: (state, { payload: { roomId, name } }) => ({
      ...state,
      room: {
        roomId,
        name,
      },
      error: null,
    }),
    [JOIN_ROOM_FAILURE]: (state, { payload: { error } }) => ({
      ...state,
      room: null,
      error,
    }),
  },
  initialState
);

export default room;
