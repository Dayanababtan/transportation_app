const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const uri = 'mongodb+srv://babtandayana2:fgqitiace2UlTxxP@cluster0.w7qgva7.mongodb.net/';
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db('transportation_appDB');
    }
    return db;
}

router.get('/drivers', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const drivers = await db.collection('drivers').find({}).toArray();
        res.status(200).json(drivers);
    } catch (err) {
        console.error('Error fetching drivers:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const { driverPhoneNumber, driverPassword } = req.body; 
  
    try {
        const db = await connectToDatabase();
        const drivers = db.collection('drivers');
        
        const user = await drivers.findOne({ driverPhoneNumber });

        if (!user) {
            console.log('driverPhoneNumber: ', driverPhoneNumber);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        if (driverPassword !== user.driverPassword) {
            console.log('password: ', driverPassword);
            console.log('userPassword: ', user.driverPassword);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        res.json({ token });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).send('Server error');
    }
});



module.exports = router;
