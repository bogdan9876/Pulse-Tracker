import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { sendMessage } from '../../api';
import './chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const chatContainerRef = useRef(null);

    const addMessage = async () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = [...messages, { text: newMessage, user: 'user' }];
            setMessages(updatedMessages);
            setNewMessage('');
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

            setIsGenerating(true);

            try {
                const serverMessage = await sendMessage(newMessage);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setMessages(prevMessages => [...prevMessages, serverMessage]);
                localStorage.setItem('chatMessages', JSON.stringify([...messages, serverMessage]));
            } catch (error) {
                console.error('There was a problem with sending the message:', error);
            } finally {
                setIsGenerating(false);
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

    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    return (
        <div className="Chat">
            <div ref={chatContainerRef} className="Chat-container">
                <ul className="Chat-messages">
                    {messages.map((message, index) => (
                        <li key={index} className={`Chat-message ${message.user}`}>
                            <div className="message-container">
                                <img
                                    className="message-sender-photo"
                                    src={message.user === 'user' ? '/images/user.png' : '/images/chatbot.png'}
                                    alt={message.user}
                                />
                                <div className="message-content">
                                    <span className="message-sender">{message.user === 'user' ? 'You: ' : 'Chatbot: '}</span>
                                    {message.text}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="Chat-input">
                <div className="input-container">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Напишіть повідомлення..."
                        className="input-field"
                    />
                    <button className="send-button" onClick={addMessage}>
                        <div className="icon-container">
                            <FaPaperPlane className="plane-icon" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
