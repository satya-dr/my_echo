import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Tab, Tabs } from 'react-bootstrap';

const AuthModal = ({ show, handleClose, setUserName }) => {
  const [key, setKey] = useState('login');
  const [signupData, setSignupData] = useState({ name: '', mobile: '', email: '', upi: '', password: '' });
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = { ...signupData };
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const isUserExist = existingUsers.some(u => u.email === newUser.email || u.mobile === newUser.mobile);
    
    if(isUserExist) {
      alert("User already exists!");
      return;
    }

    localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, newUser]));
    localStorage.setItem('financeUserName', newUser.name);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.reload(); 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = existingUsers.find(u => 
      (u.email === loginData.identifier || u.mobile === loginData.identifier) && 
      u.password === loginData.password
    );

    if (user) {
      localStorage.setItem('financeUserName', user.name);
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.reload();
    } else {
      alert("Invalid Mobile/Email or Password!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Finance Tracker Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-4 nav-justified">
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleLogin} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Mobile or Email</Form.Label>
                <Form.Control type="text" required onChange={(e) => setLoginData({...loginData, identifier: e.target.value})} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 fw-bold">Login</Button>
            </Form>
          </Tab>
          <Tab eventKey="signup" title="Signup">
            <Form onSubmit={handleSignup} className="mt-3">
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" required onChange={(e) => setSignupData({...signupData, name: e.target.value})} /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Mobile</Form.Label><Form.Control type="tel" required onChange={(e) => setSignupData({...signupData, mobile: e.target.value})} /></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" required onChange={(e) => setSignupData({...signupData, email: e.target.value})} /></Form.Group>
              <Form.Group className="mb-3"><Form.Label>UPI ID (Optional)</Form.Label><Form.Control type="text" onChange={(e) => setSignupData({...signupData, upi: e.target.value})} /></Form.Group>
              <Form.Group className="mb-3"><Form.Label>Set Password</Form.Label><Form.Control type="password" required onChange={(e) => setSignupData({...signupData, password: e.target.value})} /></Form.Group>
              <Button variant="success" type="submit" className="w-100 fw-bold">Sign Up</Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;