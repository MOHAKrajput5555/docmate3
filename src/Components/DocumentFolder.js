// src/components/DocumentFolder.js
import React, { useState } from 'react';
import DocumentPreviewModal from './DocumentPreviewModal';
import '../styles/DocumentFolder.css';
import { Link } from 'react-router-dom';

const DocumentFolder = ({ folderName, documents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  return (
    <div className="document-folder">
      <div className="folder-header">
        <h3>{folderName}</h3>
      </div>
      {documents.length > 0 ? (
        <div className="document-list">
          {documents.map((doc) => (
            <div key={doc.name} className="document-item">
              <span>{doc.FileName}</span>
              <div className="document-actions">
                <button onClick={() => handlePreview(doc)} className="preview-button">
                  👁️ Preview
                </button>
            <Link to={`https://clientdata123.s3.ap-south-1.amazonaws.com/${doc.photo}`} >  <button  className="download-button">
                  ⬇️ Download
                </button></Link> 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No documents available.</p>
      )}

      {/* Preview Modal */}
      {isModalOpen && selectedDocument && (
        <DocumentPreviewModal
          document={selectedDocument}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DocumentFolder;