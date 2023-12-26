import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { Input } from 'antd';
import NavBar from "../../components/NavBar";
import DishAPI from "../../service/DishAPI";
import base64StringToDataURL from "../../utils/Base64StringToDataURL";

const { Search } = Input;

const DishPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [dishes, setDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [totalDishes, setTotalDishes] = useState(0);

    useEffect(() => {
        fetchDishes();
    }, [currentPage]);

    const fetchDishes = async () => {
        try {
            const response = await DishAPI.getAllDishInfos();

            // 解析 Base64 图片字符串为 Data URL
            const dishesWithImages = await Promise.all(response.map(async (dish) => {
                const imageUrl = await base64StringToDataURL(dish.picture);

                return {
                    ...dish,
                    picture: imageUrl,
                };
            }));

            setDishes(dishesWithImages);
            setFilteredDishes(dishesWithImages);
            setTotalDishes(dishesWithImages.length);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const onSearch = (value) => {
        const lowerCaseValue = value.toLowerCase();
        const filtered = dishes.filter(dish => dish.dishName.toLowerCase().includes(lowerCaseValue) || dish.cuisine.toLowerCase().includes(lowerCaseValue));
        setFilteredDishes(filtered);
        setTotalDishes(filtered.length);
    };

    const currentDishes = filteredDishes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <NavBar />
            <h1 className="text-center font-bold text-4xl mt-5 mb-10 my-auto">菜品列表</h1>
            <Search className="w-1/3 mx-32" placeholder="输入搜索条件（菜品名称、类型、描述）" onSearch={onSearch} enterButton />
            <div>
                <div className="grid grid-cols-3 gap-4 items-start justify-start bg-white rounded-lg shadow-lg mx-32 mt-4">
                    {currentDishes.map((dish, index) => (
                        <div className="flex flex-col space-y-4 mb-5 m-4 w-full p-4" key={index}>
                            <a href={`/dish/${dish.id}`}><h2 className="text-2xl font-bold">{dish.dishName}</h2></a>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-4 items-center">
                                    <img src={dish.picture} alt={"未上传菜品图片"} className="w-20 h-20" />
                                </div>
                                <div className="text-gray-500 text-sm mt-2 text-right">
                                    <p className="text-gray-500">{dish.cuisine}</p>
                                    <p>{dish.price} 元</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination className="text-center mt-4 mb-16" showQuickJumper defaultPageSize={pageSize} total={totalDishes} onChange={onChange} />
            </div>
        </>
    );
};

export default DishPage;