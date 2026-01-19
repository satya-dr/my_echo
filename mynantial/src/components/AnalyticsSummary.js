import React from 'react';
import { Card, ListGroup, ProgressBar, Badge } from 'react-bootstrap';
import { FaChartLine, FaArrowUp, FaArrowDown, FaPiggyBank } from 'react-icons/fa';

const AnalyticsSummary = ({ transactions }) => {
  // 1. Logic for calculations
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;
  
  // Savings Rate Calculation
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  // Determining Financial Status
  const getStatus = () => {
    if (income === 0 && expense === 0) return { text: "No Data", color: "secondary" };
    if (savingsRate > 30) return { text: "Excellent", color: "success" };
    if (savingsRate > 10) return { text: "Good", color: "primary" };
    if (savingsRate > 0) return { text: "Tight", color: "warning" };
    return { text: "Overspending", color: "danger" };
  };

  const status = getStatus();

  return (
    <Card className="shadow-sm border-0 rounded-3 mb-4 overflow-hidden">
      <Card.Header className="bg-dark text-white py-3 d-flex align-items-center">
        <FaChartLine className="me-2" />
        <h5 className="mb-0 fw-bold">Financial Analytics</h5>
      </Card.Header>
      
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <p className="text-muted mb-1 small uppercase tracking-wide fw-bold">Current Status</p>
          <Badge bg={status.color} className="px-3 py-2 fs-6">
            {status.text}
          </Badge>
        </div>

        <ListGroup variant="flush">
          {/* Income Stat */}
          <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
            <div className="d-flex align-items-center">
              <div className="p-2 bg-success bg-opacity-10 rounded-circle me-3">
                <FaArrowUp className="text-success" />
              </div>
              <span className="fw-semibold">Total Income</span>
            </div>
            <span className="text-success fw-bold">₹{income.toLocaleString()}</span>
          </ListGroup.Item>

          {/* Expense Stat */}
          <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
            <div className="d-flex align-items-center">
              <div className="p-2 bg-danger bg-opacity-10 rounded-circle me-3">
                <FaArrowDown className="text-danger" />
              </div>
              <span className="fw-semibold">Total Expense</span>
            </div>
            <span className="text-danger fw-bold">₹{expense.toLocaleString()}</span>
          </ListGroup.Item>

          {/* Net Savings */}
          <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
            <div className="d-flex align-items-center">
              <div className="p-2 bg-primary bg-opacity-10 rounded-circle me-3">
                <FaPiggyBank className="text-primary" />
              </div>
              <span className="fw-semibold">Net Savings</span>
            </div>
            <span className={`fw-bold ${balance >= 0 ? 'text-primary' : 'text-warning'}`}>
              ₹{balance.toLocaleString()}
            </span>
          </ListGroup.Item>
        </ListGroup>

        {/* Savings Progress Bar */}
        <div className="mt-2">
          <div className="d-flex justify-content-between mb-2">
            <span className="small fw-bold text-secondary">Savings Rate</span>
            <span className="small fw-bold text-dark">{savingsRate}%</span>
          </div>
          <ProgressBar 
            now={Math.max(0, savingsRate)} 
            variant={status.color} 
            className="rounded-pill"
            style={{ height: '10px' }}
            animated={savingsRate < 0}
          />
          <p className="mt-2 small text-muted text-center italic">
            {savingsRate > 20 
              ? "Great job! You are saving enough." 
              : "Try to keep expenses below 80% of income."}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AnalyticsSummary;