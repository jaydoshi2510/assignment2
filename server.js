const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const user = require('./routes/user');
const product = require('./routes/product');
const cart= require('./routes/cart');
const comment = require('./routes/comment');
const order = require('./routes/order');

const app = express();
const PORT = 8080;

// Body Parser
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://jaydoshi687:G8eGWwl0pCOTJTzP@cluster0.mycoebm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define Routes
app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/carts', cart);
app.use('/api/comments', comment);
app.use('/api/orders', order);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
