import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const TransactionTable = ({ transactions, deleteTransaction }) => {
  return (
    <div className="mt-4">
      <h4>Recent History</h4>
      <Table responsive hover className="shadow-sm bg-white rounded">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.title}</td>
              <td>{t.type}</td>
              <td className={t.type === 'income' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {t.type === 'income' ? '+' : '-'} ₹{t.amount}
              </td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => deleteTransaction(t.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionTable;