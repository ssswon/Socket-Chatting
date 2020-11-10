import React from 'react';

const Message = React.memo(({ nickname, message }) => {
  return (
    <li>
      {nickname}: {message}
    </li>
  );
});

const ChatRoom = ({ messages, onSubmit, onChange, message, nickname }) => {
  return (
    <div>
      <div>
        <ul>
          {messages &&
            messages.map((message) => (
              <Message nickname={nickname} message={message.message} />
            ))}
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" name="message" onChange={onChange} value={message} />
        <button>보내기</button>
      </form>
    </div>
  );
};

export default ChatRoom;
