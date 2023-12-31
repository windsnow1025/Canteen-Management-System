import React, {useEffect, useState} from "react";
import CanteenAPI from "../../service/CanteenAPI";
import {Flex} from "antd";
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar";

const Canteen =()=>{
    const [canteens, setCanteens] = useState([]);

    useEffect(() => {
        const fetchCanteenNames = async () => {
            try {
                const canteens = await CanteenAPI.getCanteenInfos();
                setCanteens(canteens);
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
                        {canteens.map((canteen, i) => (
                            <Link key={i} to={`/certain-canteen-info?id=${canteen.id}`}>
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                    type="primary">
                                    {canteen.name}
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