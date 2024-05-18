import React from "react";
import {BrowserRouter,Routes ,Route, } from 'react-router-dom';

import LandingPage from './LoginForm';
import RegisterationForm from './RegisterationForm';
import Userdashboard from './components/dashboard/User/Userdashboard';
import AdminDashboard from './components/dashboard/Admin/Admindashboard';
import AdminProfile from './components/dashboard/Admin/Profile/profile';
import EditProfile from './components/dashboard/Admin/Profile/editProfile';
import AddProfile from './components/dashboard/Admin/Profile/addpic';
import ShowProfile from './components/dashboard/Admin/Profile/showpic';
import CreateAdmin from './components/dashboard/Admin/CDAdmin/createAdmin';
import Dashboard from './components/dashboard/Admin/CDAdmin/dashboard';
import ShowAdmin from './components/dashboard/Admin/CDAdmin/Showadmin';
import SellerPage from './components/dashboard/Admin/Seller/sellerpage';
import CreateSeller from './components/dashboard/Admin/Seller/createSeller';
import SellerDetails from "./components/dashboard/Admin/Seller/Aseller";
import SellerDashboard from "./components/dashboard/Admin/Seller/sellerDashboard";
import AdminSeller from "./components/dashboard/Admin/Seller/adminSeller";
import AddMedicineToStock from "./components/dashboard/Admin/Seller/addmedicinestock";
import ShowStockMedicine from "./components/dashboard/Admin/Stock/stock";
import UserStockMedicine from "./components/dashboard/User/Medicines/UserMedicines";
import NewWorker from "./components/dashboard/Admin/DeliveryWorker/NewWorker";
import { useState } from "react";
import CartDisplay from "./components/dashboard/User/Medicines/CartDisplay";
import Shipping from "./components/dashboard/User/OrderShipping/Shipping";
import PastOrders from "./components/dashboard/User/OrderShipping/PastOrder";
import OrderList from "./components/dashboard/Admin/Medicine/Order";
import UserFeedback from "./components/dashboard/User/OrderShipping/UserFeedback";
import DeliveryWorker from "./components/dashboard/Admin/DeliveryWorker/CreateWorker";
import Seefedback from "./components/dashboard/Admin/Feedback";
import OnlyProfile  from './components/dashboard/Admin/Profile/OnlyProfile';
import AboutPage from './components/dashboard/User/About';
const App = ()=>{
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); 
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage  setToken={setToken} setUserId={setUserId} />}/>
        
        <Route path="/register" element={<RegisterationForm  setToken={setToken} />}/>
        <Route path="/user_dashboard" element={<Userdashboard/>}/>
        <Route path="/admin_dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/profile" element={<AdminProfile/>}/>
        <Route path="/admin/editprofile" element={<EditProfile/>}/>
        <Route path="/admin/addprofile" element={<AddProfile/>}/>
        <Route path="/admin/showprofile" element={<ShowProfile/>}/>
        <Route path="/admin/createsellercomponent" element={<CreateSeller/>}/>
        <Route path="/admin/adminpannel" element={<Dashboard/>}/>

        <Route path="/admin/create" element={<CreateAdmin/>}/>
        <Route path="/admin/see-all" element={<ShowAdmin/>}/>
        <Route path="/admin/createseller" element={<SellerPage/>}/>
        <Route path="/admin/showseller/:sellerId" element={<SellerDetails />} />

        <Route path="/admin/sellerdashboard" element={<SellerDashboard/>}/>
        <Route path="/admin/showadminseller/:sellerId" element={<AdminSeller/>}/>
       
        <Route path="/admin/addmedicine/:medicineId/:medicineName" element={<AddMedicineToStock/>}/>
        <Route path="/admin/showstockmedicine" element={<ShowStockMedicine/>}/>
        <Route path="/admin/order" element={<OrderList/>}/>
        <Route path="/admin/newworker" element={<NewWorker/>}/>

 <Route path="/admin/onlyprofile" element={<OnlyProfile/>}/>
        <Route path="/admin/deliveryworker" element={<DeliveryWorker/>}/>
        <Route path="/admin/feedback" element={<Seefedback/>}/>


        <Route path="/user/stockmedicines" element={<UserStockMedicine/>}/>
        <Route path="/user/cart" element={<CartDisplay/>}/>
        <Route path="/user/shipping" element={<Shipping/>}/>
        <Route path="/user/pastorders" element={<PastOrders/>}/>
        <Route path="/user/feedback" element={<UserFeedback/>}/>
        <Route path="/user/about" element={<AboutPage/>}/>
      </Routes>
      
      </BrowserRouter>

    </div>
  )
}

export default App;