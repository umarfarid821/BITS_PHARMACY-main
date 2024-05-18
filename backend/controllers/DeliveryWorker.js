const DeliveryWorker = require('../models/DeliveryWorkerMOdel');
const Order = require('../models/UserOrder');
const bcrypt = require('bcryptjs');

// Create a new delivery worker
const createDeliveryWorker = async (req, res) => {
  try {
    const { name, username, email, address, city, password, phoneNumber, gender } = req.body;

    const existingUser = await DeliveryWorker.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Delivery worker already exists' });
    }

    const newDeliveryWorker = new DeliveryWorker({
      username,
      name,
      email,
      password,
      phoneNumber,
      address,
      gender,
      city,
    });

    const salt = await bcrypt.genSalt(10);
    newDeliveryWorker.password = await bcrypt.hash(newDeliveryWorker.password, salt);

    await newDeliveryWorker.save();
    res.status(201).json({ message: 'Delivery worker registered successfully' });
  } catch (error) {
    console.error('Error while registering delivery worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllDeliveryWorkers = async (req, res) => {
  try {
    const deliveryWorkers = await DeliveryWorker.find();

    res.status(200).json(deliveryWorkers);
  } catch (error) {
    console.error('Error while fetching delivery workers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDeliveryWorkerById = async (req, res) => {
  const id = req.params.id;
  try {
    const deliveryWorker = await DeliveryWorker.findById(id);

    if (!deliveryWorker) {
      return res.status(404).json({ message: 'Delivery worker not found' });
    }

    res.status(200).json(deliveryWorker);
  } catch (error) {
    console.error('Error while fetching delivery worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDeliveryWorker = async (req, res) => {
  try {
    const deliveryWorkerId = req.params.id;

    const deliveryWorker = await DeliveryWorker.findById(deliveryWorkerId);

    if (!deliveryWorker) {
      return res.status(404).json({ message: 'Delivery worker not found' });
    }

    await DeliveryWorker.findByIdAndDelete(deliveryWorkerId);

    res.status(200).json({ message: 'Delivery worker deleted successfully' });
  } catch (error) {
    console.error('Error while deleting Delivery Worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const assignOrderToWorker = async (req, res) => {
  const { orderId, username } = req.params;
 
  try {
    const deliveryWorker = await DeliveryWorker.findOne({ username });
    if (!deliveryWorker) {
      return res.status(404).json({ message: 'Delivery worker not found' });
    }
    
    // Update only the assignedMedicine field
    deliveryWorker.assignedMedicine = orderId;
    await deliveryWorker.save();
    
    res.status(200).json({ message: 'Order assigned to delivery worker successfully' });
  } catch (error) {
    console.error('Error while assigning order to delivery worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getDeliveryWorkerByOrderId = async (req, res) => {
  const orderId = req.params.orderId;
  const assignedMedicine=orderId;
  try {
    const deliveryWorker = await DeliveryWorker.findOne({ assignedMedicine });
    console.log('delivery  from worker ',deliveryWorker);
    if (!deliveryWorker) {
      return res.status(200).json({ message: 'Order not  assigned to a delivery worker' });
    }
    res.status(200).json(deliveryWorker);
  }
  catch (error) {
    console.error('Error while fetching delivery worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // Extract the status from the request body
   console.log('status',status);
  try {
    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status to the provided status
    order.OrderStatus = status; // Use the provided status
    await order.save();

    // Send success response
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





module.exports = {
  createDeliveryWorker,
  getAllDeliveryWorkers,
  deleteDeliveryWorker,
  getDeliveryWorkerById,
  assignOrderToWorker,
  getDeliveryWorkerByOrderId,
  updateOrderStatus,
};
