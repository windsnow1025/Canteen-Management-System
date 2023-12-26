import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import FirstPage from "./FirstPage";
import Register from "./page/user/Register";
import Login from "./page/user/Login";
import Community from "./page/community/Community";
import ChangePassword from "./page/user/ChangePassword";
import UserInfo from "./page/user/UserInfo";
import CanteenInfo from "./page/canteen/CanteenInfo";
import Canteen from "./page/canteen/Canteen"
import CertainCanteenInfo from "./page/canteen/CertainCanteenInfo";
import ModifyCanteenInfo from "./page/canteen/ModifyCanteenInfo";
import AddCanteen from "./page/canteen/AddCanteen";
import DishPage from "./page/dish/DishPage";
import DishMaintenance from "./page/dish/DishMaintenance";
import ModifyDishInfo from "./page/dish/ModifyDishInfo";
import Announcement from "./page/canteen/Announcement";
import ChatComponent from "./page/chat/ChatComponent";
import AccountManagement from "./page/user/AccountManagement";
import DishDetail from "./page/dish/DishDetail";
import EvaluationManagement from "./page/user/EvaluationManagement";
import CommunityManagement from "./page/user/CommunityManagement";
import CreatePost from "./page/community/CreatePost";
import PostDetail from "./page/community/PostDetail";
import ComplaintForm from "./page/user/ComplaintForm";
import ComplaintHandlingPage from "./page/user/ComplaintHandlingPage";
import UserProfile from "./page/user/UserProfile";
import VoteManagement from "./page/vote/VoteManagement";
import Vote from "./page/vote/Vote";
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
                    <Route path="/vote" element={<Vote/>} />
                    <Route path="/user/:userId" element={<UserProfile />} />
                    <Route path="/chat/:userName" element={<ChatComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;