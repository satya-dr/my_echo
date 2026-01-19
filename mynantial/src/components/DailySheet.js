import React from 'react';
import { Table, Card, Button, Badge } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Notun bhabe import kora hoyeche

const DailySheet = ({ transactions }) => {
  // 1. Data Grouping Logic
  const groupedData = transactions.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }
    if (curr.type === 'income') {
      acc[date].income += Number(curr.amount);
    } else {
      acc[date].expense += Number(curr.amount);
    }
    return acc;
  }, {});

  // 2. PDF Export Function
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // PDF Header
    doc.setFontSize(18);
    doc.text('Financial Daily Summary Report', 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    // Table Data preparation
    const tableColumn = ["Date", "Total Income", "Total Expense", "Net Savings"];
    const tableRows = [];

    Object.keys(groupedData).forEach(date => {
      const data = groupedData[date];
      const rowData = [
        date,
        `Rs. ${data.income}`,
        `Rs. ${data.expense}`,
        `Rs. ${data.income - data.expense}`
      ];
      tableRows.push(rowData);
    });

    // Calling autoTable function directly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { cellPadding: 3, fontSize: 10 }
    });

    doc.save(`Financial_Summary_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <Card className="shadow-sm border-0 mt-4">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <h5 className="mb-0 fw-bold">Daily Transaction Sheet</h5>
        <Button variant="light" size="sm" onClick={downloadPDF} className="fw-bold">
          <FaFilePdf className="me-2 text-danger" /> Export PDF
        </Button>
      </Card.Header>
      
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Total Income</th>
              <th>Total Expense</th>
              <th>Daily Savings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).length > 0 ? (
              Object.keys(groupedData).map((date) => {
                const { income, expense } = groupedData[date];
                const savings = income - expense;
                return (
                  <tr key={date}>
                    <td>{date}</td>
                    <td className="text-success fw-bold">₹{income}</td>
                    <td className="text-danger fw-bold">₹{expense}</td>
                    <td className={savings >= 0 ? 'text-primary fw-bold' : 'text-warning fw-bold'}>
                      ₹{savings}
                    </td>
                    <td>
                      {savings >= 0 ? (
                        <Badge bg="success">In Budget</Badge>
                      ) : (
                        <Badge bg="danger">Overspent</Badge>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">No transactions recorded yet.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default DailySheet;