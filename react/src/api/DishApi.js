import axios from "axios";

export default class DishApi{
    static async getAllDishInfos() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/infos`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async getAllDishNames() {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/names`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }


    static async getDishInfoByDishName(dishName) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/info?dishName=${dishName}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async getDishInfoById(id) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/info/${id}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async createDish(canteenId,dishName, price, discountRate, cuisine, picture) {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            `${process.env.REACT_APP_HTTP_API_BASE_URL}/dish`,
            {
                canteenId,
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
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/canteen-id`, {
            id:id,
            canteenId: canteenId
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishName(id, dishName) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/dish-name`, {
            id:id,
            dishName: dishName
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishPrice(id, price) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/price`, {
            id:id,
            price: price
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishDiscountRate(id, discountRate) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/discount-rate`, {
            id:id,
            discountRate: discountRate
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishCuisine(id, cuisine) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/cuisine`, {
            id:id,
            cuisine: cuisine
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async updateDishPicture(id, picture) {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/picture`, {
            id:id,
            picture: picture
        }, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }

    static async deleteDish(id) {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${process.env.REACT_APP_HTTP_API_BASE_URL}/dish/${id}`, {
            headers: { Authorization: `${token}` }
        });
        return res.data;
    }


}