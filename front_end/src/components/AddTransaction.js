import React, { useState } from 'react';
import './AddTransaction.css';

function AddTransaction() {

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/add_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Form submitted successfully');
        // After processing, reset the form state
        setFormData({
          amount: '',
          category: '',
          description: '',
        });
        alert("You have successfully submitted a transaction")
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedOption(selectedCategory);
    setFormData({ ...formData, category: selectedCategory });
  };  

  return (
    <div>
      <h1 className="centered"> Add Transaction </h1>
      <div className="line"></div>
      <div className="container-form">
        <form className="my-form" onSubmit={handleSubmit}>
          <div className="form-group"> 
            <label style={{fontSize: 25}}>
              Amount:
              <input style={{ height: '30px', width: '400px', marginLeft: 15, fontSize: 18}} type="text" 
              name="amount" placeholder="Enter amount here" value={formData.amount} onChange={handleChange} />
            </label>
          </div>

          <div className="form-group"> 
            <label style={{fontSize: 25}} htmlFor="dropdown">
              Category:
  
            </label>
            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
              <option value="">-- Select an option --</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="form-group"> 
            <label style={{fontSize: 25}}>
              Description:
              <input style={{ height: '150px', width: '400px', marginLeft: 15, fontSize: 18}} type="text" 
              name="description" placeholder="Enter description here" value={formData.description} onChange={handleChange} />
            </label>
          </div>
          <button class="submit-button" type="submit">ADD</button>
        </form>
      </div>
      
    </div>
  );
}

export default AddTransaction;
