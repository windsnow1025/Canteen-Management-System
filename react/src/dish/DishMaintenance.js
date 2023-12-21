import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DishApi from "../api/DishApi";
import NavBar from "../components/NavBar";

const DishMaintenance = () => {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        canteenId: '', // Assuming you have a way to get the canteenId for the logged-in canteen admin
        dishName: '',
        price: '',
        discountRate: '',
        cuisine: '',
        picture: '',
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

    const handleAddDish = async () => {
        try {
            await DishApi.createDish(
                newDish.canteenId,
                newDish.dishName,
                newDish.price,
                newDish.discountRate,
                newDish.cuisine,
                newDish.picture
            );
            setNewDish({
                canteenId: '',
                dishName: '',
                price: '',
                discountRate: '',
                cuisine: '',
                picture: '',
            });
            fetchDishes();
        } catch (error) {
            console.error('Error adding dish:', error);
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
                            {/* Add other input fields for price, discountRate, cuisine, picture */}
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
                        <Link to={`/canteen-info`}>
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
