// src/components/AdminManagement.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AdminManagement.css';

const AdminManagement = () => {
  const { admins, currentAdmin, addAdmin, updateAdminRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newAdminMobile, setNewAdminMobile] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const adminsPerPage = 5; // Number of admins per page

  if (!currentAdmin || currentAdmin.role !== 'Super Admin') {
    navigate('/');
    return null;
  }

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (newAdminMobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (admins.some((admin) => admin.mobile === newAdminMobile)) {
      alert('An admin with this mobile number already exists.');
      return;
    }
    addAdmin(newAdminMobile, newAdminName, newAdminRole);
    setNewAdminMobile('');
    setNewAdminName('');
    setNewAdminRole('Admin');
    setCurrentPage(1); // Reset to first page after adding a new admin
  };

  const handleRoleChange = (adminId, newRole) => {
    updateAdminRole(adminId, newRole);
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.mobile.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="admin-management">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
        <h1>Admin Management</h1>
      </div>

      {/* Add New Admin Form */}
      <div className="add-admin-section">
        <h2>Add New Admin</h2>
        <form className="add-admin-form" onSubmit={handleAddAdmin}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              placeholder="Enter admin name"
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              value={newAdminMobile}
              onChange={(e) => setNewAdminMobile(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              value={newAdminRole}
              onChange={(e) => setNewAdminRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Admin
          </button>
        </form>
      </div>

      {/* Admin List with Search and Pagination */}
      <div className="admin-list-section">
        <h2>Admin List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search admins by name or mobile number"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        {filteredAdmins.length > 0 ? (
          <>
            <div className="admin-list">
              {currentAdmins.map((admin) => (
                <div key={admin.id} className="admin-item">
                  <div className="admin-info">
                    <p><strong>Name:</strong> {admin.name}</p>
                    <p><strong>Mobile:</strong> {admin.mobile}</p>
                  </div>
                  <div className="admin-role">
                    <label>Role:</label>
                    <select
                      value={admin.role}
                      onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;