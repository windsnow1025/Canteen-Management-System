import NavBar from "../components/NavBar";
import React, {useEffect, useState} from "react";
import UserApi from "../api/UserApi";
import {Link} from "react-router-dom";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await UserApi.getUserInfo();
                setUserInfo(userInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        const timer = setTimeout(() => {
            if (!userInfo) {
                // 如果3秒内没有获取到用户信息，则执行退出登录操作
                UserApi.deleteToken();
                window.location.href = `/login`;
            }
        }, 3000);

        fetchUserInfo();

        return () => clearTimeout(timer); // 清除定时器
    }, []);

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <h1 className="mb-4 text-xl text-center">用户信息</h1>
                    <div>
                        {userInfo ? (
                            <div>
                                <p>ID: {userInfo.id}</p>
                                <p>Username: {userInfo.username}</p>
                                <p>User Type: {userInfo.userType}</p>
                                <p>User Level: {userInfo.userLevel}</p>
                                <p>Canteen ID: {userInfo.canteenId}</p>
                                {userInfo.userType === 'master_admin' && (
                                    <div className="flex flex-col space-y-4 items-center justify-center mt-3">
                                        <a href="/canteen-info">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">食堂基本信息管理
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">账号管理
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">评价信息管理
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">交流社区信息管理
                                            </button>
                                        </a>
                                    </div>
                                )}
                                {userInfo.userType === 'canteen_admin' && (
                                    <div className="flex flex-col space-y-4 items-center justify-center mt-4">
                                        <a href={`/dish-maintenance/${userInfo.canteenId}`}>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">菜品维护
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">食堂评价处理
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">活动公告
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">发布投票调查
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">投诉信息处理
                                            </button>
                                        </a>
                                        <a>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">发布最新推荐菜品
                                            </button>
                                        </a>
                                    </div>
                                )}
                                <div className="flex flex-col space-y-4 items-center justify-center mt-4">
                                    <a href="/login">
                                        <button
                                            className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                            type="button" onClick={UserApi.deleteToken}>
                                            退出登录
                                        </button>
                                    </a>
                                    <a href="/change-password">
                                        <button
                                            className="bg-green-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                            type="button">
                                            修改密码
                                        </button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p>Loading user info...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;