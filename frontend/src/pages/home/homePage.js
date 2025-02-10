import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import './homePage.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

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

  return (
    <div className='home-container'>
    <div>
      <Navbar/>
      <h1>Welcome to the Home Page!</h1>
      <Card
                style={{
                    width: 400,
                    backgroundColor: "yellow",
                }}
            >
                <CardContent>
                    <Typography
                        style={{ fontSize: 14 }}
                        color="textSecondary"
                        gutterBottom
                    >
                        Greetings of the day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        How are you ?
                    </Typography>
                    <Typography
                        style={{
                            marginBottom: 12,
                        }}
                        color="textSecondary"
                    >
                        Keep Motivated
                    </Typography>
                    <Typography variant="body2" component="p">
                        Stay Happy
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Stay Safe.....</Button>
                </CardActions>
            </Card>
    </div>
    </div>
  );
};

export default Home;