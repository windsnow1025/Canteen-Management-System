import axios from 'axios';

export default class EvaluationApi {
    // 获取所有评价信息
    static async getAllEvaluationInfos() {
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/evaluation/infos");
        return res.data;
    }

    // 根据菜品ID获取评价信息
    static async getEvaluationInfosByDishId(dishId) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/evaluation/infos/${dishId}`);
        return res.data;
    }

    // 根据评价ID获取评价信息
    static async getEvaluationInfoById(id) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/evaluation/info/${id}`);
        return res.data;
    }

    // 添加评价
    static async addEvaluation(dishId, content, rating, picture) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/evaluation", {
            dishId: dishId,
            content: content,
            rating: rating,
            picture: picture
        });
        return res.data;
    }

    // 根据ID删除评价
    static async deleteEvaluationById(id) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/evaluation/${id}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }
}
