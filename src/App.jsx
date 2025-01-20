import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [applications, setApplications] = useState([]);
  const [appName, setAppName] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [docName, setDocName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [activeDocIndex, setActiveDocIndex] = useState(null); // Track active document index

  // Add a new application
  const addApplication = () => {
    if (appName.trim()) {
      setApplications([
        ...applications,
        { name: appName, documents: [] },
      ]);
      setAppName("");
      setShowModal(false);
    }
  };

  // Add document (optional if file is uploaded)
  const addDocument = () => {
    if (selectedApp && docName.trim()) {
      let document = { name: docName };

      if (uploadedFile) {
        document = { ...document, fileUrl: URL.createObjectURL(uploadedFile) };
      }

      setApplications(
        applications.map((app) =>
          app.name === selectedApp
            ? { ...app, documents: [...app.documents, document] }
            : app
        )
      );

      setDocName("");
      setUploadedFile(null);
      setShowDocModal(false);
    } else {
      alert("Please provide a document name.");
    }
  };

  // Set active document for upload or select action
  const setActiveDoc = (index) => {
    setActiveDocIndex(index === activeDocIndex ? null : index); // Toggle active state
  };

  // Remove application or document
  const removeApplication = (appName) => {
    if (window.confirm(`Are you sure you want to delete the application: ${appName}?`)) {
      setApplications(applications.filter((app) => app.name !== appName));
      if (currentAppIndex > 0) {
        setCurrentAppIndex(currentAppIndex - 1);
      }
    }
  };

  const removeDocument = (appName, docName) => {
    setApplications(
      applications.map((app) =>
        app.name === appName
          ? { ...app, documents: app.documents.filter((doc) => doc.name !== docName) }
          : app
      )
    );
  };
  // Go to the next document in the sequence
// Go to the next document in the sequence
const goToNextDoc = () => {
 
  
  const currentApp = applications[currentAppIndex];
  const currentDoc = currentApp.documents[activeDocIndex];

  if (currentDoc) {
    // Check if there's a next document in the current application
    const nextDocIndex = activeDocIndex + 1;
    if (nextDocIndex < currentApp.documents.length) {
      setActiveDocIndex(nextDocIndex);  // Move to next document
    } else {
      // No more documents in this application, switch to the next application
      goToNextApp();  // Move to next application (and start with the first document)
      setActiveDocIndex(0)
    }
  }
};

// Go to the previous document in the sequence
const goToPrevDoc = () => {


  const currentApp = applications[currentAppIndex];
  const currentDoc = currentApp.documents[activeDocIndex];

  if (currentDoc) {
    // Check if there's a previous document in the current application
    const prevDocIndex = activeDocIndex - 1;
    if (prevDocIndex >= 0) {
      setActiveDocIndex(prevDocIndex); // Move to previous document
    } else {
      // No previous document in this application, switch to the previous application
      goToPrevApp(); // Move to previous application
      const newApp = applications[currentAppIndex]; // Updated current application after goToPrevApp()
      
      if (newApp && newApp.documents.length > 0) {
        // Set the index to the last document in the new application
        setActiveDocIndex(newApp.documents.length - 1);
      } else {
        console.error("Previous application has no documents.");
      }
    }
  }
};


const goToNextApp = () => {
  if (currentAppIndex < applications.length - 1) {
    setCurrentAppIndex(currentAppIndex + 1);
    setSelectedApp(applications[currentAppIndex + 1].name);
  }else{
    setCurrentAppIndex(0)
    setSelectedApp(applications[0].name);
  }
};

const goToPrevApp = () => {
  if (currentAppIndex > 0) {
    setCurrentAppIndex(currentAppIndex - 1);
    setSelectedApp(applications[currentAppIndex - 1].name);
  }else{
    setSelectedApp(applications[applications.length - 1].name);
    setCurrentAppIndex(applications.length - 1)
  }
};


  

  return (
    <div style={styles.container}>
      <div className="header">
        <h1 style={styles.title}>Document Upload</h1>
        <div style={styles.form}>
          <button onClick={() => setShowModal(true)} style={styles.button}>
            <i className="fas fa-plus"></i> Add Application
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.title}>Add Application</h3>
            <label htmlFor="appname">Name</label>
            <input
            id="appname"
              type="text"
              placeholder="Application Name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              style={styles.input}
            />
            <div>
              <button onClick={addApplication} style={styles.button}><i class="fa-solid fa-check"></i> &nbsp;Add</button>
              <button onClick={() => setShowModal(false)} className="cancelbtn"><i class="fa-solid fa-x"></i>&nbsp; Cancel</button>
            </div>
          </div>
        </div>
      )}

