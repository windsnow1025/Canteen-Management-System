import axios from "axios";

export default class CanteenApi{

    /*
    [
    "一餐厅",
    "二食堂",
    "思餐厅",
    "五食堂",
    "迷你餐厅"
    ]
     */
    static async showAllName() {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/canteen/all-name", {
            headers: {Authorization: `${token}`}
        });
        return res.data;
    }


/*
{
    "id": 1,
    "canteenName": "一餐厅",
    "intro": "....",
    "location": "杨浦区军工路516号上海理工大学内",
    "businessHour": "06:00 – 22:00",
    "announcement": "一食堂禁止携带酒水"
}
*/
    static async getCanteenInfo(canteenName) {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/canteen/info", {
            params: {
                canteenName: canteenName
            },
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data;
    }

    /*
    {
    "message": "Create successful",
    "status": "Success"
    }
     */
    static async createCanteen(canteenName,location) {
        const token = localStorage.getItem('token');
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/canteen/create", {
            canteenName: canteenName,
            location:location
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    /*
{
    "message": "UpdateCanteenName successful",
    "status": "Success"
}
     */
    static async updateCanteenName(id,canteenName) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/canteen-name", {
            id:id,
            canteenName: canteenName
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }


    static async updateCanteenIntro(canteenName,intro) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/intro", {
            canteenName:canteenName,
            intro: intro
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async updateCanteenLocation(canteenName,location) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/location", {
            canteenName:canteenName,
            location: location
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async updateCanteenBusinessHours(canteenName,businessHours) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/business-hours", {
            canteenName:canteenName,
            businessHours: businessHours
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async updateCanteenAnnouncement(canteenName,announcement) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/announcement", {
            canteenName:canteenName,
            announcement: announcement
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }

    static async deleteCanteen(canteenName) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/delete", {
            canteenName:canteenName
        }, {
            headers: {Authorization: `${token}`}
        });
        return res.data.message;
    }


}