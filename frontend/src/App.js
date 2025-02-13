import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth methods
import Home from "./Pages/Home";
import News from "./Pages/News";
import CryptoDetails from "./Pages/CryptoDetails";
import Portfolio from "./Pages/Portfolio";
import Navbar from "./Pages/Navbar";
import ConversionCalculator from "./Pages/ConversionCalculator";
import CryptoChart from "./Pages/CryptoChart";
import Signup from "./Pages/Logins/Signup";
import Login from "./Pages/Logins/login";
import GoogleLogin from "./Pages/Logins/GoogleLogin";
import PrivateRoute from "./Pages/Logins/PrivateRoutes";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Pages/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Privacy from "./Pages/Privacy";
import FAQ from "./Pages/FAQ";
import Terms from "./Pages/Terms";
import Support from "./Pages/Support";
import Resources from "./Pages/Resources";
import "./App.css";

// 🛠 Import Firebase Notification Functions
import { requestNotificationPermission, onMessageListener } from "./firebase/notification";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [user, setUser] = useState(null); // Track logged-in user

  useEffect(() => {
    // Track user's auth status
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state when authentication status changes
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1e1e1e" : "#fff";
    document.body.style.color = darkMode ? "white" : "#333";
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 🔔 Setup Push Notification on App Load
  useEffect(() => {
    requestNotificationPermission(); // Ask for Notification Permission

    onMessageListener()
      .then((payload) => {
        alert(`🔔 New Notification: ${payload.notification.title}`);
      })
      .catch((err) => console.log("Notification error: ", err));
  }, []);

  return (
    <Router>
      <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} /> {/* Pass user data to Navbar */}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
          <Route path="/portfolio" element={<PrivateRoute element={<Portfolio />} />} />
          <Route path="/convert" element={<ConversionCalculator />} />
          <Route path="/chart" element={<CryptoChart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
