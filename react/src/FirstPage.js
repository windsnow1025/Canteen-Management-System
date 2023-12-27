import React, { useEffect, useState } from 'react';
import NavBar from "./components/NavBar";
import DishAPI from "./service/DishAPI";
import PostAPI from "./service/PostAPI";
import base64StringToDataURL from "./utils/Base64StringToDataURL";

const cardStyle: React.CSSProperties = {
    width: 620,
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
};

const FirstPage = () => {
    const [posts, setPosts] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [recommendDish, setRecommendDish] = useState([]);
    const [discountDish, setDiscountDish] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const allPosts = await PostAPI.getPostInfos();
            const topPosts = allPosts.slice(0, 6);
            for (let post of topPosts) {
                if (post.picture) {
                    post.picture = await base64StringToDataURL(post.picture);
                }
            }
            setPosts(topPosts);
        };

        const fetchDishes = async () => {
            const allDishes = await DishAPI.getAllDishInfos();
            const recommendDish = [];
            const discountDish = [];

            for (let dish of allDishes) {
                if (dish.picture) {
                    dish.picture = await base64StringToDataURL(dish.picture);
                }
            }

            setDishes(allDishes);

            for (let i = 0; i < 3; i++) {
                const index = Math.floor(Math.random() * allDishes.length);
                const selectedDish = allDishes.splice(index, 1)[0];
                recommendDish.push(selectedDish);
            }

            setRecommendDish(recommendDish);

            const discountedDishes = allDishes.filter(dish => dish.discount_rate !== 1);

            for (let i = 0; i < 3; i++) {
                const index = Math.floor(Math.random() * discountedDishes.length);
                const selectedDish = discountedDishes.splice(index, 1)[0];
                discountDish.push(selectedDish);
            }

            setDiscountDish(discountDish);
        };


        fetchPosts();
        fetchDishes();

    }, []);

    return (
        <>
            <NavBar />
            <div className="flex space-x-10 mx-auto max-w-screen-2xl mt-40 my-auto">
                <div className="flex flex-col space-y-4 w-1/2">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="font-bold text-xl mb-2 text-center">推荐菜品</h2>
                        {recommendDish && recommendDish.map((dish, index) => (
                            dish && <div key={index} className="flex justify-between items-center mb-2">
                                <div>{dish.dishName}</div>
                                <div className="flex justify-between items-center space-x-4">
                                    <img src={dish.picture} alt={dish.dishName} className="w-12 h-12"/>
                                    <div>{dish.price}元</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="font-bold text-xl mb-2 text-center">促销菜品</h2>
                        {discountDish && discountDish.map((dish, index) => (
                            dish && <div key={index} className="flex justify-between items-center mb-2">
                                <div>{dish.dishName}</div>
                                <div className="flex justify-between items-center space-x-4">
                                    <img src={dish.picture} alt={dish.dishName} className="w-12 h-12"/>
                                    <div>{dish.price}元</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 flex-grow w-1/2">
                    <a href="/community">
                        <h2 className="font-bold text-xl mb-2 text-center">热门帖子</h2>
                    </a>
                    <a href="/community">
                        {posts.map((post, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-bold">{post.title}</div>
                                <div className="flex justify-between items-center space-x-4">
                                    <img src={post.picture} alt={post.title} className="w-16 h-16"/>
                                    <div
                                        className="w-128 overflow-hidden overflow-ellipsis">{post.content}</div>
                                </div>
                            </div>
                        ))}
                    </a>
                </div>
            </div>
        </>
    );
};

export default FirstPage;