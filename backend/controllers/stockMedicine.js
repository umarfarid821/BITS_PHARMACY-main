const StockMedicine = require('../models/stockMedicine');

const AddMedicine= async (req,res)=> {

   


    try {
        const {medicineId,medicineName, nooftablets,sellerName, adminmedicineprice, adminmedicinequantity ,  medicinecategory , expiryDate,manufacturingDate,madeIn } = req.body;
         //get admin name from header passed by request
         console.log('req',req.email);
        const adminEmail = req.email;
        console.log('admin',adminEmail);
        const newMedicine = new StockMedicine({
            medicineId,
            adminEmail,
            adminmedicineprice,
            adminmedicinequantity,
            medicinecategory,
            expiryDate,
            manufacturingDate,
            madeIn,
            medicineName,
            sellerName,
            nooftablets,

        });
        await newMedicine.save();
        res.status(201).json({message: 'Medicine added successfully'});
    } catch (error) {
        console.error('Error while adding medicine:', error);
        res.status(500).json({message: 'Server error'});
    }
}

const getAllMedicines = async (req, res) => {
    try {
        const medicine = await StockMedicine.find();
        res.status(200).json(medicine);
    } catch (error) {
        console.error('Error while fetching medicine:', error);
        res.status(500).json({message: 'Server error'});
    }
};

const getMedicineById = async (req, res) => {
    try {
        const medicine = await StockMedicine.findById(req.params.id);
        res.status(200).json(medicine);
    }
    catch (error) {
        console.error('Error while fetching medicine:', error);
        res.status(500).json({message: 'Server error'});
    }
}

//update medine by its price and quantity
const updateMedicine = async (req, res) => {
    try {
      const { adminmedicinequantity, adminmedicineprice, nooftablets } = req.body;
        const adminEmail = req.email;
      // Assuming you have the appropriate fields in your StockMedicine model
      const updatedMedicine = await StockMedicine.findByIdAndUpdate(
        req.params.id,
        {
          adminmedicinequantity,
          adminmedicineprice,
          nooftablets,
            adminEmail
        },
        { new: true } // This ensures that you get the updated document in the response
      );
  
      if (!updatedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
  
      res.status(200).json({ message: 'Medicine updated successfully', updatedMedicine });
    } catch (error) {
      console.error('Error while updating medicine:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteMedicine = async (req, res) => {
    try {
      const medicine = await
      StockMedicine.findByIdAndDelete(req.params.id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json({ message: 'Medicine deleted successfully' });
    }
    catch (error) {
      console.error('Error while deleting medicine:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }


module.exports = {
    AddMedicine,
    getAllMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};