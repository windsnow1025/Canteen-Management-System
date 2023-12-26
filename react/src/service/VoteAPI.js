import axios from 'axios';

export default class VoteAPI {
    static async getAllVoteInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/infos`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async getVoteInfosByCanteenId(canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/infos/${canteenId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async getVoteInfoById(voteId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/info/${voteId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async addVote(canteenId, title) {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote`, {
            canteenId: canteenId,
            title: title
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async updateVoteResult(voteId, voteResult) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/vote-result`, {
            id: voteId,
            voteResult: voteResult
        }, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }

    static async deleteVoteById(voteId) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/vote/${voteId}`, {
            headers: { Authorization: token ? `${token}` : '' }
        });
        return res.data;
    }
}
