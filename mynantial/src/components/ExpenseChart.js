import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ExpenseChart = ({ transactions }) => {
  // 1. Filter only expenses and ensure amount is a valid number
  const expenseData = transactions.filter(t => t.type === 'expense' && !isNaN(t.amount));

  // 2. Accurate Grouping Logic
  const chartData = expenseData.reduce((acc, curr) => {
    // Category name matching fix (case-insensitive and trim)
    const categoryName = curr.category ? curr.category.trim() : "Other";
    
    const existing = acc.find(item => item.name.toLowerCase() === categoryName.toLowerCase());
    
    if (existing) {
      existing.value += Number(curr.amount);
    } else {
      acc.push({ name: categoryName, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  // Professional Color Palette
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#F44336', '#E91E63'];

  return (
    <Card className="p-3 shadow-sm border-0 mb-4" style={{ height: '350px' }}>
      <Card.Title className="text-center fw-bold text-secondary mb-3">
        Spending by Category
      </Card.Title>
      
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="none"
                />
              ))}
            </Pie>
            {/* Custom Tooltip style */}
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Spent']} 
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
          <i className="bi bi-pie-chart fs-1 mb-2"></i>
          <p>No expense data available</p>
        </div>
      )}
    </Card>
  );
};

export default ExpenseChart;