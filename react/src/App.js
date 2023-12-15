import React from 'react';
import './index.css';
import Register from "./Register";
import Login from "./Login";
import FirstPage from "./FirstPage";
import Community from "./Community";
import ChangePassword from "./ChangePassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from "./UserInfo";
import CanteenInfo from "./CanteenInfo";
import Canteen from "./Canteen"
import CertainCanteenInfo from "./CertainCanteenInfo";
import ModifyCanteenInfo from "./ModifyCanteenInfo";

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
                    <Route path="canteen-info" element={<CanteenInfo />} />
                    <Route path="canteen" element={<Canteen />} />
                    <Route path="/certain-canteen-info" element={<CertainCanteenInfo />} />
                    <Route path="/modify-canteen-info" element={<ModifyCanteenInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;