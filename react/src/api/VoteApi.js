import axios from 'axios';

export default class VoteApi {
    // 获取所有投票信息
    static async getAllVoteInfos() {
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/vote/infos");
        return res.data;
    }

    // 获取特定食堂的投票信息 by Canteen ID
    static async getVoteInfosByCanteenId(canteenId) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/vote/infos/${canteenId}`);
        return res.data;
    }

    // 获取特定投票信息 by ID
    static async getVoteInfoById(voteId) {
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/vote/info/${voteId}`);
        return res.data;
    }

    // 提交新的投票
    static async addVote(canteenId, title) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/vote", {
            canteenId: canteenId,
            title: title
        });
        return res.data;
    }

    // 更新投票结果
    static async updateVoteResult(voteId, voteResult) {
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/vote/vote-result", {
            id: voteId,
            voteResult: voteResult
        });
        return res.data;
    }

    // 删除投票信息 by ID
    static async deleteVoteById(voteId) {
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/vote/${voteId}`);
        return res.data;
    }
}
