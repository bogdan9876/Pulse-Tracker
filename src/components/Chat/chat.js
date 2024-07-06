import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import Header from '../Header/header';
import Loader from '../Loader/loader';
import ChatList from './chatList';
import { sendMessageToServer, saveChatMessage, getChatHistory, getChatList } from '../../api'; // Added createChat
import { useSelector } from 'react-redux';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef(null);
  const token = localStorage.getItem('accessToken');
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [newChatName, setNewChatName] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatList = await getChatList();
        setChats(chatList);
        if (chatList.length > 0) {
          setSelectedChatId(chatList[0].id);
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChatId) {
        try {
          const chatHistory = await getChatHistory(selectedChatId);
          setMessages(chatHistory);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data.user);
          if (data.user.profile_picture) {
            setProfileImage(`data:image/jpeg;base64,${data.user.profile_picture}`);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const loadData = async () => {
      await Promise.all([fetchMessages(), fetchUserData()]);
      setLoading(false);
    };
    loadData();
  }, [token, selectedChatId]);

  const addMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { text: newMessage, user: 'user', profile_picture: profileImage };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setNewMessage('');

      try {
        await saveChatMessage({ message: newMessage, sender: 'user', chatId: selectedChatId });
        const data = await sendMessageToServer(newMessage);
        const serverMessage = { text: data.answer, user: 'server' };
        setMessages((prevMessages) => [...prevMessages, serverMessage]);
        await saveChatMessage({ message: data.answer, sender: 'server', chatId: selectedChatId });
      } catch (error) {
        console.error('There was a problem with sending the message:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMessage();
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API не підтримується у вашому браузері.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewMessage(transcript);
      addMessage();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleCreateChat = async () => {
    try {
      const response = await fetch('http://localhost:5000/chat/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chat_name: newChatName }), // Використовуйте введену назву чату
      });
      const data = await response.json();
      console.log('Response from server:', data);
      setChats((prevChats) => [...prevChats, { id: data.chat_id, chat_name: newChatName }]); // Оновлення стану зі списком чатів
      setSelectedChatId(data.chat_id); // Вибір новоствореного чату, якщо потрібно
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div className="ChatPage">
        <ChatList chats={chats} onSelectChat={handleSelectChat} onCreateChat={handleCreateChat} />
      </div>
      <div className="Chat">
        <div ref={chatContainerRef} className="Chat-container">
          <ul className="Chat-messages">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`Chat-message ${message.user} ${isDarkMode ? 'dark' : ''}`}
              >
                <div className="message-container">
                  <img
                    className="message-sender-photo"
                    src={
                      message.user === 'user'
                        ? userData && userData.profile_picture
                          ? profileImage
                          : '/user.jpg'
                        : '/chatbot.png'
                    }
                    alt={message.user}
                  />
                  <div className="message-content">
                    <span className="message-sender">
                      {message.user === 'user' ? 'You: ' : 'Cardia Bot: '}
                    </span>
                    {message.text}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={`Chat-input ${isDarkMode ? 'dark' : ''}`}>
          <div className="input-container66">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Write your question here"
              className={`input-field ${isDarkMode ? 'dark' : ''}`}
            />
            <button
              onClick={handleVoiceInput}
              className={`voice-input-button ${isRecording ? 'recording' : ''}`}
            >
              <img src={isDarkMode ? '/voice-dark.svg' : '/voice.svg'} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
