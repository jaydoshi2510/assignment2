const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const cart= require('./cart');
const comment = require('./comment');
const order = require('./order');
const product = require('./product');
const user = require('./user');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/your-database-name';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/carts', cart);
app.use('/api/comments', comment);
app.use('/api/orders', order);
app.use('/api/products', product);
app.use('/api/users', user);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
