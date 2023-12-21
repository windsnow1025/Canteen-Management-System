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

    static async updatePassword(password) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/user/password", {
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

    static async updateUserType(username,userType,canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/user/type", {
            username:username,
            userType: userType,
            canteenId:canteenId
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async updateUserLevel(userLevel) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/user/level", {
            userLevel: userLevel
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }


    static async deleteToken(){
        localStorage.removeItem('token');
    }

    static async getAllUserInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/user/infos", {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async deleteUserById(userId) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/user/${userId}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data.message;
    }



}