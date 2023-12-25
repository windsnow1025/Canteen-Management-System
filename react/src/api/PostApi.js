import axios from 'axios';

export default class PostApi {
    static async getPostInfos() {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/infos`);
        return res.data;
    }

    static async getPostInfoById(id) {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/info/${id}`);
        return res.data;
    }

    static async getPostInfosByTitle(title) {
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/infos/title`, {
            title: title
        });
        return res.data;
    }

    static async getPostInfosByUsername(username) {
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/infos/username`, {
            username: username
        });
        return res.data;
    }

    static async createPost(postData) {
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post`, postData);
        return res.data;
    }

    static async likePost(id) {
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/like/${id}`);
        return res.data;
    }

    static async deletePost(id) {
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/post/${id}`);
        return res.data;
    }
}