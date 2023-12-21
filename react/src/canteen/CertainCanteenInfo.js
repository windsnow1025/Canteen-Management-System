import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CanteenApi from "../api/CanteenApi";
import NavBar from "../components/NavBar";

const CertainCanteenInfo = () => {
    const location = useLocation();
    const canteenId = new URLSearchParams(location.search).get('id');
    const [canteenInfo, setCanteenInfo] = useState(null);

    useEffect(() => {
        const fetchCanteenInfo = async () => {
            const info = await CanteenApi.getCanteenInfoById(canteenId);
            setCanteenInfo(info);
        };

        fetchCanteenInfo();
    }, [canteenId]);

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <div>
                        {canteenInfo ? (
                            <div>
                                <h1 className="mb-4 text-xl text-center">{canteenInfo.canteenName}</h1>
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