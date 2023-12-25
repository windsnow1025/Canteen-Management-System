import axios from 'axios';

export default class ComplaintApi {
    // 获取所有投诉信息
    static async getAllComplaintInfos() {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/infos`);
        return res.data;
    }

    // 获取特定投诉信息 by ID
    static async getComplaintInfoById(complaintId) {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/infos/${complaintId}`);
        return res.data;
    }

    // 获取特定食堂的投诉信息 by Canteen ID
    static async getComplaintInfosByCanteenId(canteenId) {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/infos/${canteenId}`);
        return res.data;
    }

    // 提交新的投诉
    static async addComplaint(canteenId, detail) {
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint`, {
            canteenId: canteenId,
            detail: detail
        });
        return res.data;
    }

    // 更新投诉结果
    static async updateComplaintResult(complaintId, complaintResult) {
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/result`, {
            id: complaintId,
            complaintResult: complaintResult
        });
        return res.data;
    }

    // 删除投诉信息 by ID
    static async deleteComplaintById(complaintId) {
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/complaint/${complaintId}`);
        return res.data;
    }
}
