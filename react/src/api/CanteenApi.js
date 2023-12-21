import axios from "axios";

export default class CanteenApi{

    /*
[
    {
        "id": 1,
        "canteenName": "一餐厅",
        "intro": "....",
        "location": "....",
        "businessHour": "06:00 – 22:00",
        "announcement": "一食堂禁止携带酒水"
    },
    {
        "id": 2,
        "canteenName": "二食堂",
        "intro": "基础学院学子的唯二选择之一",
        "location": "基础学院学子的唯二选择之一",
        "businessHour": "06:00 – 22:00",
        "announcement": "二食堂禁止携带本部食堂的食物"
    },
    {
        "id": 3,
        "canteenName": "思餐厅",
        "intro": "思餐厅天下第二",
        "location": "思餐厅天下第二",
        "businessHour": "06:00 – 22:00",
        "announcement": "思餐厅禁止情侣长时间霸占座位，时间就是金钱我的朋友"
    },
    {
        "id": 4,
        "canteenName": "五食堂",
        "intro": "五食堂天下第一！！！！！！",
        "location": "五食堂天下第一！！！！！！",
        "businessHour": "06:00 – 22:00",
        "announcement": "五食堂禁止情侣入内，享受美食吧，诸位，五食堂是你们肠胃最坚实的壁垒"
    },
    {
        "id": 5,
        "canteenName": "迷你餐厅",
        "intro": "金刚胃训练处",
        "location": "金刚胃训练处",
        "businessHour": "06:00 – 22:00",
        "announcement": "请各位同学就餐前，准备好自己的医保卡"
    }
]
     */
    static async getCanteenInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/canteen/infos", {
            headers: { Authorization: `${token}` }
        });
        const canteens = res.data;
        return canteens.map(canteen => ({ id: canteen.id, name: canteen.canteenName }));
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
    static async getCanteenInfoById(canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/canteen/info/${canteenId}`, {
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
    static async createCanteen(canteenName, location, intro, businessHours, announcement) {
        const token = localStorage.getItem('token');
        const res = await axios.post("https://www.windsnow1025.com/learn/api/canteen/canteen", {
            canteenName: canteenName,
            location: location,
            intro: intro,
            businessHour: businessHours,
            announcement: announcement
        }, {
            headers: { Authorization: `${token}` }
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

    static async updateCanteenBusinessHours(canteenName, businessHour) {
        const token = localStorage.getItem('token');
        const res = await axios.put("https://www.windsnow1025.com/learn/api/canteen/canteen/business-hours", {
            canteenName:canteenName,
            businessHour: businessHour
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

    static async deleteCanteen(canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/canteen/${canteenId}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return res.data.message;
    }


}