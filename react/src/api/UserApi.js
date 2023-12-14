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

    static async updateUserType(userType) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/user/type", {
            userType: userType
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


}