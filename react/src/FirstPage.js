import React from 'react';
import NavBar from "./components/NavBar";
import dishPhoto from './images/dish1.jpg';

const cardStyle: React.CSSProperties = {
    width: 620,
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
};

const recommendDish = [
    {
        dish_name: '麻辣香锅',
        picture: "images/dish1.jpg",
        price: 20
    },
    {
        dish_name: '不辣臭锅',
        picture: "images/dish1.jpg",
        price: 2
    }
];

const Posts= [
    {

    }
];
const FirstPage: React.FC = () => (
    <>
        <NavBar />
        <div className="flex space-x-10 mx-auto max-w-screen-2xl mt-40 my-auto">
            <div className="flex flex-col space-y-4 w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="font-bold text-xl mb-2 text-center">推荐菜品</h2>
                    {recommendDish.map((dish, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div>{dish.dish_name}</div>
                            <div className="flex justify-between items-center space-x-4">
                                <img src={dish.picture} alt={dish.dish_name} className="w-6 h-6" />
                                <div>{dish.price}元</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="font-bold text-xl mb-2 text-center">促销菜品</h2>
                    {recommendDish.map((dish, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div>{dish.dish_name}</div>
                            <div className="flex justify-between items-center space-x-4">
                                <img src={dish.picture} alt={dish.dish_name} className="w-6 h-6" />
                                <div>{dish.price}元</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 flex-grow w-1/2">
                <h2 className="font-bold text-xl mb-2 text-center">热门帖子</h2>
                {/* 热门帖子内容 */}
            </div>
        </div>
    </>
);

export default FirstPage;