import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const StatsCards = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="text-center shadow-sm border-0 bg-success text-white">
          <Card.Body>
            <Card.Title>Total Income</Card.Title>
            <h3>₹{income}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center shadow-sm border-0 bg-danger text-white">
          <Card.Body>
            <Card.Title>Total Expense</Card.Title>
            <h3>₹{expense}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center shadow-sm border-0 bg-primary text-white">
          <Card.Body>
            <Card.Title>Net Balance</Card.Title>
            <h3>₹{balance}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;