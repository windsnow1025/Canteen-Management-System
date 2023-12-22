import axios from 'axios';

export default class PostApi {
    static async getPostInfos() {
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/post/infos");
        return res.data;
    }

    static async getPostInfoById(id) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/post/info/${id}`);
        return res.data;
    }

    static async getPostInfosByTitle(title) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/post/infos/title", {
            title: title
        });
        return res.data;
    }

    static async getPostInfosByUsername(username) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/post/infos/username", {
            username: username
        });
        return res.data;
    }

    static async createPost(postData) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/post", postData);
        return res.data;
    }

    static async likePost(id) {
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/post/like/${id}`);
        return res.data;
    }

    static async deletePost(id) {
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/post/${id}`);
        return res.data;
    }
}