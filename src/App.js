// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HomePage, LoginPage, RegisterPage } from './pages'

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        {/* task manager routes */}
        <Route index path="/" element={<HomePage />} />
        {/* auth routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
