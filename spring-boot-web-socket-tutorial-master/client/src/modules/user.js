import { createAction, handleActions } from 'redux-actions';

const SET_NICKNAME = 'user/SET_NICK_NAME';

export const setNickname = createAction(SET_NICKNAME, (nickname) => nickname);

const initialState = {
  nickname: '',
};

const user = handleActions(
  {
    [SET_NICKNAME]: (state, { payload: nickname }) => ({
      nickname,
    }),
  },
  initialState
);

export default user;
