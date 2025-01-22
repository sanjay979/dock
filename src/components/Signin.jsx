import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './firebase'; // Adjust the path if necessary
import { signInWithPopup } from "firebase/auth";

const Signin = () => {
    const navigate = useNavigate();

    const handleGoogleSignin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            };

            // Send user data to the backend API
            const response = await fetch("http://localhost:8080/store-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            // Get the user_id from the backend response (ensure backend sends it back)
            const data = await response.json();

            if (data.success) {
                const userId = data.user_id; // Assuming user_id is sent in the backend response
                sessionStorage.setItem('user_id', userId); // Store the user_id in session storage
                
                // Navigate to page2 after successful login
                navigate("/page2");
            } else {
                console.error("Error in storing user data");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div style={containerStyle}>
    <h1 style={headingStyle}>Signin</h1>
    <button onClick={handleGoogleSignin} style={buttonStyle}>Sign in with Google</button>
    </div>

    );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full screen height
    backgroundColor: '#f4f4f9', // Light background color
};

const headingStyle = {
    fontSize: '2rem', // Larger font size
    marginBottom: '20px', // Space between heading and button
    color: '#333', // Dark text color
};

const buttonStyle = {
    backgroundColor: '#4285F4', // Google blue color
    color: 'white',
    border: 'none',
    padding: '15px 25px', // More padding for better clickability
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer', // Pointer cursor when hovering
    transition: 'background-color 0.3s ease', // Smooth transition for background color change
};

const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#356ac1', // Slightly darker color for hover effect
};

// For hover effect (not in inline styles, but if you are using CSS)
buttonStyle[":hover"] = buttonHoverStyle;


export default Signin;
