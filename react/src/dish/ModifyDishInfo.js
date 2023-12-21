import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import DishApi from "../api/DishApi";
import NavBar from "../components/NavBar";

const ModifyDishInfo = () => {
    const location = useLocation();
    const dishId = new URLSearchParams(location.search).get('dishId');
    const [dishInfo, setDishInfo] = useState(null);
    const [newDishName, setNewDishName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDiscountRate, setNewDiscountRate] = useState('');
    const [newCuisine, setNewCuisine] = useState('');
    const [newPicture, setNewPicture] = useState('');

    // 处理菜品名修改
    const handleDishNameChange = async () => {
        try {
            // 更新菜品名称
            await DishApi.updateDishName(dishId, newDishName);
            // 更新完数据后重新获取菜品信息
            const info = await DishApi.getDishInfoById(dishId);
            setDishInfo(info);
        } catch (error) {
            // 处理错误
            console.error('Error updating dish name or fetching dish info:', error);
        }
    };

    // 处理价格修改
    const handlePriceChange = async () => {
        await DishApi.updateDishPrice(dishId, newPrice);
        // 更新完数据后重新获取菜品信息
        const info = await DishApi.getDishInfoById(dishId);
        setDishInfo(info);
    };

    // 处理折扣率修改
    const handleDiscountRateChange = async () => {
        await DishApi.updateDishDiscountRate(dishId, newDiscountRate);
        // 更新完数据后重新获取菜品信息
        const info = await DishApi.getDishInfoById(dishId);
        setDishInfo(info);
    };

    // 处理菜系修改
    const handleCuisineChange = async () => {
        await DishApi.updateDishCuisine(dishId, newCuisine);
        // 更新完数据后重新获取菜品信息
        const info = await DishApi.getDishInfoById(dishId);
        setDishInfo(info);
    };

    // 处理图片修改
    const handlePictureChange = async () => {
        await DishApi.updateDishPicture(dishId, newPicture);
        // 更新完数据后重新获取菜品信息
        const info = await DishApi.getDishInfoById(dishId);
        setDishInfo(info);
    };

    // 处理删除
    const handleDishDelete = async () => {
        try {
            await DishApi.deleteDish(dishId);
            // 处理删除成功的逻辑，例如重定向到菜品列表页面
            navigateTo('/dish-info');
        } catch (error) {
            console.error('Error deleting dish:', error);
            // 处理删除失败的逻辑，例如显示错误消息
        }
    };

    const navigate = useNavigate();

    const handleGoBack = () => {
        // 使用 navigate(-1) 返回上一页
        navigate(-1);
    };

    const navigateTo = (path) => {
        // 使用 window.location.href 导航到指定的路径
        window.location.href = path;
    };

    useEffect(() => {
        const fetchDishInfo = async () => {
            try {
                const info = await DishApi.getDishInfoById(dishId);
                setDishInfo(info);
                setNewDishName(info.dishName);
                setNewPrice(info.price);
                setNewDiscountRate(info.discountRate);
                setNewCuisine(info.cuisine);
                setNewPicture(info.picture);
            } catch (error) {
                // 处理错误
                console.error('Error fetching dish info:', error);
            }
        };
        fetchDishInfo();
    }, [dishId]);

    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <div>
                        {dishInfo ? (
                            <div>
                                <h1 className="mb-4 text-xl text-center">{newDishName}</h1>

                                <p>菜品名:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newDishName}
                                    onChange={(e) => setNewDishName(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handleDishNameChange}
                                >
                                    修改菜品名
                                </button>

                                <p>价格:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handlePriceChange}
                                >
                                    修改价格
                                </button>

                                <p>折扣率:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newDiscountRate}
                                    onChange={(e) => setNewDiscountRate(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handleDiscountRateChange}
                                >
                                    修改折扣率
                                </button>

                                <p>菜系:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newCuisine}
                                    onChange={(e) => setNewCuisine(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handleCuisineChange}
                                >
                                    修改菜系
                                </button>

                                <p>图片:</p>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const reader = new FileReader();

                                        reader.onloadend = () => {
                                            // 去掉前缀部分
                                            const base64String = reader.result.split(",")[1];
                                            setNewPicture(base64String);
                                        };

                                        reader.readAsDataURL(file);
                                    }}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handlePictureChange}
                                >
                                    修改图片
                                </button>

                                <button
                                    className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    type="button"
                                    onClick={handleDishDelete}
                                >
                                    删除菜品
                                </button>
                            </div>
                        ) : (
                            <p>loading...</p>
                        )}
                        <br />
                        <button
                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                            type="button"
                            onClick={handleGoBack}
                        >
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModifyDishInfo;
