import NavBar from "./components/NavBar";
import React, {useEffect, useState} from "react";
import UserApi from "./api/UserApi";

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

        fetchUserInfo();
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
                                    <div className="flex space-x-4 p-8 m-4 w-3/4 max-w-xs">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded">食堂基本信息管理
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded">账号管理
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded">评价信息管理
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded">交流社区信息管理
                                        </button>
                                    </div>
                                )}
                                {userInfo.userType === 'admin' && (
                                    <div className="flex space-x-4 p-8 m-4 w-3/4 max-w-xs">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">菜品维护
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">食堂评价处理
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">活动公告
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">发布投票调查
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">投诉信息处理
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">发布最新推荐菜品
                                        </button>
                                    </div>
                                )}
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-red-800 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded w-1/2">退出登录
                                    </button>
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