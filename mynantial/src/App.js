import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

// Correct path for modern react-toastify versions
import 'react-toastify/dist/ReactToastify.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Component Imports
import Navigation from './components/Navbar';
import StatsCards from './components/StatsCards';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import ExpenseChart from './components/ExpenseChart';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import AnalyticsSummary from './components/AnalyticsSummary';
import DailySheet from './components/DailySheet';
import FilterBar from './components/FilterBar';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import SmartAdvisor from './components/SmartAdvisor';

function App() {
  // --- States ---
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [userName, setUserName] = useState(null); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // --- 1. Browser Native Notification Logic ---
  const notifyMe = (title) => {
    if (!("Notification" in window)) return;
    
    if (Notification.permission === "granted") {
      new Notification(title);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") new Notification(title);
      });
    }
  };

  // --- 2. Initial Data Loading ---
  useEffect(() => {
    // Check if user is logged in
    const savedName = localStorage.getItem('financeUserName');
    if (savedName) {
      setUserName(savedName);
    } else {
      // Force Login Modal if no user session found
      setShowAuthModal(true);
    }

    // Load transaction history
    const savedData = JSON.parse(localStorage.getItem('financeData'));
    if (savedData) setTransactions(savedData);
  }, []);

  // --- 3. Data Persistence (Sync with LocalStorage) ---
  useEffect(() => {
    localStorage.setItem('financeData', JSON.stringify(transactions));
  }, [transactions]);

  // --- 4. User Actions ---
  const addTransaction = (newTransaction) => {
    if (!userName) {
      setShowAuthModal(true);
      return;
    }
    setTransactions([newTransaction, ...transactions]);
    
    // Trigger Notifications
    notifyMe(`Alert: ${newTransaction.title} added successfully!`);
    toast.success("Transaction Record Created! 🎉");
  };

  const deleteTransaction = (id) => {
    if (!userName) {
      setShowAuthModal(true);
      return;
    }
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.error("Transaction Permanently Removed! 🗑️");
  };

  const handleLogout = () => {
    localStorage.removeItem('financeUserName');
    localStorage.removeItem('currentUser');
    window.location.reload(); // Hard refresh to reset all states and show login
  };

  // --- 5. Search & Filter Logic ---
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Visual Notification Layer */}
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      
      {/* Global Navigation */}
      <Navigation 
        userName={userName} 
        handleLogout={handleLogout} 
        openProfile={() => setShowProfileModal(true)} 
      />
      
      {/* Functional Overlays (Modals) */}
      <AuthModal 
        show={showAuthModal} 
        handleClose={() => setShowAuthModal(false)} 
        setUserName={setUserName} 
      />
      <ProfileModal 
        show={showProfileModal} 
        handleClose={() => setShowProfileModal(false)} 
        userName={userName}
        setUserName={setUserName}
      />

      <Container className="py-4">
        {/* Dynamic Welcome Header */}
        <div className="p-4 bg-white rounded shadow-sm border-start border-4 border-primary mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Welcome, {userName || "Guest"}! 👋</h2>
            <p className="mb-0 text-muted">Tracking your financial health in real-time.</p>
          </div>
          <div className="text-end">
             <button 
                className="btn btn-outline-primary d-none d-md-inline-block shadow-sm" 
                onClick={() => setShowProfileModal(true)}
             >
               Manage Profile
             </button>
          </div>
        </div>

        {/* Core Metric Cards */}
        <StatsCards transactions={transactions} />

        <Row className="mt-4">
          {/* Dashboard Left Sidebar (Forms & Intelligence) */}
          <Col lg={4} className="mb-4">
            <TransactionForm addTransaction={addTransaction} />
            
            <div className="mt-4 sticky-top" style={{ top: '90px', zIndex: '5' }}>
              <AnalyticsSummary transactions={transactions} />
              <SmartAdvisor transactions={transactions} />
            </div>
          </Col>

          {/* Dashboard Main Content (Visualizations & History) */}
          <Col lg={8}>
            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <IncomeExpenseChart transactions={transactions} />
              </Col>
              <Col md={6}>
                <ExpenseChart transactions={transactions} />
              </Col>
            </Row>

            {/* Transaction Management Section */}
            <div className="bg-white p-3 rounded shadow-sm mb-3 border">
               <FilterBar setSearchTerm={setSearchTerm} setFilterType={setFilterType} />
            </div>

            <TransactionTable 
              transactions={filteredTransactions} 
              deleteTransaction={deleteTransaction} 
            />
          </Col>
        </Row>

        {/* Exportable Reporting Section */}
        <Row className="mt-4">
          <Col md={12}>
            <DailySheet transactions={transactions} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;