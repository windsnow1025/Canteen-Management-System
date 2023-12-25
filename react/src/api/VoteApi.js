import axios from 'axios';

export default class VoteApi {
    // 获取所有投票信息
    static async getAllVoteInfos() {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/infos`);
        return res.data;
    }

    // 获取特定食堂的投票信息 by Canteen ID
    static async getVoteInfosByCanteenId(canteenId) {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/infos/${canteenId}`);
        return res.data;
    }

    // 获取特定投票信息 by ID
    static async getVoteInfoById(voteId) {
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/info/${voteId}`);
        return res.data;
    }

    // 提交新的投票
    static async addVote(canteenId, title) {
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote`, {
            canteenId: canteenId,
            title: title
        });
        return res.data;
    }

    // 更新投票结果
    static async updateVoteResult(voteId, voteResult) {
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/vote-result`, {
            id: voteId,
            voteResult: voteResult
        });
        return res.data;
    }

    // 删除投票信息 by ID
    static async deleteVoteById(voteId) {
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/${voteId}`);
        return res.data;
    }
}
