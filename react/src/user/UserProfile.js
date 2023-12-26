import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import NavBar from "../components/NavBar";
import UserApi from "../api/UserApi";
import PostApi from "../api/PostApi";

const UserProfile = () => {
    const { userId } = useParams();
    const [userName, setUserName] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await UserApi.getUserNameById(userId);
                setUserName(response);
                const posts = await PostApi.getPostInfosByUsername(response);
                setUserPosts(posts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <div className="p-40 pt-20">
                <div className="bg-white p-4 mb-4 rounded">
                    <h3 className="text-xl font-bold mb-2 text-center">{userName}</h3>
                    <h1 className="text-xl font-bold mb-2">发布过的帖子：</h1>
                    {userPosts.map((post, index) => (
                        <div key={index} className="border p-4 mb-4 rounded bg-white">
                            <h3 className="font-bold mb-2">{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                    <Link to={`/chat/${userName}`} className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded mx-auto block">私聊</Link>
                </div>

            </div>
        </>
    );
};

export default UserProfile;