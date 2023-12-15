import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CanteenApi from "./api/CanteenApi";
import NavBar from "./components/NavBar";

const ModifyCanteenInfo = () => {
    const location = useLocation();
    const canteenName = new URLSearchParams(location.search).get('name');
    const [canteenInfo, setCanteenInfo] = useState(null);
    const [newIntro, setNewIntro] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newBusinessHour, setNewBusinessHour] = useState('');
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [newCanteenName, setNewCanteenName] = useState('');
    const [id, setId] = useState(null);

    // 处理餐厅名修改
    const handleCanteenNameChange = async () => {
        try {
            // 更新食堂名称
            await CanteenApi.updateCanteenName(id, newCanteenName);

            // 更新完数据后重新获取食堂信息
            const info = await CanteenApi.getCanteenInfoById(id);
            setCanteenInfo(info);
        } catch (error) {
            // 处理错误
            console.error('Error updating canteen name or fetching canteen info:', error);
        }
    };

    // 处理简介修改
    const handleIntroChange = async () => {
        await CanteenApi.updateCanteenIntro(canteenName, newIntro);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfo(canteenName);
        setCanteenInfo(info);
    };

    // 处理位置修改
    const handleLocationChange = async () => {
        await CanteenApi.updateCanteenLocation(canteenName, newLocation);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfo(canteenName);
        setCanteenInfo(info);
    };

    // 处理营业时间修改
    const handleBusinessHoursChange = async () => {
        await CanteenApi.updateCanteenBusinessHour(canteenName, newBusinessHour);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfo(canteenName);
        setCanteenInfo(info);
    };

    // 处理公告修改
    const handleAnnouncementChange = async () => {
        await CanteenApi.updateCanteenAnnouncement(canteenName, newAnnouncement);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfo(canteenName);
        setCanteenInfo(info);
    };

    // 处理删除
    const handleCanteenDelete = async () => {
        await CanteenApi.deleteCanteen(canteenName);
    };


    useEffect(() => {
        const fetchCanteenInfo = async () => {
            try {
                const info = await CanteenApi.getCanteenInfo(canteenName);
                setCanteenInfo(info);
                setNewIntro(info.intro);
                setNewLocation(info.location);
                setNewBusinessHour(info.businessHour);
                setNewAnnouncement(info.announcement);
                setId(info.id);
                setNewCanteenName(info.canteenName);
            } catch (error) {
                // 处理错误
                console.error('Error fetching canteen info:', error);
            }
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

                                <p>餐厅名:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newCanteenName} onChange={(e) => setNewCanteenName(e.target.value)} />
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleCanteenNameChange}>修改餐厅名</button>
                                <p>简介:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newIntro} onChange={(e) => setNewIntro(e.target.value)} />
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleIntroChange}>修改简介</button>
                                <p>位置:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/>
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleLocationChange}>修改位置</button>
                                <p>营业时间:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newBusinessHour} onChange={(e) => setNewBusinessHour(e.target.value)} />
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleBusinessHoursChange}>修改营业时间</button>
                                <p>公告:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} />
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleAnnouncementChange}>修改公告</button>
                                <br/>
                                <a href="/canteen-info">
                                    <button
                                        className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        type="button" onClick={handleCanteenDelete}>
                                        删除餐厅
                                    </button>
                                </a>
                            </div>
                        ) : (
                            <p>loading...</p>
                        )}
                        <br/>
                        <Link to={`/canteen-info`}>
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

export default ModifyCanteenInfo;