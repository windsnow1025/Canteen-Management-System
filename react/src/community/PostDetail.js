import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostApi from '../api/PostApi';
import CommentApi from '../api/CommentApi';
import UserApi from '../api/UserApi';
import NavBar from "../components/NavBar";
import {Collapse} from "antd";
import base64StringToDataURL from "../utils/Base64StringToDataURL";

const {Panel} = Collapse;

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        // 获取帖子信息
        const fetchPostInfo = async () => {
            try {
                const post = await PostApi.getPostInfoById(postId);
                // 解析 Base64 图片字符串为 Data URL
                const imageUrl = await base64StringToDataURL(post.picture);

                setPost({
                    ...post,
                    picture: imageUrl,
                });
            } catch (error) {
                console.error('Error fetching post info:', error);
            }
        };

        // 获取帖子的所有评论信息
        const fetchCommentInfos = async () => {
            try {
                const response = await CommentApi.getCommentInfosByPostId(postId);
                setComments(response);

                // 新增的代码，获取每个评论的用户信息
                const newUserNames = {};
                for (const comment of response) {
                    const userInfo = await UserApi.getUserInfoById(comment.userId);
                    newUserNames[comment.userId] = userInfo.userName;
                }
                setUserNames(newUserNames);
            } catch (error) {
                console.error('Error fetching comment infos:', error);
            }
        };

        fetchPostInfo();
        fetchCommentInfos();
    }, [postId]);

    const handleAddComment = async () => {
        try {
            await CommentApi.addComment(postId, newComment);
            // 添加评论成功后，重新获取评论信息
            const response = await CommentApi.getCommentInfosByPostId(postId);
            setComments(response);
            // 清空新评论的数据
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <>
        <NavBar/>
        <div>
            {post && (
                <div>
                    <Collapse accordion>
                        <Panel header="帖子" key="1" className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                            {post.picture && (
                                <img src={post.picture} alt={"用户未上传图片"} className="w-40 h-40" />
                            )}
                        </Panel>
                        <Panel header="评论列表" key="2" className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                    {/* 评论列表 */}
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <p>用户名: {userNames[comment.userId]}</p>
                                <p>评论内容: {comment.content}</p>
                                {/* 其他评论信息... */}
                            </li>
                        ))}
                    </ul>
                        </Panel>

                        <Panel header="添加评论" key="3" className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                    {/* 添加评论表单 */}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        placeholder="评论内容"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" onClick={handleAddComment}>添加评论</button>
                        </Panel>
                    </Collapse>
                </div>
            )}
        </div>
        </>
    );
};

export default PostDetail;
