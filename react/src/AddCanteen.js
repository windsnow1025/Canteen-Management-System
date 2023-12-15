import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import CanteenApi from "./api/CanteenApi";
import NavBar from "./components/NavBar";

const AddCanteen = () => {
    const [newLocation, setNewLocation] = useState('');
    const [newCanteenName, setNewCanteenName] = useState('');


    // 处理简介修改
    const handleCanteenAdd = async () => {
        await CanteenApi.createCanteen(newCanteenName, newLocation);
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
                                <br/>
                                <a href="/canteen-info">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                        type="button" onClick={handleCanteenAdd}>
                                        确认添加
                                    </button>
                                </a>
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