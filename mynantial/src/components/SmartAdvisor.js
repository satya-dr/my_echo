import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FaLightbulb, FaArrowDown, FaArrowUp, FaCheckCircle } from 'react-icons/fa';

const SmartAdvisor = ({ transactions }) => {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const expenses = transactions.filter(t => t.type === 'expense');
  
  // Category grouping logic
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const suggestions = [];

  // Logic 1: High Spending Analysis
  Object.keys(categoryTotals).forEach(cat => {
    const percent = (categoryTotals[cat] / income) * 100;
    // Suggest reduction if a non-essential category exceeds 20% of income
    if (percent > 20 && cat !== 'Rent' && cat !== 'Education' && cat !== 'Bills') {
      suggestions.push({
        type: 'reduce',
        message: `High spending in ${cat} (${percent.toFixed(0)}% of income). Consider cutting down these costs.`,
        icon: <FaArrowDown className="text-danger me-2" />
      });
    }
  });

  // Logic 2: Savings Rate Analysis
  const totalExpense = expenses.reduce((acc, t) => acc + Number(t.amount), 0);
  const netBalance = income - totalExpense;
  const savingsRate = income > 0 ? (netBalance / income) * 100 : 0;

  if (income > 0) {
    if (savingsRate < 15) {
      suggestions.push({
        type: 'increase',
        message: `Your savings rate is only ${savingsRate.toFixed(0)}%. Aim to save at least 20% of your income.`,
        icon: <FaArrowUp className="text-primary me-2" />
      });
    } else if (savingsRate >= 25) {
      suggestions.push({
        type: 'good',
        message: `Excellent! Your savings rate is healthy. Keep maintaining this discipline.`,
        icon: <FaCheckCircle className="text-success me-2" />
      });
    }
  }

  return (
    <Card className="shadow-sm border-0 mt-4 overflow-hidden">
      <Card.Header className="bg-warning text-dark fw-bold d-flex align-items-center border-0">
        <FaLightbulb className="me-2" /> Smart Budget Advisor
      </Card.Header>
      <Card.Body className="p-3">
        {suggestions.length > 0 ? (
          <ListGroup variant="flush">
            {suggestions.map((s, index) => (
              <ListGroup.Item key={index} className="border-0 px-0 d-flex align-items-start bg-transparent">
                {s.icon}
                <span className="small fw-semibold text-dark">{s.message}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted small mb-0 text-center italic">
            Start adding transactions to receive personalized financial advice.
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default SmartAdvisor;