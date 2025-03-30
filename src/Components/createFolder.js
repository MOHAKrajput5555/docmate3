import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/ClientForm.css"; // Reusing the same styles

const CreateFolderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `https://server.thedocumate.in/api/v1/client/${id}/folders`
        );
        if (response.data.fullData?.user?.folder) {
          setFolders(response.data.fullData.user.folder);
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, [id]);

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://server.thedocumate.in/api/v1/client/${id}/folders`, {
        folderName,
      });
      alert("Folder created successfully");
      setFolderName(""); // Clear input field
      window.location.reload(); // Refresh to show new folder
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div className="client-form">
      <h2>Create Folder</h2>
      <form onSubmit={handleSubmit}>
        <label>Folder Name</label>
        <input
          type="text"
          name="folderName"
          placeholder="Enter folder name"
          value={folderName}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="save-button">
            Create
          </button>
        </div>
      </form>

      <h3>Folder List</h3>
      <div className="folder-container">
        {folders.map((folder) => (
          <Link
            key={folder._id}
            to={`/create-filename/${id}/${folder._id}`}
            className="folder-card"
          >
            <div>
              <img
                width="30px"
                src="https://th.bing.com/th/id/R.8fb66810dc1fa9784b07d9cd5c67d6c2?rik=TuaCkhRCfJJ0gw&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpaomedia%2fsmall-n-flat%2f1024%2ffolder-icon.png&ehk=3ihRTJTFaKx7k%2fu7DF%2bg%2bpzKPbDv3PgftwBerZRgBzU%3d&risl=&pid=ImgRaw&r=0"
              ></img>{" "}
          </div>
<div>
              {folder.folderName}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CreateFolderForm;
