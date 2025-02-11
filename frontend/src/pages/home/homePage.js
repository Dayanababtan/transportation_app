import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './homePage.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActions';


const Home = () => {
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

  const cardData = [
    { title: "Chat", image: require("../../images/chat_icon.png")},
    { title: "Fleet", image: require("../../images/map_icon.png")},
    { title: "Drivers", image: require("../../images/driver_icon.png")},
    { title: "Invoices", image: require("../../images/invoice_icon.png")},
    { title: "Trucks", image: require("../../images/truck_icon2.png")},
    { title: "Hauls", image: require("../../images/haul_icon.png")},
  ]

  const renderCard = (data, id) => (
    <Card 
      key={id} 
      style={{ display: "flex", 
        flexDirection: "column", 
        alignItems: "center",  // Centers items horizontally
        justifyContent: "center", 
        width: 350, height: 330, backgroundColor: "#c1eaf2" }}
    >
      <CardActionArea onClick={() => console.log(`${data.title} CLICKED`)} style={{ cursor: "pointer" }} >
        <CardContent style={{ textAlign: "center" }}>
          <img 
            src={data.image} 
            alt={data.title} 
            style={{height: "120px", marginBottom: "10px" }} 
          />
          <Typography 
            style={{ fontSize: 18, fontWeight: "bold" }} 
            color="textPrimary"
          >
            {data.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  

  return (
    <div className="home-container">
      <Navbar />
      <div className="card-container">
      {cardData.map((data, index) => renderCard(data, index))}
      </div>
    </div>
  );
};

export default Home;
