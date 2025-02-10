const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const router = express.Router();

app.use(cors());

app.use(router);

app.use(express.json());

const dispatchersRoutes = require('./models/dispatcher');
const driversRoutes = require('./models/drivers');

app.use('/dispatcher', dispatchersRoutes);
app.use('/drivers', driversRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend');
});

app.listen(port, () => {
    console.log('Server running on port 5000');
});


module.exports = router;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;