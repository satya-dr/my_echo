import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProfileModal = ({ show, handleClose, userName, setUserName }) => {
  const [userData, setUserData] = useState({
    name: '', mobile: '', email: '', upi: ''
  });

  // User details load kora
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [show]);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // 1. Current user update kora
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // 2. Global userName update kora
    localStorage.setItem('financeUserName', userData.name);
    setUserName(userData.name);

    // 3. Registered users list-eo update kora (Optional but recommended)
    const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = allUsers.map(u => u.email === userData.email ? userData : u);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    toast.success("Profile Updated Successfully!");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Edit Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-muted small">Full Name</Form.Label>
            <Form.Control 
              type="text" value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})} required
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold text-muted small">Mobile</Form.Label>
                <Form.Control 
                  type="text" value={userData.mobile}
                  onChange={(e) => setUserData({...userData, mobile: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold text-muted small">UPI ID</Form.Label>
                <Form.Control 
                  type="text" value={userData.upi}
                  onChange={(e) => setUserData({...userData, upi: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-muted small">Email (Read-only)</Form.Label>
            <Form.Control type="email" value={userData.email} disabled />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 fw-bold py-2 shadow-sm">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;