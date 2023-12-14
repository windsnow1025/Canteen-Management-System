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
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs">
                    <h1 className="mb-4 text-xl text-center">用户信息</h1>
            <div>
                {userInfo ? (
                    <div>
                        <p>ID: {userInfo.id}</p>
                        <p>Username: {userInfo.username}</p>
                        <p>User Type: {userInfo.userType}</p>
                        <p>User Level: {userInfo.userLevel}</p>
                        <p>Canteen ID: {userInfo.canteenId}</p>
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
