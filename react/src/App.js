import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import FirstPage from "./FirstPage";
import Community from "./community/Community";
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
import Announcement from "./canteen/Announcement";
import ChatComponent from "./chat/ChatComponent";
import AccountManagement from "./user/AccountManagement";
import DishDetail from "./dish/DishDetail";
import EvaluationManagement from "./user/EvaluationManagement";
import CommunityManagement from "./user/CommunityManagement";
import CreatePost from "./community/CreatePost";
import PostDetail from "./community/PostDetail";
import ComplaintForm from "./user/ComplaintForm";
import ComplaintHandlingPage from "./user/ComplaintHandlingPage";
import UserProfile from "./user/UserProfile";
import VoteManagement from "./vote/VoteManagement";
import Vote from "./vote/Vote";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<FirstPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/user-info" element={<UserInfo />} />
                    <Route path="/canteen-info" element={<CanteenInfo />} />
                    <Route path="/canteen" element={<Canteen />} />
                    <Route path="/certain-canteen-info" element={<CertainCanteenInfo />} />
                    <Route path="/modify-canteen-info" element={<ModifyCanteenInfo />} />
                    <Route path="/canteen-add" element={<AddCanteen />} />
                    <Route path="/dish" element={<DishPage />} />
                    <Route path="/dish-maintenance/:canteenId" element={<DishMaintenance />} />
                    <Route path="/modify-dish-info" element={<ModifyDishInfo />} />
                    <Route path="/announcement" element={<Announcement />} />
                    <Route path="/account-management" element={<AccountManagement />} />
                    <Route path="/dish/:dishId" element={<DishDetail/>} />
                    <Route path="/evaluation-management" element={<EvaluationManagement/>} />
                    <Route path="/community-management" element={<CommunityManagement/>} />
                    <Route path="/create-post" element={<CreatePost/>} />
                    <Route path="/post/:postId" element={<PostDetail/>} />
                    <Route path="/complaint-form" element={<ComplaintForm/>} />
                    <Route path="/complaint-handling" element={<ComplaintHandlingPage/>} />
                    <Route path="/vote-management" element={<VoteManagement/>} />
                    <Route path="/vote/" element={<Vote/>} />
                    <Route path="/user/:userId" element={<UserProfile />} />
                    <Route path="/chat/:userName" element={<ChatComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;