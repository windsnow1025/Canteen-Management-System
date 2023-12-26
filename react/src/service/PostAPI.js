import axios from 'axios';

export default class PostAPI {
    static async getPostInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/infos`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async getPostInfoById(id) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/info/${id}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async getPostInfosByTitle(title) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/infos/title`, {
            title: title
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async getPostInfosByUsername(username) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/infos/username`, {
            username: username
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async createPost(postData) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post`, postData, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async likePost(id) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/like/${id}`, null, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async deletePost(id) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/${id}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }
}
