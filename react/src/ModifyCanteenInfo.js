import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CanteenApi from "./api/CanteenApi";
import NavBar from "./components/NavBar";

const ModifyCanteenInfo = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const [canteenInfo, setCanteenInfo] = useState(null);
    const [newIntro, setNewIntro] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newBusinessHours, setNewBusinessHours] = useState('');
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [newCanteenName, setNewCanteenName] = useState('');

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
        await CanteenApi.updateCanteenIntro(newCanteenName, newIntro);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfoById(id);
        setCanteenInfo(info);
    };

    // 处理位置修改
    const handleLocationChange = async () => {
        await CanteenApi.updateCanteenLocation(newCanteenName, newLocation);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfoById(id);
        setCanteenInfo(info);
    };

    // 处理营业时间修改
    const handleBusinessHoursChange = async () => {
        await CanteenApi.updateCanteenBusinessHours(newCanteenName, newBusinessHours);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfoById(id);
        setCanteenInfo(info);
    };

    // 处理公告修改
    const handleAnnouncementChange = async () => {
        await CanteenApi.updateCanteenAnnouncement(newCanteenName, newAnnouncement);
        // 更新完数据后重新获取食堂信息
        const info = await CanteenApi.getCanteenInfoById(id);
        setCanteenInfo(info);
    };

    // 处理删除
    const handleCanteenDelete = async () => {
        try {
            await CanteenApi.deleteCanteen(id);
            // 处理删除成功的逻辑，例如重定向到餐厅列表页面
            navigateTo('/canteen-info');
        } catch (error) {
            console.error('Error deleting canteen:', error);
            // 处理删除失败的逻辑，例如显示错误消息
        }
    };

    const navigateTo = (path) => {
        // 使用 window.location.href 导航到指定的路径
        window.location.href = path;
    };



    useEffect(() => {
        const fetchCanteenInfo = async () => {
            try {
                const info = await CanteenApi.getCanteenInfoById(id);
                setCanteenInfo(info);
                setNewIntro(info.intro);
                setNewLocation(info.location);
                setNewBusinessHours(info.businessHour);
                setNewAnnouncement(info.announcement);
                setNewCanteenName(info.canteenName);
            } catch (error) {
                // 处理错误
                console.error('Error fetching canteen info:', error);
            }
        };
        fetchCanteenInfo();
    }, [id]);

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">

                    <div>
                        {canteenInfo ? (
                            <div>
                                <h1 className="mb-4 text-xl text-center">{newCanteenName}</h1>

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
                                       type="text" value={newBusinessHours} onChange={(e) => setNewBusinessHours(e.target.value)} />
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleBusinessHoursChange}>修改营业时间</button>
                                <p>公告:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} />
                                <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleAnnouncementChange}>修改公告</button>
                                <br/>
                                    <button
                                        className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        type="button" onClick={handleCanteenDelete}>
                                        删除餐厅
                                    </button>
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