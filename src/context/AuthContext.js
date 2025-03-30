// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Mock admin data (replace with API in production)
const initialAdmins = [
  { id: 1, mobile: '1234567890', role: 'Super Admin', name: 'Super Admin 1' },
  { id: 2, mobile: '0987654321', role: 'Super Admin', name: 'Super Admin 2' },
  { id: 3, mobile: '5555555555', role: 'Admin', name: 'Admin 1' },
];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Load current admin from localStorage on app load
  useEffect(() => {
    const storedAdmin = localStorage.getItem('currentAdmin');
    if (storedAdmin) {
      setCurrentAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // Login function
  const login = (mobile, otp) => {
    // Simulate OTP verification (in production, verify with an SMS API)
    if (otp === '123456') {
      const admin = admins.find((a) => a.mobile === mobile);
      if (admin) {
        setCurrentAdmin(admin);
        localStorage.setItem('currentAdmin', JSON.stringify(admin));
        return true;
      }
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('currentAdmin');
  };

  // Add new admin (only for Super Admins)
  const addAdmin = (mobile, name, role) => {
    const newAdmin = {
      id: admins.length + 1,
      mobile,
      name,
      role,
    };
    setAdmins([...admins, newAdmin]);
  };

  // Update admin role (only for Super Admins)
  const updateAdminRole = (adminId, newRole) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, role: newRole } : admin
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        admins,
        currentAdmin,
        login,
        logout,
        addAdmin,
        updateAdminRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};