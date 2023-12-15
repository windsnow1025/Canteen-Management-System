import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import CanteenApi from './api/CanteenApi';
import AdditionIcon from'./images/addition.png'
import NavBar from "./components/NavBar";
const CanteenInfo = () => {
    const [canteenNames, setCanteenNames] = useState([]);

    useEffect(() => {
        const fetchCanteenNames = async () => {
            try {
                const names = await CanteenApi.showAllName();
                setCanteenNames(names);
            } catch (error) {
                console.error("Error fetching canteen names:", error);
            }
        };

        fetchCanteenNames();
    }, []);

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs">
                    <h1 className="mb-6 text-xl text-center">食堂信息管理</h1>
                    <Flex wrap="wrap" gap="small">
                        {canteenNames.map((name, i) => (
                            <Link key={i} to={`/modify-canteen-info?name=${name}`}>
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                    type="primary">
                                    {name}
                                </button>
                            </Link>

                        ))}
                    </Flex>
                    <a href="/canteen-add">
                        <img src={AdditionIcon} alt="addition" className="bg-blue-500 hover:bg-blue-dark w-8 h-8 rounded float-left mt-2" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default CanteenInfo;