{showDocModal && (
  <div style={styles.modal}>
    <div style={styles.modalContent}>
      <h3 style={styles.title}>Add Document</h3>
      <input
        type="text"
        placeholder="Document Name"
        value={docName}
        onChange={(e) => setDocName(e.target.value)}
        style={styles.input}
      />
    
      <div>
        <button onClick={addDocument} style={styles.button}>
          Add Document
        </button>
        <button onClick={() => setShowDocModal(false)} style={styles.button}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      <div style={styles.navbar}>
        {applications.length === 0 ? (
          <p style={{ ...styles.navItem, color: "gray" }}></p>
        ) : (
          applications.map((app) => (
            <div key={app.name} style={styles.navItemContainer}>
              <div
                onClick={() => {
                  setSelectedApp(app.name);
                  setCurrentAppIndex(applications.findIndex((a) => a.name === app.name));
                }}
                style={{
                  ...styles.navItem,
                  borderBottom: selectedApp === app.name ? "1px solid #3b82f6" : "1px solid #f1f1f1",
                  
                }}
              >
                {app.name}
                <button className="deletebtn" onClick={() => removeApplication(app.name)} style={styles.deleteAppButton}>
                  <i className="fas fa-trash-alt" ></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
<hr />
      <div className="display-documents" >
        <div >
          <div style={styles.documents}>
            {selectedApp ? (
              applications
                .find((app) => app.name === selectedApp)
                ?.documents.map((doc, index) => (
                  <div
                   key={doc.name}
                   style={{
                     ...styles.documentBox,
                     background: activeDocIndex === index ? "#3b82f6" : "#fff",
                     color: activeDocIndex === index ? "white" : "black",
                   }}
                   onClick={() => setActiveDocIndex(index)} // Ensure active document is clickable
                 >
                   <strong>{doc.name}</strong>
                 </div>

                
                ))
            ) : (
              <p style={{ ...styles.document, color: "gray" }}></p>
            )}
          </div>

          {applications.length > 0 && selectedApp && (
            <div style={styles.form}>
              <button onClick={() => setShowDocModal(true)} style={styles.button}>
                <i className="fas fa-plus"></i>&nbsp; Add 
              </button>
            </div>
          )}
        </div>
        <div >
  {activeDocIndex !== null && (
    <div className="file-upload">
      
      <div className="file-upload-header">
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }} // Hidden input field
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setUploadedFile(e.target.files[0]);
            alert(`Selected file: ${e.target.files[0].name}`);
          }
        }}
      />
      <div style={styles.buttonContainer}>
        <button className="file-upload-btn"
          onClick={() => document.getElementById("fileInput").click()} // Trigger file input
          style={styles.button}
        ><i class="fa-solid fa-plus"></i> &nbsp;
          Choose 
        </button>
        <button className="file-upload-btn"
          onClick={() => {
            if (!uploadedFile) {
              alert("No file selected!");
            } else {
              alert(`Uploading file: ${uploadedFile.name}`);
              // Handle file upload logic here
            }
          }}
          style={styles.button}
        ><i class="fa-solid fa-upload"></i> &nbsp;
          Upload
        </button>
        <button className="file-upload-btn" onClick={() => setUploadedFile(null)} style={styles.button}>
        <i class="fa-solid fa-x"></i> &nbsp; Cancel
        </button>
       
        </div>
        </div>
        <p style={styles.fileDetails}>
        {uploadedFile ? (
          <>
            Selected File: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)
          </>
        ) : (
          "Drag and Drop files here"
        )}
      </p>
      
    </div>
  )}
</div>


      </div>

      <div style={styles.navButtons}>
        <button onClick={goToPrevDoc}  style={styles.navButton}><i class="fa-solid fa-arrow-left"></i>&nbsp;Back</button>
        <button onClick={goToNextDoc}  style={styles.navButton}><i class="fa-solid fa-arrow-right"></i> &nbsp;Next</button>

      </div>
      <hr />
    </div>
  );
};




const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: "20px",
    maxWidth: "100%",
    position: "relative",  // Ensure other elements in this container don't overflow out of bounds
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    marginBottom: "20px",
    
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
  },
  navItemContainer: {
    margin: "5px 0",
  },
  navItem: {
    padding: "20px",
    
    
    textAlign: "center",
    width: "200px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    
  },
  deleteAppButton: {
    float: "right",
    background:"#3b82f6",
    border: "none",
    cursor: "pointer",
    padding:"5px",
    borderRadius:"5px",
    color:"white",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // This keeps the background dimmed when modal is active
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensures the modal stays on top
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    
    boxSizing: "border-box", // Prevents padding from affecting width
    zIndex: 1100, // Ensures modal content stays above modal background
  },
  input: {
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  documents: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  documentBox: {
    marginBottom: "10px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    position: "relative",
    cursor: "pointer",
  },
  selectButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },

fileOptions: {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  width: "200px",
  alignItems: "flex-start", // Ensure alignment of buttons and inputs
},

  link: {
    color: "#3b8fc5",
    textDecoration: "none",
  },
  navButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  navButton: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  fileInfo: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  
  
};

export default App;
