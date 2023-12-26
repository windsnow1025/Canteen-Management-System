import React, {useEffect, useState} from 'react';
import { Pagination, Button } from 'antd';
import { Input } from 'antd';
import NavBar from "../../components/NavBar";
import PostAPI from "../../service/PostAPI";
import base64StringToDataURL from "../../utils/Base64StringToDataURL";
import {Link} from "react-router-dom";
import UserAPI from "../../service/UserAPI";

const Community = () => {
    const { Search } = Input;
    const [postInfos, setPostInfos] = useState([]);
    const [filteredPostInfos, setFilteredPostInfos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortTime, setSortTime] = useState(true); // true for ascending, false for descending
    const [sortLikes, setSortLikes] = useState(true); // true for ascending, false for descending
    const pageSize = 5;

    useEffect(() => {
        const fetchPostInfos = async () => {
            try {
                const response = await PostAPI.getPostInfos();
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

    const sortByTime = () => {
        const sorted = [...filteredPostInfos].sort((a, b) => {
            const aTime = new Date(a.time.replace(/-/g, '/'));
            const bTime = new Date(b.time.replace(/-/g, '/'));
            return sortTime ? aTime - bTime : bTime - aTime;
        });
        setFilteredPostInfos(sorted);
        setSortTime(!sortTime); // reverse the sort direction
    };

    const sortByLikes = () => {
        const sorted = [...filteredPostInfos].sort((a, b) => sortLikes ? a.upvote - b.upvote : b.upvote - a.upvote);
        setFilteredPostInfos(sorted);
        setSortLikes(!sortLikes); // reverse the sort direction
    };

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setCurrentPage(pageNumber);
    };

    const handleLikeClick = async (postId) => {
        try {
            const response = await PostAPI.likePost(postId);
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
                    const username = await UserAPI.getUserNameById(post.userId);
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
                        <Link to={`/user/${post.userId}`}>{username}</Link>
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
            <div className="flex justify-between items-center mx-32">
                <Search className="w-1/3" placeholder="输入搜索条件（帖子标题、内容、用户名）" onSearch={onSearch}
                        enterButton/>
                <div className="flex space-x-4">
                    <Button onClick={sortByTime}>按时间{sortTime ? "升序" : "降序"}</Button>
                    <Button onClick={sortByLikes}>按点赞数{sortLikes ? "升序" : "降序"}</Button>
                    <a href="/create-post" className="mr-10">
                        <button
                            className="text-sm bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">发帖
                        </button>
                    </a>
                </div>
            </div>

            <div>
                <div className="bg-white rounded-lg shadow-lg mx-32 mt-4">
                    {filteredPostInfos.map((post, index) => (
                        <div key={index} className="mb-4">
                        <PostComponent post={post}/>
                        </div>
                    ))}
                </div>
                <Pagination className="text-center mt-4 mb-16" showQuickJumper defaultPageSize={pageSize}
                            total={filteredPostInfos.length} onChange={onChange}/>
            </div>
        </>
    )
}

export default Community;