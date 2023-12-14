import React from 'react';
import './index.css';
import Register from "./Register";
import Login from "./Login";
import FirstPage from "./FirstPage";
import Community from "./Community";
import ChangePassword from "./ChangePassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from "./UserInfo";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/" element={<FirstPage />} />
                    <Route path="/user-info" element={<UserInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;