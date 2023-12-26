import React, {useEffect, useState} from 'react';
import { Pagination } from 'antd';
import { Input, Space } from 'antd';
import NavBar from "../components/NavBar";
import PostApi from "../api/PostApi";
import base64StringToDataURL from "../utils/Base64StringToDataURL";
import {Link} from "react-router-dom";
import UserApi from "../api/UserApi";

const Community = () => {
    const { Search } = Input;
    const [postInfos, setPostInfos] = useState([]);
    const [filteredPostInfos, setFilteredPostInfos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const fetchPostInfos = async () => {
            try {
                const response = await PostApi.getPostInfos();
                const postsWithImages = await Promise.all(response.map(async (post) => {
                    const imageUrl = await base64StringToDataURL(post.picture);
                    return {
                        ...post, picture: imageUrl,
                    };
                }));
                setPostInfos(postsWithImages);
                setFilteredPostInfos(postsWithImages);
            } catch (error) {
                console.error('Error fetching evaluation infos:', error);
            }
        };
        fetchPostInfos();
    }, []);

    const onSearch = (value) => {
        const lowerCaseValue = value.toLowerCase();
        const filtered = postInfos.filter(post => post.title.toLowerCase().includes(lowerCaseValue) || post.content.toLowerCase().includes(lowerCaseValue));
        setFilteredPostInfos(filtered);
    };

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setCurrentPage(pageNumber);
    };

    const handleLikeClick = async (postId) => {
        try {
            const response = await PostApi.likePost(postId);
            alert("点赞成功");
            console.log(response);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const PostComponent = ({ post }) => {
        const [username, setUsername] = useState('');

        useEffect(() => {
            const fetchUsername = async () => {
                try {
                    const username = await UserApi.getUserInfoById(post.userId);
                    setUsername(username);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            fetchUsername();
        }, [post.userId]);

        return (
            <div className="flex flex-col space-y-4 mb-5 m-4 w-full p-4">
                <h2 className="text-2xl font-bold">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4 items-center">
                        <img src={post.picture} alt={post.title} className="w-20 h-20"/>
                        <p className="text-gray-500">{post.content}</p>
                    </div>
                    <div className="text-gray-500 text-sm mt-2 text-right mr-10">
                        <p>{username}</p>
                        <p>{post.time}</p>
                        <button onClick={() => handleLikeClick(post.id)}>{post.upvote} 点赞</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <NavBar/>
            <h1 className="text-center font-bold text-4xl mt-5 mb-10 my-auto">社区内容</h1>
            <Search className="w-1/3 mx-32" placeholder="输入搜索条件（帖子标题、内容、用户名）" onSearch={onSearch} enterButton />
            <a href="/create-post">
                <button className="text-right text-sm bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">发帖</button>
            </a>
            <div >
                <div className="bg-white rounded-lg shadow-lg mx-32 mt-4">
                    {filteredPostInfos.map((post, index) => (
                        <div key={index} className="mb-4">
                            <PostComponent post={post} />
                        </div>
                    ))}
                </div>
                <Pagination className="text-center mt-4 mb-16" showQuickJumper defaultPageSize={pageSize} total={filteredPostInfos.length} onChange={onChange}/>
            </div>
        </>
    )
}

export default Community;