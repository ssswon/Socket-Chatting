import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RoomList from '../../components/chat/RoomList';
import { getRoomList, unloadRoomList } from '../../modules/roomList';
import { setNickname } from '../../modules/user';

const RoomListContainer = () => {
  const { nickname, loading, roomList, error } = useSelector(
    ({ loading, roomList, user }) => ({
      loading: loading['roomList/GET_ROOM_LIST'],
      roomList: roomList.roomList,
      nickname: user.nickname,
      error: roomList.error,
    })
  );

  const dispatch = useDispatch();

  const changeNickname = (e) => {
    const inputNickname = e.target.value;
    dispatch(setNickname(inputNickname));
  };

  useEffect(() => {
    dispatch(getRoomList());

    return () => dispatch(unloadRoomList());
  }, [dispatch]);

  return (
    <RoomList
      nickname={nickname}
      loading={loading}
      error={error}
      roomList={roomList}
      onChange={changeNickname}
    />
  );
};

export default withRouter(RoomListContainer);
