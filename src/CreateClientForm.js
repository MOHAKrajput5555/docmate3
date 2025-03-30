import React from 'react';
import './CreateClientForm.css';

const CreateClientForm = () => {
  return (
    <div className="form-container">
      <h2>Create Client Form</h2>
      <form className="client-form">
        <div className="form-group">
          <label htmlFor="companyName">Name of the company</label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter company name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            placeholder="Enter client name"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="gstNo">GST No.</label>
            <input
              type="text"
              id="gstNo"
              placeholder="Enter GST number"
              className="form-input"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="profileLink">Profile Link</label>
          <input
            type="url"
            id="profileLink"
            placeholder="Enter profile link"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileUpload" className="file-upload-label">
            <span className="upload-button">Upload File</span>
            <input
              type="file"
              id="fileUpload"
              className="file-input"
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientForm;