import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import Header from '../Header/header';
import { sendMessageToServer, saveChatMessage, getChatHistory } from '../../api';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const chatHistory = await getChatHistory();
                setMessages(chatHistory);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchMessages();
    }, []);

    const addMessage = async () => {
        if (newMessage.trim() !== '') {
            const userMessage = { text: newMessage, user: 'user' };
            const updatedMessages = [...messages, userMessage];
            setMessages(updatedMessages);
            setNewMessage('');

            try {
                await saveChatMessage({ message: newMessage, sender: 'user' });
                const data = await sendMessageToServer(newMessage);
                const serverMessage = { text: data.answer, user: 'server' };
                setMessages(prevMessages => [...prevMessages, serverMessage]);
                await saveChatMessage({ message: data.answer, sender: 'server' });
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

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setNewMessage(transcript);
            addMessage();
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        recognition.start();
    };

    return (
        <>
            <Header />
            <div className="Chat">
                <div ref={chatContainerRef} className="Chat-container">
                    <ul className="Chat-messages">
                        {messages.map((message, index) => (
                            <li key={index} className={`Chat-message ${message.user}`}>
                                <div className="message-container">
                                    <img
                                        className="message-sender-photo"
                                        src={message.user === 'user' ? '/user.jpg' : '/chatbot.png'}
                                        alt={message.user} />
                                    <div className="message-content">
                                        <span className="message-sender">{message.user === 'user' ? 'You: ' : 'Cardia Bot: '}</span>
                                        {message.text}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Chat-input">
                    <div className="input-container66">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Write your question here"
                            className="input-field" />
                        <button onClick={handleVoiceInput} className="voice-input-button">🎤</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;