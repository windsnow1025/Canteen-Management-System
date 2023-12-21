import axios from 'axios';

export default class ComplaintApi {
    // 获取所有投诉信息
    static async getAllComplaintInfos() {
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/complaint/infos");
        return res.data;
    }

    // 获取特定投诉信息 by ID
    static async getComplaintInfoById(complaintId) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/complaint/infos/${complaintId}`);
        return res.data;
    }

    // 获取特定食堂的投诉信息 by Canteen ID
    static async getComplaintInfosByCanteenId(canteenId) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/complaint/infos/${canteenId}`);
        return res.data;
    }

    // 提交新的投诉
    static async addComplaint(canteenId, detail) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/complaint", {
            canteenId: canteenId,
            detail: detail
        });
        return res.data;
    }

    // 更新投诉结果
    static async updateComplaintResult(complaintId, complaintResult) {
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/complaint/result", {
            id: complaintId,
            complaintResult: complaintResult
        });
        return res.data;
    }

    // 删除投诉信息 by ID
    static async deleteComplaintById(complaintId) {
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/complaint/${complaintId}`);
        return res.data;
    }
}
