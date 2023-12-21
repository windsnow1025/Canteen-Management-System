import axios from "axios";

export default class DishApi{
    static async getAllDishInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/dish/infos", {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async getAllDishNames() {
        const token = localStorage.getItem('token');
        const res = await axios.get("https://www.windsnow1025.com/learn/api/canteen/dish/names", {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }


    static async getDishInfoByDishName(dishName) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/dish/info?dishName=${dishName}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async getDishInfoById(id) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://www.windsnow1025.com/learn/api/canteen/dish/info/${id}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async createDish(dishName, price, discountRate, cuisine, picture) {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            "https://www.windsnow1025.com/learn/api/canteen/dish",
            {
                dishName,
                price,
                discountRate,
                cuisine,
                picture,
            },
            {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json', // 设置 content type 为 application/json
                },
            }
        );
        return res.data;
    }


    static async updateDishCanteenId(id, canteenId) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/dish/canteen-id`, {
            id:id,
            canteenId: canteenId
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishName(id, dishName) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/dish/dish-name`, {
            id:id,
            dishName: dishName
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishPrice(id, price) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/dish/price`, {
            id:id,
            price: price
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishDiscountRate(id, discountRate) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/dish/discount-rate`, {
            id:id,
            discountRate: discountRate
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishCuisine(id, cuisine) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/dish/cuisine`, {
            id:id,
            cuisine: cuisine
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishPicture(id, picture) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`https://www.windsnow1025.com/learn/api/canteen/dish/picture`, {
            id:id,
            picture: picture
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async deleteDish(id) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`https://www.windsnow1025.com/learn/api/canteen/dish/${id}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }


}