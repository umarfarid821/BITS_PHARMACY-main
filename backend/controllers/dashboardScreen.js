const Total = require('../models/dashboardScreen');
const Order = require('../models/UserOrder');
const Admin = require('../models/adminModel');
exports.createTotal = async (req, res) => {
    
    const { totalOrders, todayOrders, totalYesterdayOrders, totalSales } = req.body;
    console.log('totalOrders', totalOrders);
    console.log('todayOrders', todayOrders);
    console.log('totalYesterdayOrders', totalYesterdayOrders);

    try {
        const total = new Total({
            
            todayOrders,
            totalYesterdayOrders,
            totalOrders,
            totalSales
        });
        await total.save();
        res.status(201).json(total);
    } catch (err) {
        res.status(400).json({ message: err.message });


}
};

exports.getTotal = async (req, res) => {
  
     
   
    try {
        const total = await Total.findOne();
        if (!total) {
            return res.status(404).json({ message: 'Total not found' });
        }
        res.status(200).json(total);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updateTotal = async (req, res) => {
   
    const { totalOrders, todayOrders, totalYesterdayOrders , totalSales} = req.body;

    //not update by id 

    try {
        const total = await Total.findOne();
        if (!total) {
            return res.status(404).json({ message: 'Total not found' });
        }
        total.todayOrders = todayOrders;
        total.totalYesterdayOrders = totalYesterdayOrders;
        total.totalOrders = totalOrders;
        total.totalSales = totalSales;
        await total.save();
        res.status(200).json(total);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};
exports.getRecentOrders = async (req, res) => {
    try {
      // Fetch the most recent 5 orders
      const recentOrders = await Order.find({})
        .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
        .limit(5); // Limit to 5 orders
  
      res.json(recentOrders);
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  exports.getTop5ProductSales = async (req, res) => {
    try {
      const top5ProductSales = await Order.aggregate([
        { $unwind: '$cartItems' },
        { $group: { _id: '$cartItems.Productname', salesCount: { $sum: '$cartItems.Noofproducts' } } },
        { $sort: { salesCount: -1 } },
        { $limit: 5 }
      ]);
  
      const top5ProductOrders = await Order.find({ 'cartItems.Productname': { $in: top5ProductSales.map(item => item._id) } }, '_id');
      console.log('top5ProductSales:', top5ProductSales);
      res.json({ top5ProductSales, top5ProductOrderIds: top5ProductOrders.map(order => order._id) });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.getProfile= async (req, res) => {
    try {
        const email = req.email;
      
        const user = await Admin.findOne({ email
         });
    
        if (!user) {
          return res.status(404).json({ message: 'Admin not found' });
        }
    
        res.status(200).json({
          
            email: user.email,
            username: user.username,

          
        });
      } catch (error) {
        console.error('Error while fetching  adminprofile:', error);
        res.status(500).json({ message: 'Server error' });
      }
};




