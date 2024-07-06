import React from 'react';
import './chatList.css';

const ChatList = ({ chats, onSelectChat, onCreateChat }) => {
  const handleCreateChat = () => {
    onCreateChat();
  };

  return (
    <div className="ChatList">
      <ul className="ChatList-items">
        {chats.map((chat) => (
          <li key={chat.id} className="ChatList-item" onClick={() => onSelectChat(chat.id)}>
            <div className="chat-info">
              <span className="chat-title">{chat.chat_name}</span>
              <span className="chat-last-message">{chat.lastMessage}</span>
            </div>
          </li>
        ))}
        <li className="ChatList-item create-chat-item" onClick={handleCreateChat}>
          <div className="chat-info">
            <span className="chat-title">+</span>
            <span className="chat-last-message">Create New Chat</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ChatList;