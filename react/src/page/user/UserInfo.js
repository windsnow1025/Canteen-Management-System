import NavBar from "../../components/NavBar";
import React, {useEffect, useState} from "react";
import UserApi from "../../service/UserApi";

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

    return (<>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <h1 className="mb-4 text-xl text-center">用户信息</h1>
                    <div>
                        {userInfo ? (<div>
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
                                        <a href="/account-management">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">账号管理
                                            </button>
                                        </a>
                                        <a href="/evaluation-management">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">评价信息管理
                                            </button>
                                        </a>
                                        <a href="/community-management">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-56">交流社区信息管理
                                            </button>
                                        </a>
                                    </div>)}
                                {userInfo.userType === 'canteen_admin' && (
                                    <div className="flex flex-col space-y-4 items-center justify-center mt-4">
                                        <a href={`/dish-maintenance/${userInfo.canteenId}`}>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">菜品维护
                                            </button>
                                        </a>
                                        <a href="/announcement">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">活动公告发布
                                            </button>
                                        </a>
                                        <a href="/vote-management">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">发布投票调查
                                            </button>
                                        </a>
                                        <a href="/complaint-handling">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">投诉信息处理
                                            </button>
                                        </a>
                                    </div>)}

                            {userInfo.userType === 'consumer' && (
                                <a href="/complaint-form">
                                    <div>
                                        <br/>
                                        <button
                                            className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">投诉
                                        </button>
                                    </div>
                                </a>
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
                            </div>) : (<div>
                                <p>Loading user info...</p>
                                <a href="/login">
                                    <button
                                        className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        type="button" onClick={UserApi.deleteToken}>
                                        退出登录
                                    </button>
                                </a>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </>);
};

export default UserInfo;