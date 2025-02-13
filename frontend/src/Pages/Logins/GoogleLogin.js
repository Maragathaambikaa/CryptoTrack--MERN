import React, { useEffect } from "react";
import { auth, googleLogin } from "../../firebase/auth"; // Correct path
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin(); // Use googleLogin function
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  // Redirect to portfolio when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
        navigate("/portfolio"); // Redirect after login
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  return (
    <button onClick={handleGoogleSignIn} style={{ padding: "10px", fontSize: "16px" }}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
