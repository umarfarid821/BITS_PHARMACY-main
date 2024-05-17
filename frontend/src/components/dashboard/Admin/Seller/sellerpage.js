import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import SellerList from "./showsellers";
import Navbar from"../Admina_Savbar";
import './seller.css'; // Import your custom CSS file here

const CreateSeller= ({ }) => {
    
    return (
        <div className="seller-scroll bg-light ">
            <Navbar />
           <SellerList/>
          
        <div>
           

            </div>
</div>
    )
}

export default CreateSeller;
