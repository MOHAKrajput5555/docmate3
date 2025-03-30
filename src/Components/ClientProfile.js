import React, { useState, useEffect } from "react";
import DocumentFolder from "./DocumentFolder";
import "../styles/ClientProfile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {id}=useParams()

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`https://server.thedocumate.in/api/v1/client/${id}/folders`);
        if (response.data.fullData?.user) {
          const userData = response.data.fullData.user;
          userData.ProfileLink = `https://server.thedocumate.in/user/${userData._id}/${userData.CompanyName.replace(/\s+/g, "-")}`;
          setClient(userData);
          setDocuments(userData.folder || []);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, []);

  const filteredDocuments = documents.filter((doc) =>
    doc.folderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="client-profile">
      <header className="client-header">
        <div className="logo">
          <h1>DocuMate</h1>
        </div>
      </header>

      <div className="main-content">
        {client && (
          <>
            <div className="header">
              <h1>{client.CompanyName}</h1>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search folders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="profile-section">
              <h2>Profile Details</h2>
              <p><strong>Company:</strong> {client.CompanyName}</p>
              <p><strong>Address:</strong> {client.CompanyADD}</p>
              <p><strong>GST No.:</strong> {client.companyGst}</p>
              <p><strong>Profile Link:</strong> <a href={client.ProfileLink} target="_blank" rel="noopener noreferrer">{client.ProfileLink}</a></p>
            </div>
          </>
        )}

        <div className="documents-section">
          <h2>Folders</h2>
          <div className="folder-list">
            {filteredDocuments.map((folder) => (
              <DocumentFolder key={folder._id} folderName={folder.folderName} documents={folder.ClientData || []} />
            ))}
          </div>
        </div>
      </div>

      <footer className="client-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h4>Contact Us</h4>
            <p>📞 +1-800-555-1234</p>
            <p>📧 support@documate.com</p>
          </div>
        </div>
        <div className="footer-secure">🔒 All documents are secure</div>
        <div className="footer-copyright">© {new Date().getFullYear()} DocuMate. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default ClientProfile;
