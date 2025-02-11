import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

const Invoices = () => {
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
    <div className="invoices-container">
      <Navbar />
    </div>
  );
};

export default Invoices;
