require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/login_register');
const AdminProfile=require('./routes/adminProfile');
const sellerRoutes = require('./routes/sellerRoutes');
const medicineRoutes=require('./routes/medicine');
const ProductCart = require('./routes/productCart');
const UserOrder = require('./routes/UserOrder');
const Feedback = require('./routes/feedback');
const DeliveryWorker = require('./routes/deliveryWorker');
const DashboardScreen = require('./routes/dashboardScreen');
const app = express();

const path = require('path');
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//database
const db = require('./db');
db.connect();

// Routes
app.use('/api/user', authRoutes);
app.use('/api/admin',AdminProfile);
app.use('/api/seller', sellerRoutes);
app.use('/api/medicine',medicineRoutes);
app.use('/api/cart', ProductCart);
app.use('/api/order', UserOrder);
app.use('/api/feedback', Feedback);
app.use('/api/deliveryWorker', DeliveryWorker);
app.use('/api/dashboard', DashboardScreen);

app.use('/uploads', express.static('uploads'));
// Start server
const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server is running on port ${port}`));
