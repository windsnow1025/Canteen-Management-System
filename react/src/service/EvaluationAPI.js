import axios from 'axios';

export default class EvaluationAPI {
    // 获取所有评价信息
    static async getAllEvaluationInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/evaluation/infos`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 根据菜品ID获取评价信息
    static async getEvaluationInfosByDishId(dishId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/evaluation/infos/${dishId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 根据评价ID获取评价信息
    static async getEvaluationInfoById(id) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/evaluation/info/${id}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 添加评价
    static async addEvaluation(dishId, content, rating, picture) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/evaluation`, {
            dishId: dishId,
            content: content,
            rating: rating,
            picture: picture
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 根据ID删除评价
    static async deleteEvaluationById(id) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/evaluation/${id}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }
}
