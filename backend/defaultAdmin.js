const mongoose = require("mongoose");
const db ='mongodb://umarfarid1407:1234567890@ac-uj4mcmp-shard-00-00.fhjmmfl.mongodb.net:27017,ac-uj4mcmp-shard-00-01.fhjmmfl.mongodb.net:27017,ac-uj4mcmp-shard-00-02.fhjmmfl.mongodb.net:27017/?ssl=true&replicaSet=atlas-12n3mw-shard-0&authSource=admin&retryWrites=true&w=majority'

const Admin = require("./models/adminModel"); // Assuming this is the correct path to your Admin model

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminData = {
  email: "umar@gmail.com",
  password: "umar123", // In a real application, hash the password
  phoneNumber: "03001234567",
  username: "umar",
  address:"lahore",
  gender:"male",
};

const createAdmin = async () => {
    try {
      const existingAdmin = await Admin.findOne({ username: adminData.email });
  
      if (existingAdmin) {
        console.log('Admin already exists.');
      } else {
        await Admin.create(adminData);
        console.log('Admin created successfully');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    } finally {
      mongoose.disconnect();
    }
  };
  

createAdmin();
