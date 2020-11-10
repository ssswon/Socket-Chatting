import React from 'react';
import { Link } from 'react-router-dom';

const Room = React.memo(({ name }) => {
  return (
    <li>
      <div>{name}</div>
    </li>
  );
});

const RoomList = ({ nickname, loading, roomList, error, onChange }) => {
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={nickname}
          onChange={onChange}
          placeholder="닉네임을 입력하세요."
        />
      </div>
      <ul>
        {!loading &&
          roomList &&
          roomList.map((room) => (
            <Link to={`/room/${room.roomCode}`}>
              <Room name={room.roomName} />
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RoomList;
