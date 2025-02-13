import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { loginWithEmail, googleLogin, auth } from "../../firebase/auth"; 
import { onAuthStateChanged } from "firebase/auth";
import './login.css' 

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password); 
      navigate("/portfolio"); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); 
      navigate("/portfolio"); 
    } catch (error) {
      console.error("Google Login Error:", error.message);
      setError("Google login failed. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
        navigate("/portfolio");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <button onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
