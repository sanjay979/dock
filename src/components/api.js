import axios from "axios";

// API Base URL
const baseURL = "http://localhost:8080"; // Replace with your actual API base URL
const userId = sessionStorage.getItem("user_id");

// Axios instance for API calls
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all applications for the specified user
export const fetchApplications = () => {
  return api.get(`/applications?user_id=${userId}`);
};

// Create a new application, need to pass userId
export const createApplication = ( appName) => {
  return api.post("/applications?user_id=" + userId, { name: appName });
};

// Add a new document to an application
export const addDocumentToApplication = ( appID, docData) => {
  return api.post(`/documents?application_id=${appID}&user_id=${userId}`, docData);
};

// Delete an application based on application id and userId
export const deleteApplication = ( appName) => {
  return api.delete(`/applications/${encodeURIComponent(appName)}?user_id=${userId}`);
};

// Delete a document based on document id and application id
export const deleteDocument = (userId, appName, docName) => {
  return api.delete(
    `/applications/${encodeURIComponent(appName)}/documents/${encodeURIComponent(
      docName
    )}?user_id=${userId}`
  );
};

export default api;
