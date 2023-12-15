import React, {useEffect, useState} from "react";
import CanteenApi from "./api/CanteenApi";
import {Flex} from "antd";
import {Link} from "react-router-dom";
import AdditionIcon from "./images/addition.png";
import NavBar from "./components/NavBar";

const Canteen =()=>{
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
                    <h1 className="mb-6 text-xl text-center">食堂信息</h1>
                    <Flex wrap="wrap" gap="small">
                        {canteenNames.map((name, i) => (
                            <Link key={i} to={`/certain-canteen-info?name=${name}`}>
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                    type="primary">
                                    {name}
                                </button>
                            </Link>

                        ))}
                    </Flex>
                </div>
            </div>
        </>
    )
}

export default Canteen;