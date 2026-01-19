import React from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpenseChart = ({ transactions }) => {
  // Data processing: Income r Expense alada group kora
  const data = [
    {
      name: 'Total Overview',
      Income: transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0),
      Expense: transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0),
    }
  ];

  return (
    <Card className="p-3 shadow-sm border-0 mb-4" style={{ minHeight: '350px' }}>
      <Card.Title className="text-center fw-bold">Income vs Expense Statistics</Card.Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Legend />
          <Bar dataKey="Income" fill="#28a745" radius={[5, 5, 0, 0]} barSize={60} />
          <Bar dataKey="Expense" fill="#dc3545" radius={[5, 5, 0, 0]} barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeExpenseChart;