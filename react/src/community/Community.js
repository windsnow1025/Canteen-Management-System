import React, {useEffect, useState} from 'react';
import { Pagination } from 'antd';
import { Input, Space } from 'antd';
import NavBar from "../components/NavBar";
import PostApi from "../api/PostApi";
import base64StringToDataURL from "../utils/Base64StringToDataURL";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const Community = () => {
    const [postInfos, setPostInfos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        // 获取帖子信息
        const fetchPostInfos = async () => {
            try {
                const response = await PostApi.getPostInfos();
                // 解析 Base64 图片字符串为 Data URL
                const postsWithImages = await Promise.all(response.map(async (post) => {
                    const imageUrl = await base64StringToDataURL(post.picture);

                    return {
                        ...post, picture: imageUrl,
                    };
                }));
                setPostInfos(postsWithImages);
            } catch (error) {
                console.error('Error fetching evaluation infos:', error);
            }
        };

        fetchPostInfos();
    }, []);

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setCurrentPage(pageNumber);
    };
    const handleLikeClick = async (postId) => {
        try {
            // 调用 likePost 方法
            const response = await PostApi.likePost(postId);
            alert("点赞成功");

            // 处理成功的情况，例如刷新界面等
            console.log(response);
        } catch (error) {
            // 处理错误，比如打印错误日志或者显示错误消息
            console.error('Error liking post:', error);
        }
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
                <div className="flex flex-wrap items-start justify-start bg-white rounded-lg shadow-lg mx-32 mt-4">
                    {postInfos.map((post, index) => (
                            <div key={index} className="flex flex-col space-y-4 mb-5 m-4 w-full p-4">
                                <h2 className="text-2xl font-bold">{post.title}</h2>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-4 items-center">
                                        <img src={post.picture} alt={post.title} className="w-12 h-12"/>
                                        <p className="text-gray-500">{post.content}</p>
                                    </div>
                                    <div className="text-gray-500 text-sm mt-2 text-right">
                                        <p>{post.username}</p>
                                        <p>{post.time}</p>
                                        <button onClick={() => handleLikeClick(post.id)}>{post.upvote} 点赞</button>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
                <Pagination className="text-center mt-4 mb-16" showQuickJumper defaultPageSize={pageSize} total={postInfos.length} onChange={onChange}/>
            </div>
        </>
    )
}

export default Community;