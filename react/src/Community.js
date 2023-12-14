import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Input, Space } from 'antd';
import NavBar from "./components/NavBar";
import { content as PostContent } from "./content/PostContent";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const Community = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setCurrentPage(pageNumber);
    };

    const currentPosts = PostContent.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <NavBar/>
            <h1 className="text-center font-bold text-4xl mt-5 mb-10 my-auto">社区内容</h1>
            <Search className="w-1/3 mx-32" placeholder="输入搜索条件（帖子标题、内容、用户名）" onSearch={onSearch} enterButton />
            <div >
                <div className="flex flex-wrap items-start justify-start bg-white rounded-lg shadow-lg mx-32 mt-4">
                    {currentPosts.map((post, index) => (
                        <a href="/PostContentPage">
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
                                        <p>{post.upvote} 点赞</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <Pagination className="text-center mt-4 mb-16" showQuickJumper defaultPageSize={pageSize} total={PostContent.length} onChange={onChange}/>
            </div>
        </>
    )
}

export default Community;