import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostApi from '../../service/PostApi';
import CommentApi from '../../service/CommentApi';
import UserApi from '../../service/UserApi';
import NavBar from "../../components/NavBar";
import { Collapse } from "antd";
import base64StringToDataURL from "../../utils/Base64StringToDataURL";

const CommentComponent = ({ comment }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // 获取用户信息
        const fetchUserInfo = async () => {
            try {
                const username = await UserApi.getUserNameById(comment.userId);
                setUserName(username);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [comment.userId]);

    return (
        <div className="border p-4 mb-4 rounded bg-white">
            {/* 显示用户ID和名字 */}
            <p className="font-bold">用户名: {userName}</p>
            <p>评论内容: {comment.content}</p>
            {/* 其他评论信息... */}
        </div>
    );
};

const { Panel } = Collapse;

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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
            alert("评论发表成功！")
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-40 pt-20">
                {post && (
                    <div className="bg-white p-4 mb-4 rounded">
                        <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                        <p className="mb-4">{post.content}</p>
                        {post.picture && (
                            <img src={post.picture} alt={"用户未上传图片"} className="w-40 h-40" />
                        )}
                    </div>
                )}

                <div className="bg-white p-4 mb-4 rounded overflow-y-auto max-h-60">
                    {/* 评论列表 */}
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <CommentComponent comment={comment} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-4 mb-4 rounded">
                    {/* 添加评论表单 */}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="评论内容"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={handleAddComment}
                    >
                        添加评论
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
