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

router.get('/dispatcher', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const dispatchers = await db.collection('dispatchers').find({}).toArray();
        res.status(200).json(dispatchers);
    } catch (err) {
        console.error('Error fetching dispatchers:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const { dispatcherPhoneNumber, dispatcherPassword } = req.body; // Corrected field names
  
    try {
        const db = await connectToDatabase();
        const dispatchers = db.collection('dispatchers');
        
        // Corrected field names for matching in the database
        const user = await dispatchers.findOne({ dispatcherPhoneNumber });

        if (!user) {
            console.log('dispatcherPhoneNumber: ', dispatcherPhoneNumber);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        if (dispatcherPassword !== user.dispatcherPassword) {
            console.log('password: ', dispatcherPassword);
            console.log('userPassword: ', user.dispatcherPassword);
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
