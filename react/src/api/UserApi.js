import axios from 'axios';

export default class UserApi {
    static async signIn(username, password) {
        const res = await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/signin`, {
            username:username,
            password:password
        });
        return res.data.token;
    }

    static async signUp(username, password) {
        const res=await axios.post(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/signup`, {
            username:username,
            password:password
        });
        return res.data.message
    }

    static async updatePassword(password) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/password`, {
            password: password
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async getUserInfo() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/info`, {
            headers: {Authorization: `${token}`}
        });
        return res.data;
    }

    static async updateUserType(userId,userType,canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/type/${userId}`, {
            userType: userType,
            canteenId:canteenId
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async updateUserLevel(userLevel) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/level`, {
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
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/infos`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async deleteUserById(userId) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/${userId}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data.message;
    }

    static async getUserInfoById(userId) {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/user/info/${userId}`, {
                headers: { Authorization: token ? `${token}` : '' }
            });
            return response.data;
    }


}