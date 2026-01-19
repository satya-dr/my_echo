import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const TransactionForm = ({ addTransaction }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    amount: '', 
    type: 'expense', 
    category: 'Food' 
  });

  // Suggestion list items
  const suggestions = [
    "Salary", "Bonus", "Freelancing", "Food & Groceries", 
    "House Rent", "Electricity Bill", "Mobile Recharge", 
    "Internet Bill", "Transport", "Shopping", "Medical", 
    "Entertainment", "Fuel", "Gym", "Investment"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    // Notun transaction object
    addTransaction({ 
      ...formData, 
      id: Date.now(), 
      date: new Date().toLocaleDateString() 
    });

    // Form reset
    setFormData({ title: '', amount: '', type: 'expense', category: 'Food' });
  };

  return (
    <Card className="p-4 shadow-sm border-0 bg-light">
      <h4 className="mb-3">Add New Entry</h4>
      <Form onSubmit={handleSubmit}>
        
        {/* Description with Suggestions */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Description</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Search or type e.g. Salary, Rent" 
            value={formData.title} 
            list="description-suggestions" // Datalist ID link kora hoyeche
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
          {/* Datalist for suggestions */}
          <datalist id="description-suggestions">
            {suggestions.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Amount</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter amount" 
            value={formData.amount} 
            onChange={(e) => setFormData({...formData, amount: e.target.value})} 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Transaction Type</Form.Label>
          <Form.Select 
            value={formData.type} 
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Category</Form.Label>
          <Form.Select 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Food">Food & Dining</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills & Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health & Medical</option>
            <option value="Income">Salary/Income</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100 fw-bold">
          Add Transaction
        </Button>
      </Form>
    </Card>
  );
};

export default TransactionForm;