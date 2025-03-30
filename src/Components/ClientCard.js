import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ClientCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Fetch Client Data from API
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `https://server.thedocumate.in/api/v1/client/all`
        );
        console.log(response.data.data.user);

        const userData = response.data.data.user;
        // userData.ProfileLink = `https://server.thedocumate.in/user/${
        //   userData._id
        // }/${userData.CompanyName.replace(/\s+/g, "-")}`;
        setClient(userData);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, [id]);

  // Function to copy the profile link to clipboard
  const handleCopyLink = (e) => {
    e.stopPropagation();
    if (!client?.ProfileLink) return;

    navigator.clipboard.writeText(client.ProfileLink).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    });
  };



  return (
    <>
      {client.map((client) => {
        return (
          
          <div
            className="client-card"
         
          >
           <Link to={`/client-profile/${client._id}`}><h3>{client.CompanyName}</h3></Link> 
            <p>{client.name}</p>
            <p>GST No.: {client.companyGst}</p>
            <p>{client.CompanyADD}</p>

            <div className="profile-link-container">
              <button onClick={handleCopyLink} className="copy-button"></button>
            </div>

            <button
              className="edit-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/create-folder/${client._id}`);
              }}
            >
              ✏️ Edit
            </button>
            <button
              className="edit-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/create-folder/${client._id}`);
              }}
            >
      
            </button>

            {showAlert && (
              <div className="copy-alert">Link copied to clipboard! 📋</div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ClientCard;
