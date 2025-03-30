import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ClientForm.css"; // Reusing the same styles

const UploadFileForm = () => {
  const { id, folderId } = useParams();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]); // Store all uploaded files

  // Fetch existing files from all folders
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `https://server.thedocumate.in/api/v1/client/${id}/folders`
        );
        console.log("API Response:", response.data);

        // Check if folders exist
        if (response.data?.data?.folders) {
          const allFiles = response.data.data.folders.flatMap(
            (folder) =>
              folder.ClientData?.map((file) => ({
                folderId: folder._id,
                fileId: file._id,
                fileName: file.FileName,
              })) || []
          );

          setFileList(allFiles);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [id]);

  const handleChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileName) return alert("Please enter a file name");

    try {
      const res = await axios.post(
        `https://server.thedocumate.in/api/v1/client/${id}/folders/${folderId}/upload-filename`,
        { fileName }
      );

      const newFile = res.data?.data;
      if (newFile) {
        setFileList((prevList) => [
          ...prevList,
          { folderId, fileId: newFile._id, fileName: fileName },
        ]);
      }

      setFileName("");
      alert("File name uploaded successfully");
    } catch (error) {
      console.error("Error uploading file name:", error);
    }
  };

  return (
    <div className="client-form">
      <h2>Upload File Name</h2>
      <form onSubmit={handleSubmit}>
        <label>File Name</label>
        <input
          type="text"
          name="fileName"
          placeholder="Enter file name"
          value={fileName}
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
            Upload
          </button>
        </div>
      </form>

      {/* Display list of all uploaded files */}
      <h3 className="mt-4">All Uploaded Files</h3>
      {fileList.length > 0 ? (
        <ul className="document-list">
          {fileList.map((file, index) => (
            <>
              <div key={file.FileName} className="document-item">
                <span>{file.fileName}</span>
                <div className="document-actions">
              
                  <Link
                         to={`/upload-doc/${id}/${file.folderId}/${file.fileId}`}
                  >
                    {" "}
                    <button className="download-button">Upload Document</button>
                  </Link>
                </div>
              </div>
    
            </>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadFileForm;
