import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './chat.css'

const Chat = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (!token) {
    return null;
  }

  const chats = [
    { name: "Chat 1", description: "This is the first chat." },
    { name: "Chat 2", description: "This is the second chat." },
    { name: "Chat 3", description: "This is the third chat." },
    { name: "Chat 4", description: "This is the fourth chat." },
    { name: "Chat 5", description: "This is the fifth chat." }
  ];

  return (
    <div className="ChatPage">
      <Navbar></Navbar>
    <div className="chat-container">
      
      <div className="sidebar">
      <form className="search-input-form">
          <input
            placeholder="Search a contact"
            className="search-input"
          />
          <button type="submit" className="send-button" width="50px">Search</button>
          </form>
        <h2 className="conversations text-white" >Conversations</h2>
        <div className="chat-cards">
          {chats.length === 0 ? (
            <p>No chats available</p>
          ) : (
            chats.map((chat, index) => (
              <div
                key={index}
                className="chat-card"
              >
                <h3 className="chat-title">{chat.name}</h3>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="main-chat-area">
        <div className="header"></div>
        <div className="message-input-container">
        <form className="message-input-form">
          <input
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
        </div>
      </div>

      
    </div>
    </div>
  );
};

export default Chat;
