import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CanteenApi from "./api/CanteenApi";
import NavBar from "./components/NavBar";

const CertainCanteenInfo = () => {
    const location = useLocation();
    const canteenName = new URLSearchParams(location.search).get('name');
    const [canteenInfo, setCanteenInfo] = useState(null);

    useEffect(() => {
        const fetchCanteenInfo = async () => {
            const info = await CanteenApi.getCanteenInfo(canteenName); // 使用您的获取食堂信息的方法
            setCanteenInfo(info);
        };

        fetchCanteenInfo();
    }, [canteenName]);

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <h1 className="mb-4 text-xl text-center">{canteenName}</h1>
                    <div>
                        {canteenInfo ? (
                            <div>
                                <h2>{canteenInfo.canteenName}</h2>
                                <p>简介: {canteenInfo.intro}</p>
                                <p>位置: {canteenInfo.location}</p>
                                <p>营业时间: {canteenInfo.businessHour}</p>
                                <p>公告: {canteenInfo.announcement}</p>
                            </div>
                        ) : (
                            <p>loading...</p>
                        )}
                        <br/>
                        <Link to={`/canteen`}>
                            <button
                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                type="button">
                                返回
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CertainCanteenInfo;