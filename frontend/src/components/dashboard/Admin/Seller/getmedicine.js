// AddMedicineToStock.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Stock.css';
import MedicineCard from './MedicineCard'; // Import the MedicineCard component

const AddMedicineToStock = (props) => {
  const { sellerName } = props;
  console.log('Seller name:', sellerName);
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nooftablet, setNooftablets]= useState([]);
  const [showNextMedicine, setShowNextMedicine] = useState(false); // State to track visibility of next medicine card

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      const token = localStorage.getItem("token");
      console.log('token',token);
      try {
        const response = await axios.get(`http://localhost:5000/api/seller/${sellerName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setMedicines(response.data);
        setQuantities(new Array(response.data.length).fill(0));
        setPrices(new Array(response.data.length).fill(0));
        setNooftablets(new Array(response.data.length).fill(0));
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    fetchMedicineDetails();
  }, []);

  const handleSubmit = async (e, medicineIndex) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post('http://localhost:5000/api/medicine/addmedicinetostock', {
        medicineId: medicines[medicineIndex]._id,
        medicineName: medicines[medicineIndex].medicinename,
        adminmedicinequantity: quantities[medicineIndex],
        adminmedicineprice: prices[medicineIndex],
        medicinecategory: medicines[medicineIndex].medicinecategory,
        expiryDate: medicines[medicineIndex].expiryDate,
        manufacturingDate: medicines[medicineIndex].manufacturingDate,
        madeIn: medicines[medicineIndex].madeIn,
        sellerName: medicines[medicineIndex].sellername,
        nooftablets: nooftablet[medicineIndex],
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setQuantities([...quantities.slice(0, medicineIndex), 0, ...quantities.slice(medicineIndex + 1)]);
        setPrices([...prices.slice(0, medicineIndex), 0, ...prices.slice(medicineIndex + 1)]);
        setNooftablets([...nooftablet.slice(0, medicineIndex), 0, ...nooftablet.slice(medicineIndex + 1)]);

        window.alert('Medicine added to stock successfully!');
        setShowNextMedicine(true); // Show next medicine card
      }
    } catch (error) {
      console.error('Add to stock error:', error);
      setError('Failed to add medicine to stock. Please try again.');
      window.alert('Failed to add medicine to stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-medicine-card  slide">
      <div className="card-header">
        <h2>Add Medicine to the Stock</h2>
        {medicines.length === 0 ? (
          <p>No medicine available from the seller.</p>
        ) : (
          <ul>
            {medicines.map((medicine, index) => (
              <div key={medicine._id}>
                <MedicineCard
                  medicine={medicine}
                  index={index}
                  handleSubmit={handleSubmit}
                  quantities={quantities}
                  setQuantities={setQuantities}
                  prices={prices}
                  setPrices={setPrices}
                  nooftablet={nooftablet}
                  setNooftablets={setNooftablets}
                  loading={loading}
                  error={error}
                />
                {showNextMedicine && index === medicines.length - 1 && (
                  <MedicineCard
                    medicine={medicine} // Pass the last medicine again for the next card
                    index={index + 1} // Use the next index for the next card
                    handleSubmit={handleSubmit}
                    quantities={quantities}
                    setQuantities={setQuantities}
                    prices={prices}
                    setPrices={setPrices}
                    nooftablet={nooftablet}
                    setNooftablets={setNooftablets}
                    loading={loading}
                    error={error}
                  />
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddMedicineToStock;
