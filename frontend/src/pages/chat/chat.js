import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

const Chat = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="chat-container">
      <Navbar />
    </div>
  );
};

export default Chat;
