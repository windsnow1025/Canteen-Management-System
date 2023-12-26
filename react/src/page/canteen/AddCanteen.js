import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import CanteenApi from "../../service/CanteenApi";
import NavBar from "../../components/NavBar";

const AddCanteen = () => {
    const [newLocation, setNewLocation] = useState('');
    const [newCanteenName, setNewCanteenName] = useState('');
    const [newIntro, setNewIntro] = useState('');
    const [newBusinessHours, setNewBusinessHours] = useState('');
    const [newAnnouncement, setNewAnnouncement] = useState('');

    // 处理添加餐厅
    const handleCanteenAdd = async () => {
        try {
            await CanteenApi.createCanteen(newCanteenName, newLocation,newIntro,newBusinessHours,newAnnouncement);
            navigateTo('/canteen-info');
        } catch (error) {
            console.error("Error adding canteen:", error);
            // 处理错误的逻辑
        }
    };

    const navigateTo = (path) => {
        // 使用 window.location.href 导航到指定的路径
        window.location.href = path;
    };


    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <div>
                            <div>
                                <p>餐厅名:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newCanteenName} onChange={(e) => setNewCanteenName(e.target.value)} />
                                <p>位置:</p>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/>
                                <p>简介:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text" value={newIntro} onChange={(e) => setNewIntro(e.target.value)}
                                />
                                <p>营业时间:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text" value={newBusinessHours} onChange={(e) => setNewBusinessHours(e.target.value)}
                                />
                                <p>公告:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text" value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)}
                                />
                                <br/>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        type="button" onClick={handleCanteenAdd}>
                                        确认添加
                                    </button>
                            </div>
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

export default AddCanteen;