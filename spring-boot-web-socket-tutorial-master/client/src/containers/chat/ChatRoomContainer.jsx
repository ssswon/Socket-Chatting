import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatRoom from '../../components/chat/ChatRoom';
import { getUserInfo, getMessage } from '../../modules/messageLog';

const sockJS = new SockJS('http://localhost:8080/ws-stomp'); // 서버의 웹 소켓 주소
const stompClient = (Stomp.Client = Stomp.over(sockJS)); //stomp Client 생성
stompClient.connect(); // 서버에 접속

const ChatRoomContainer = ({ match }) => {
  const { roomId } = match.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const { nickname } = useSelector(({ user }) => ({
    nickname: user.nickname,
  }));
  console.log(nickname);
  const onChange = (e) => {
    const { name, value } = e.target;
    setMessage(value);
  };

  const addMessage = (mesg) => {
    setMessages((prev) => [...prev, mesg]);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    //서버에 정보 전달
    stompClient.send(
      '/pub/socket/message',
      {},
      JSON.stringify({
        type: 'ROOM',
        roomCode: roomId,
        userInfo: {},
        message: message,
      })
    );
    setMessage('');
  };

  // 서버로부터 메세지를 받아옴
  // 접속했을 때 구독

  const dispatch = useDispatch();
  const stompSubscribe = () =>
    stompClient.subscribe(`/sub/socket/room/${roomId}`, (data) => {
      // 서버로부터 데이터를 받음
      const mesg = JSON.parse(data.body); // 받아온 메세지를 json형태로 parsing

      const userInfo = mesg.userInfo;
      dispatch(getUserInfo(userInfo));

      const message = mesg.message;

      const username = userInfo.username;
      dispatch(getMessage(message, username));
      addMessage(mesg); // state에 저장
    });

  useEffect(() => {
    if (!stompClient.connected) {
      stompClient.connect({}, stompSubscribe); //{}서버주소
    } else {
      stompSubscribe();
    }

    stompClient.send(
      '/pub/socket/message',
      {},
      JSON.stringify({
        type: 'JOIN',
        roomCode: roomId,
        userInfo: { username: nickname },
        message: message,
      })
    );

    return () => {
      //컴포넌트 끝
      stompClient.send(
        '/pub/socket/message',
        {},
        JSON.stringify({
          type: 'EXIT',
          roomCode: roomId,
          username: {},
          message: message,
        })
      );
      stompClient.unsubscribe();
    };
  }, [roomId]); // roomId가 바뀌면 새로운 접속

  return (
    <ChatRoom
      onSubmit={sendMessage}
      messages={messages}
      message={message}
      onChange={onChange}
      nickname={nickname}
    />
  );
};

export default withRouter(ChatRoomContainer);
