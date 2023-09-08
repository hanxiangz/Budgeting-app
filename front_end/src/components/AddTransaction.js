import React, { useState } from 'react';
import './AddTransaction.css';


function AddTransaction() {

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
  });

  const [amountValidationMessage, setAmountValidationMessage] = useState('');
  const [categoryValidationMessage, setCategoryValidationMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedOption(selectedCategory);
    setFormData({ ...formData, category: selectedCategory });
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the input value is a valid number using a regular expression
    if (name === 'amount') {
      if (/^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) >= 0) {
        setAmountValidationMessage('');
      } else {
        setAmountValidationMessage('Please enter a valid number');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if the amount entered is not a number, prevent form submission 
    if (amountValidationMessage) {
      return;
    }
    // Check if the "category" input is empty
    if (!formData.category.trim()) {
      setCategoryValidationMessage('Please select a category');
      return;
    }

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
        setCategoryValidationMessage('');
        setSelectedOption('');
        alert("You have successfully submitted a transaction")
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <h1 className="centered"> Add Transaction </h1>
      <div className="line"></div>
      <div className="container-form">
        <form className="my-form" onSubmit={handleSubmit}>
          <div className="form-group"> 
            <label style={{fontSize: 25}}>
              Amount($):
              <input style={{ height: '30px', width: '400px', marginLeft: 15, fontSize: 18}} type="text"
              name="amount" placeholder="Enter amount here" value={formData.amount} onChange={handleChange} />
              {amountValidationMessage && (
                <p style={{ color: 'red' }}>{amountValidationMessage}</p>
              )}
            </label>
          </div>

          <div className="form-group"> 
            <label style={{fontSize: 25}} htmlFor="dropdown">
              Category:
  
            </label>
            <select id="dropdown" value={selectedOption} onChange={handleSelectChange} 
              style={{ height: '30px', width: '400px', marginLeft: 15 }}>
              <option value="">-- Select an option --</option>
              <option value="food">Food</option>
              <option value="bills">Bills</option>
              <option value="transport">Transport</option>
              <option value="healthcare">Healthcare</option>
              <option value="house">House</option>
              <option value="savings">Savings</option>
            </select>
            {categoryValidationMessage && (
                <p style={{ color: 'red' }}>{categoryValidationMessage}</p>
            )}
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
