const express = require('express');
const router = express.Router();
const deliveryWorkerController = require('../controllers/DeliveryWorker');
const { authenticateToken } = require('../middlewares/auth'); 


// Create a new delivery worker
router.post('/createdeliveryworkers', authenticateToken, deliveryWorkerController.createDeliveryWorker);

// Get all delivery workers
router.get('/getdeliveryworkers', authenticateToken, deliveryWorkerController.getAllDeliveryWorkers);

// Get a specific delivery worker by ID
router.get('/adeliveryworkers/:id', deliveryWorkerController.getDeliveryWorkerById);

router.put('/put/:orderId/:username', authenticateToken, deliveryWorkerController.assignOrderToWorker);
// Update a delivery worker by ID (if needed)
// router.put('/deliveryworkers/:id', deliveryWorkerController.updateDeliveryWorkerById);

// Delete a delivery worker by ID
router.delete('/deletedeliveryworkers/:id', authenticateToken, deliveryWorkerController.deleteDeliveryWorker);
router.get('/getbyorderid/:orderId', authenticateToken, deliveryWorkerController.getDeliveryWorkerByOrderId);
router.put('/updatestatus/:orderId',  deliveryWorkerController.updateOrderStatus);
// Get medicine by delivery worker's name

module.exports = router;
