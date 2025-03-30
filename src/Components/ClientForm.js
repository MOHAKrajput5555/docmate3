import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ClientForm.css";
import CreateFolderForm from "./createFolder";
import UploadFileForm from "./CreateFileName";

const ClientForm = () => {
  const [id ,setId]=useState('')
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CompanyName: "",
    clientName: "",
    companyGst: "",
    CompanyADD: "",
 
  });

  // Fetch existing client data if editing
  console.log(id)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
       const res= await axios.post("https://server.thedocumate.in/api/v1/client/create-client", formData);
       setId(res.data.data.data._id) 
       console.log(res)
       if(res){
        alert("Client Created")
       }

      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="client-form">
      <h2>{id ? "Edit Client" : "Create Client Form"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name of the company</label>
        <input
          type="text"
          name="CompanyName"
          placeholder="Enter company name"
          value={formData.CompanyName}
          onChange={handleChange}
        />
        <label>Client Name</label>
        <input
          type="text"
          name="clientName"
          placeholder="Enter client name"
          value={formData.clientName}
          onChange={handleChange}
        />
        <div className="form-row">
          <div>
            <label>GST No.</label>
            <input
              type="text"
              name="companyGst"
              placeholder="Enter GST number"
              value={formData.companyGst}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="CompanyADD"
              placeholder="Enter address"
              value={formData.CompanyADD}
              onChange={handleChange}
            />
          </div>
        </div>
   
        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
      
 
    </div>
  );
};

export default ClientForm;
