import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './fleetPage.css';
import MapView from '../../components/map/map';

const Fleet = () => {
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
    <div className="fleet-container">
      <Navbar />
      <div className="map-container">
        <MapView />
      </div>
    </div>
  );
  
};

export default Fleet;
