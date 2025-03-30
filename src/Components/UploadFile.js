import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ClientForm.css"; // Reusing the same styles

const UploadPhotoForm = () => {
  const { id, folderId, fileId } = useParams(); // Get user, folder, and file IDs from URL
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {




    
    setPhoto(e.target.files[0]); // Store selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      setUploading(true);
      setError(null);
     const res= await axios.patch(`https://server.thedocumate.in/api/v1/client/uploadPhoto/${id}/${folderId}/${fileId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(res){
        alert("Document Uploaded")
      }

     
    } catch (error) {
      setError("Error uploading photo. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="client-form">
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <label>Select a Photo</label>
        <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPhotoForm;
