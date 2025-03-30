// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ClientForm from './Components/ClientForm';
import ClientDetails from './Components/ClientDetails';
import ClientProfile from './Components/ClientProfile';
import Login from './Components/Login';
import AdminManagement from './Components/AdminManagement';
import { AuthContext } from './context/AuthContext';
import UploadFileForm from './Components/CreateFileName';
import CreateFolderForm from './Components/createFolder';
import UploadPhotoForm from './Components/UploadFile';

function App() {
  const { currentAdmin } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={<Dashboard/>}
        />
        <Route
          path="/create"
          element={currentAdmin ? <ClientForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={currentAdmin ? <ClientForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/client/:id"
          element={currentAdmin ? <ClientDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/client-profile/:id"
          element={ <ClientProfile />}
        />
        <Route
          path="/admin-management"
          element={
            currentAdmin && currentAdmin.role === 'Super Admin' ? (
              <AdminManagement />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path='/create-fileName/:id/:folderId' element={<UploadFileForm/>}></Route>        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/create-folder/:id' element={<CreateFolderForm/>}></Route>   
        <Route path='/upload-doc/:id/:folderId/:fileId' element={<UploadPhotoForm/>}   ></Route>  {/* Redirect unknown routes to login */}

      </Routes>
    </Router>
  );
}

export default App;