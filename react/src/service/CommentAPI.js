import axios from 'axios';

export default class CommentAPI {
    // 获取帖子的所有评论信息
    static async getCommentInfosByPostId(postId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/comment/infos/${postId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 提交新的评论
    static async addComment(postId, content) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/comment`, {
            postId: postId,
            content: content
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 删除评论信息 by ID
    static async deleteCommentById(commentId) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/comment/${commentId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }
}
