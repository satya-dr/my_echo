import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const FilterBar = ({ setSearchTerm, setFilterType }) => {
  return (
    <Row className="mb-3">
      <Col md={8}>
        <InputGroup className="shadow-sm">
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            className="border-start-0"
            placeholder="Search transactions..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select className="shadow-sm" onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Transactions</option>
          <option value="income">Only Income</option>
          <option value="expense">Only Expense</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;