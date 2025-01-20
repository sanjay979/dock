import React, { useState } from "react";

const App = () => {
  const [applications, setApplications] = useState([]);
  const [appName, setAppName] = useState("");
  const [selectedApp, setSelectedApp] = useState(""); // The app selected from the navigation bar
  const [docName, setDocName] = useState(""); // State for document name
  const [uploadedFile, setUploadedFile] = useState(null); // Optional document upload
  const [currentAppIndex, setCurrentAppIndex] = useState(0); // State for current app index

  // Add a new application
  const addApplication = () => {
    if (appName.trim()) {
      setApplications([
        ...applications,
        { name: appName, documents: [] },
      ]);
      setAppName(""); // Reset app name
    }
  };

  // Add document (optional if file is uploaded)
  const addDocument = () => {
    if (selectedApp && docName.trim()) {
      let document = { name: docName };

      // Add file URL only if a file is uploaded
      if (uploadedFile) {
        document = { ...document, fileUrl: URL.createObjectURL(uploadedFile) };
      }

      setApplications(
        applications.map((app) =>
          app.name === selectedApp
            ? {
                ...app,
                documents: [...app.documents, document],
              }
            : app
        )
      );

      // Reset fields after adding the document
      setDocName("");
      setUploadedFile(null);
    } else {
      alert("Please provide a document name.");
    }
  };

  // Remove an application
  const removeApplication = (appName) => {
    if (window.confirm(`Are you sure you want to delete the application: ${appName}?`)) {
      setApplications(applications.filter((app) => app.name !== appName));
      if (currentAppIndex > 0) {
        setCurrentAppIndex(currentAppIndex - 1); // Go back to the previous app if exists
      }
    }
  };

  // Remove a document
  const removeDocument = (appName, docName) => {
    setApplications(
      applications.map((app) =>
        app.name === appName
          ? {
              ...app,
              documents: app.documents.filter((doc) => doc.name !== docName),
            }
          : app
      )
    );
  };

  // Navigation logic for "Next" and "Back"
  const goToNextApp = () => {
    if (currentAppIndex < applications.length - 1) {
      setCurrentAppIndex(currentAppIndex + 1);
      setSelectedApp(applications[currentAppIndex + 1].name);
    }
  };

  const goToPrevApp = () => {
    if (currentAppIndex > 0) {
      setCurrentAppIndex(currentAppIndex - 1);
      setSelectedApp(applications[currentAppIndex - 1].name);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Applications Manager</h2>

      {/* Add Application */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Application Name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addApplication} style={styles.button}>
          Add Application
        </button>
      </div>

      {/* Add Document */}
      <div style={styles.form}>
        <select
          value={selectedApp}
          onChange={(e) => setSelectedApp(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Application</option>
          {applications.map((app) => (
            <option key={app.name} value={app.name}>
              {app.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Document Name"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          onChange={(e) => setUploadedFile(e.target.files[0])}
          style={styles.input}
        />
        <button onClick={addDocument} style={styles.button}>
          Add Document
        </button>
      </div>

      {/* Navigation Bar (Application List) */}
      <div style={styles.navbar}>
        {applications.map((app) => (
          <div key={app.name} style={styles.navItemContainer}>
            <div
              onClick={() => {
                setSelectedApp(app.name);
                setCurrentAppIndex(applications.findIndex((a) => a.name === app.name));
              }}
              style={{
                ...styles.navItem,
                backgroundColor: selectedApp === app.name ? "#3b8fc5" : "#f1f1f1",
                color: selectedApp === app.name ? "white" : "black",
              }}
            >
              {app.name}
              <button
              onClick={() => removeApplication(app.name)}
              style={styles.deleteAppButton}
            >
              <i className="fas fa-trash-alt"></i> Delete
            </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Display Documents for Selected Application */}
      <div style={styles.documents}>
        <h3 style={styles.title}>
          {selectedApp ? `Documents for ${selectedApp}` : "Select an Application"}
        </h3>
        {selectedApp &&
          applications
            .find((app) => app.name === selectedApp)
            ?.documents.map((doc) => (
              <div key={doc.name} style={styles.document}>
                <strong>{doc.name}</strong>{" "}
                {doc.fileUrl && (
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                    View
                  </a>
                )}
                <button onClick={() => removeDocument(selectedApp, doc.name)} style={styles.deleteButton}>
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            ))}
      </div>

      {/* Next and Back buttons */}
      <div style={styles.navButtons}>
        <button onClick={goToPrevApp} disabled={currentAppIndex <= 0} style={styles.navButton}>
          Back
        </button>
        <button onClick={goToNextApp} disabled={currentAppIndex >= applications.length - 1} style={styles.navButton}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: "8px",
    margin: "5px",
    fontSize: "16px",
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#3b8fc5",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
  },
  navItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  navItem: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    flexGrow: 1,
  },
  deleteAppButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  documents: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  },
  document: {
    marginBottom: "10px",
    backgroundColor: "#fff",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  link: {
    color: "#3b8fc5",
    marginLeft: "10px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  navButton: {
    padding: "10px 20px",
    backgroundColor: "#3b8fc5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
