import axios from 'axios';

export default class UserApi {
    static async signIn(username, password) {
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/user/signin", {
            username:username,
            password:password
        });
        return res.data.token;
    }

    static async signUp(username, password) {
        const res=await axios.post("https://www.windsnow1025.com/learn/api/canteen/user/signup", {
            username:username,
            password:password
        });
        return res.data.message
    }

    static async updatePassword(username, password) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/user/password", {
            username: username,
            password: password
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async getUserInfo() {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/user/info", {
            headers: {Authorization: `${token}`}
        });
        return res.data;
    }



    async fetchCredit() {
        const token = localStorage.getItem('token');
        const res = await axios.get("/api/user/credit", {
            headers: {Authorization: `Bearer ${token}`}
        });
        return res.data.credit;
    }
}