import axios from 'axios';

export default class ComplaintApi {
    // 获取所有投诉信息
    static async getAllComplaintInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/infos`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 获取特定投诉信息 by ID
    static async getComplaintInfoById(complaintId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/infos/${complaintId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 获取特定食堂的投诉信息 by Canteen ID
    static async getComplaintInfosByCanteenId(canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/infos/${canteenId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 提交新的投诉
    static async addComplaint(canteenId, detail) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint`, {
            canteenId: canteenId,
            detail: detail
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 更新投诉结果
    static async updateComplaintResult(complaintId, complaintResult) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/result`, {
            id: complaintId,
            complaintResult: complaintResult
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    // 删除投诉信息 by ID
    static async deleteComplaintById(complaintId) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/${complaintId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }
}
