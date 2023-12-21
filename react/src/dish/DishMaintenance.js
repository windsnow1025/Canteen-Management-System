import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import DishApi from "../api/DishApi";
import NavBar from "../components/NavBar";
import {Collapse} from 'antd';

const {Panel} = Collapse;


const DishMaintenance = () => {
    const {canteenId} = useParams();
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        dishName: '', price: '', discountRate: '', cuisine: '', picture: null, // 添加一个新的字段用于保存 Base64 编码
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
            const {dishName, price, discountRate, cuisine, picture} = newDish;

            await DishApi.createDish(canteenId, dishName, price, discountRate, cuisine, picture);

            // 其他逻辑，例如清空表单或刷新数据
        } catch (error) {
            console.error("Error adding dish:", error);
            // 处理错误的逻辑
        }
    };


    return (<>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <div>
                        <h1 className="mb-4 text-xl text-center">菜品维护</h1>

                        <Collapse accordion>
                            {/* 餐厅ID */}
                            <Panel header="餐厅ID" key="1">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={canteenId}
                                    readOnly
                                />
                            </Panel>

                            {/* 添加菜品 */}
                            <Panel header="添加菜品" key="2">
                                {/* 菜品名 */}
                                <p>菜品名:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newDish.dishName}
                                    onChange={(e) => setNewDish({...newDish, dishName: e.target.value})}
                                />

                                {/* 价格 */}
                                <p>价格:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newDish.price}
                                    onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                                />

                                {/* 折扣率 */}
                                <p>折扣率:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newDish.discountRate}
                                    onChange={(e) => setNewDish({...newDish, discountRate: e.target.value})}
                                />

                                {/* 菜系 */}
                                <p>菜系:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newDish.cuisine}
                                    onChange={(e) => setNewDish({...newDish, cuisine: e.target.value})}
                                />

                                {/* 图片上传 */}
                                <p>图片:</p>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const reader = new FileReader();

                                        reader.onloadend = () => {
                                            const base64String = reader.result.split(",")[1];
                                            setNewDish({...newDish, picture: base64String});
                                        };

                                        reader.readAsDataURL(file);
                                    }}
                                />

                                {/* 添加菜品按钮 */}
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handleAddDish}
                                >
                                    添加菜品
                                </button>
                            </Panel>

                            {/*已有菜品列表*/}
                            <Panel header="已有菜品列表" key="3">
                                <ul>
                                    {dishes
                                        .filter((dish) => dish.canteen_id === parseInt(canteenId, 10))
                                        .map((dish) => (
                                            <li key={dish.id} className="flex justify-between items-center">
                                                <span>
                                                {/* 使用外部 div 包裹 Link，并添加指定样式 */}
                                                    <div className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                                                        <Link to={`/modify-dish-info?dishId=${dish.id}`}>{dish.dishName}</Link>
                                                    </div>
                                                </span>
                                                <button
                                                    className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleDeleteDish(dish.id)}
                                                >
                                                    删除
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                            </Panel>
                        </Collapse>
                            {/* 返回按钮 */}
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
        </>);
};

export default DishMaintenance;
