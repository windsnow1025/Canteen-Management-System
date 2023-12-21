import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DishApi from "../api/DishApi";
import NavBar from "../components/NavBar";

const DishMaintenance = () => {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        dishName: '',
        price: '',
        discountRate: '',
        cuisine: '',
        picture: null, // 添加一个新的字段用于保存 Base64 编码
    });


    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await DishApi.getAllDishInfos();
            setDishes(response);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };


    const handleDeleteDish = async (id) => {
        try {
            await DishApi.deleteDish(id);
            fetchDishes();
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    const handleAddDish = async () => {
        try {
            const { dishName, price, discountRate, cuisine, picture } = newDish;

            await DishApi.createDish(dishName, price, discountRate, cuisine, picture);

            // 其他逻辑，例如清空表单或刷新数据
        } catch (error) {
            console.error("Error adding dish:", error);
            // 处理错误的逻辑
        }
    };


    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <div>
                        <h1 className="mb-4 text-xl text-center">菜品维护</h1>
                        <div>
                            <p>菜品名:</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                type="text"
                                value={newDish.dishName}
                                onChange={(e) => setNewDish({ ...newDish, dishName: e.target.value })}
                            />
                            <p>价格:</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                type="text"
                                value={newDish.price}
                                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                            />
                            <p>折扣率:</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                type="text"
                                value={newDish.discountRate}
                                onChange={(e) => setNewDish({ ...newDish, discountRate: e.target.value })}
                            />
                            <p>菜系:</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                type="text"
                                value={newDish.cuisine}
                                onChange={(e) => setNewDish({ ...newDish, cuisine: e.target.value })}
                            />
                            <p>图片:</p>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        setNewDish({ ...newDish, picture: reader.result });
                                    };

                                    reader.readAsDataURL(file);
                                }}
                            />

                            <button
                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                onClick={handleAddDish}
                            >
                                添加菜品
                            </button>
                        </div>

                        <ul>
                            {dishes.map((dish) => (
                                <li key={dish.id}>
                                    {dish.dishName}{' '}
                                    <button onClick={() => handleDeleteDish(dish.id)}>删除</button>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <Link to={`/user-info`}>
                            <button
                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                type="button"
                            >
                                返回
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DishMaintenance;
