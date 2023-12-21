import React from 'react';
import './index.css';
import Register from "./user/Register";
import Login from "./user/Login";
import FirstPage from "./FirstPage";
import Community from "./Community";
import ChangePassword from "./user/ChangePassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from "./user/UserInfo";
import CanteenInfo from "./canteen/CanteenInfo";
import Canteen from "./canteen/Canteen"
import CertainCanteenInfo from "./canteen/CertainCanteenInfo";
import ModifyCanteenInfo from "./canteen/ModifyCanteenInfo";
import AddCanteen from "./canteen/AddCanteen";
import DishPage from "./dish/DishPage";
import DishMaintenance from "./dish/DishMaintenance";
import ModifyDishInfo from "./dish/ModifyDishInfo";

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
                    <Route path="/canteen-add" element={<AddCanteen />} />
                    <Route path="/dish" element={<DishPage />} />
                    <Route path="/dish-maintenance/:canteenId" element={<DishMaintenance />} />
                    <Route path="/modify-dish-info" element={<ModifyDishInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;