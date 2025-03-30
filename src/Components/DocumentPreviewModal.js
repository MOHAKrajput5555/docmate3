// src/components/DocumentPreviewModal.js
import React from 'react';
import '../styles/DocumentPreviewModal.css';

const DocumentPreviewModal = ({ document, onClose }) => {
  return (
    <div className="preview-modal-overlay">
      <div className="preview-modal">
        <div className="modal-header">
          <h3>Preview: {document.name}</h3>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>
        <div className="modal-content">
          {document.type === 'pdf' ? (
            <iframe
              src={document.photo}
              title={document.FileName}
              width="100%"
              height="500px"
            />
          ) : document.type === 'image' ? (
            <img src={document.url} alt={document.name} style={{ maxWidth: '100%' }} />
          ) : (
            <p>Preview not available for this file type ({document.type}). Please download to view.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;