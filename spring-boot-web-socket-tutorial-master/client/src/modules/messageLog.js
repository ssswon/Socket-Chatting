import createActionTypes from '../lib/createActionTypes';

// action type 지정
const GET_USERINFO = 'messageLog/GET_USERINFO';
const GET_MESSAGE = 'messageLog/GET_MESSAGE';
//action함수 정의
export const getUserInfo = ({
  userNo,
  username,
  locationId,
  hasVoted,
  voteNum,
  missionList,
  dead,
  baesinzer,
}) => ({
  type: GET_USERINFO,
  payload: {
    userNo,
    username,
    locationId,
    hasVoted,
    voteNum,
    missionList,
    dead,
    baesinzer,
  },
});

//
export const getMessage = (message, username) => ({
  type: GET_MESSAGE,
  payload: {
    message,
    username,
  },
});
//state값 정의
const initialState = {
  userInfo: {
    userNo: null,
    username: null,
    locationId: null,
    hasVoted: null,
    voteNum: null,
    missionList: null,
    dead: null,
    baesinzer: null,
  },
  messages: [
    {
      message: '',
      username: null,
    },
  ],
};

//리듀서 정의
const messageLog = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERINFO:
      return {
        ...state,
        userInfo: {
          userNo: action.payload.userNo,
          username: action.payload.username,
          locationId: action.payload.locationId,
          hasVoted: action.payload.hasVoted,
          voteNum: action.payload.voteNum,
          missionList: action.payload.missionList,
          dead: action.payload.dead,
          baesinzer: action.payload.baesinzer,
        },
      };
    case GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat({
          message: action.payload.message,
          username: action.payload.username,
        }),
      };
    default:
      return state;
  }
};
export default messageLog;
