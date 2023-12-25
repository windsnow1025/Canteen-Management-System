import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import base64StringToDataURL from "../utils/Base64StringToDataURL";
import {Collapse} from "antd";
import PostApi from "../api/PostApi";
import CommentApi from "../api/CommentApi";

const {Panel} = Collapse;

const CommunityManagement = () => {
    const [postInfos, setPostInfos] = useState([]);
    const [postId, setPostId] = useState([]);
    const [commentId, setCommentId] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [comments, setComments] = useState([]);



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
    }, [postInfos]);

    const handlePostIdClick = async (postId) => {
        try {
            const commentInfos = await CommentApi.getCommentInfosByPostId(postId);
            setComments(commentInfos);
            setSelectedPostId(postId);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    const handleDeletePost = async (postId) => {
        try {
            await PostApi.deletePost(postId);
            window.location.reload()
        } catch (error) {
            console.error('Error adding evaluation:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await CommentApi.deleteCommentById(commentId);
            window.location.reload()
        } catch (error) {
            console.error('Error adding evaluation:', error);
        }
    };


    return (<>
        <NavBar/>
        <div>
            {postInfos && (<div>
                <Collapse accordion>
                    <Panel
                        header="帖子列表"
                        key="1"
                        className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {/* 帖子列表 */}
                        <ul>
                            {postInfos.map((post) => (
                                <li key={post.id}>
                                    <p onClick={() => handlePostIdClick(post.id)}>帖子ID(点击查看回复): {post.id}</p>
                                    <p>用户ID: {post.userId}</p>
                                    <p>发布时间: {post.time}</p>
                                    <p>标题: {post.title}</p>
                                    <p>内容: {post.content}</p>
                                    <p>点赞数: {post.upvote}</p>
                                    {post.picture && (<img src={post.picture} alt={"用户未上传图片"}
                                                           className="w-40 h-40"/>)}
                                    {selectedPostId === post.id && (
                                        <div>
                                            <h3>评论列表</h3>
                                            <ul>
                                                {comments.map((comment) => (
                                                    <li key={comment.id}>
                                                        <p>评论ID: {comment.id}</p>
                                                        <p>用户ID: {comment.userId}</p>
                                                        <p>帖子ID: {comment.postId}</p>
                                                        <p>内容: {comment.content}</p>
                                                        <button
                                                            className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                        >
                                                            删除
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {/* Delete button for admins */}
                                        <button
                                            className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDeletePost(post.id)}
                                        >
                                            删除
                                        </button>
                                </li>
                            ))}
                        </ul>
                    </Panel>

                    <Panel header="删除帖子" key="2"
                           className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                        {/* 删除帖子 */}
                        <p>帖子ID:</p>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            type="text"
                            value={postId}
                            onChange={(e) => setPostId(e.target.value)}
                        />
                        <button
                            className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeletePost(postId)}
                        >
                            删除
                        </button>
                    </Panel>
                    <Panel header="删除回复" key="3"
                           className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                        {/* 删除回复 */}
                        <p>帖子回复ID:</p>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            type="text"
                            value={commentId}
                            onChange={(e) => setCommentId(e.target.value)}
                        />
                        <button
                            className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteComment(commentId)}
                        >
                            删除
                        </button>
                    </Panel>
                </Collapse>
            </div>)}
        </div>
    </>);
};

export default CommunityManagement;