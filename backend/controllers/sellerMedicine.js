const Medicine = require('../models/sellerMedicine');
const AddMedicine = async (req, res) => {

    try {
        const { medicinename, medicinecategory, expiryDate, manufacturingDate, madeIn, price, sellername, specification } = req.body;
        const newMedicine = new Medicine({
            medicinename,
            medicinecategory,
            expiryDate,
            manufacturingDate,
            madeIn,
            price,
            sellername,
            specification
        });
        await newMedicine.save();
        res.status(201).json({ message: 'Medicine added successfully' });
    } catch (error) {
        console.error('Error while adding medicine:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllMedicines = async (req, res) => {
    try {
        const medicine = await Medicine.find();
        res.status(200).json(medicine);
    } catch (error) {
        console.error('Error while fetching medicine:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        res.status(200).json(medicine);
    } catch (error) {
        console.error('Error while fetching medicine:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMedicineBySellerName = async (req, res) => {
    try {
      const sellername = req.params.sellerName; // Assuming the sellerName is part of the route parameters
      const medicines = await Medicine.find({ sellername: sellername });
  
      if (!medicines || medicines.length === 0) {
        return res.status(404).json({ message: 'Medicines not found for the given sellerName' });
      }
  
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Error while fetching medicines by sellerName:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


module.exports = {
    AddMedicine,
    getAllMedicines,
    getMedicineById,
    getMedicineBySellerName
};