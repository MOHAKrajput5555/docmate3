// src/components/ClientDetails.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ClientDetails.css';

// Mock client data (for subscription status)
const mockClientData = {
  1: {
    subscriptionEndDate: '2025-03-27',
    subscriptionStatus: 'active',
  },
};

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [client, setClient] = useState(mockClientData[id]);
  const [showCreateFolderForm, setShowCreateFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [editFolderName, setEditFolderName] = useState('');

  const [folders, setFolders] = useState([
    { name: 'GST Documents', icon: '📜' },
    { name: 'Contracts', icon: '📝' },
    { name: 'Invoices', icon: '🧾' },
    { name: 'Reports', icon: '📊' },
    { name: 'Legal', icon: '⚖️' },
  ]);

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateFolder = (e) => {
    e.preventDefault();
    const folderExists = folders.some(
      (folder) => folder.name.toLowerCase() === newFolderName.toLowerCase()
    );

    if (folderExists) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setFolders([...folders, { name: newFolderName, icon: '📁' }]);
      setNewFolderName('');
      setShowCreateFolderForm(false);
    }
  };

  const handleDeleteFolder = (folderName) => {
    setFolders(folders.filter((folder) => folder.name !== folderName));
  };

  const handleEditFolder = (folder) => {
    setEditingFolder(folder);
    setEditFolderName(folder.name);
  };

  const handleUpdateFolderName = (e) => {
    e.preventDefault();
    const folderExists = folders.some(
      (folder) =>
        folder.name.toLowerCase() === editFolderName.toLowerCase() &&
        folder.name !== editingFolder.name
    );

    if (folderExists) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setFolders(
        folders.map((folder) =>
          folder.name === editingFolder.name
            ? { ...folder, name: editFolderName }
            : folder
        )
      );
      setEditingFolder(null);
      setEditFolderName('');
    }
  };

  const handleRenewSubscription = () => {
    const currentDate = new Date();
    const newEndDate = new Date(currentDate);
    newEndDate.setDate(currentDate.getDate() + 365); // Add 365 days
    const formattedEndDate = newEndDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Update client subscription (in a real app, this would be an API call)
    setClient({
      ...client,
      subscriptionEndDate: formattedEndDate,
      subscriptionStatus: 'active',
    });

    // Update mock data (in a real app, this would be persisted to the backend)
    mockClientData[id] = {
      ...mockClientData[id],
      subscriptionEndDate: formattedEndDate,
      subscriptionStatus: 'active',
    };
  };

  return (
    <div className="client-details">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <input
          type="text"
          placeholder="Search documents"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Subscription Status and Renewal */}
      <div className="subscription-section">
        <h3>Subscription Status</h3>
        <p>End Date: {client.subscriptionEndDate}</p>
        <p>Status: {client.subscriptionStatus}</p>
        {client.subscriptionStatus === 'expired' && (
          <button onClick={handleRenewSubscription} className="renew-button">
            Renew Subscription
          </button>
        )}
      </div>

      {/* Create New Folder Button */}
      <div className="create-folder-section">
        <button
          className="create-folder-button"
          onClick={() => setShowCreateFolderForm(!showCreateFolderForm)}
        >
         VitePress: true
          {showCreateFolderForm ? 'Cancel' : 'Create New Folder'}
        </button>

        {showCreateFolderForm && (
          <form className="create-folder-form" onSubmit={handleCreateFolder}>
            <div className="form-group">
              <label>Folder Name:</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Create Folder
            </button>
          </form>
        )}
      </div>

      {/* Alert for duplicate folder name */}
      {showAlert && (
        <div className="duplicate-alert">
          Folder name already exists, give a different name. 🚫
        </div>
      )}

      {/* Folder List */}
      <div className="folder-list">
        {filteredFolders.length > 0 ? (
          filteredFolders.map((folder) => (
            <div key={folder.name} className="folder">
              {editingFolder && editingFolder.name === folder.name ? (
                <form
                  className="edit-folder-form"
                  onSubmit={handleUpdateFolderName}
                >
                  <input
                    type="text"
                    value={editFolderName}
                    onChange={(e) => setEditFolderName(e.target.value)}
                    placeholder="Enter new folder name"
                    required
                  />
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setEditingFolder(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span>
                    {folder.icon} {folder.name}
                  </span>
                  <div className="folder-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditFolder(folder)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteFolder(folder.name)}
                    >
                      🗑️
                    </button>
                    <button className="upload-button">Upload</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No folders found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;