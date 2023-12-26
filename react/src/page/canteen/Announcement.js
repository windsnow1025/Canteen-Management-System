import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CanteenAPI from '../../service/CanteenAPI';
import UserAPI from "../../service/UserAPI";
import axios from "axios";

const Announcement = () => {
    const [inputValue, setInputValue] = useState('');
    const [canteenId, setCanteenId] = useState(null); // Add this line
    const [canteenName, setCanteenName] = useState(null); // Add this line

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await UserAPI.getUserInfo();
                setCanteenId(userInfo.canteenId);

                const CanteenName = await CanteenAPI.getCanteenInfoById(userInfo.canteenId);
                setCanteenName(CanteenName.canteenName);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo();
    }, []);
    const handleConfirm = async () => {
        try {
            const message = await CanteenAPI.updateCanteenAnnouncement(canteenName, inputValue);
            toast.success(message); // Show a success message
            setInputValue(''); // Clear the input field
        } catch (error) {
            console.error('Error:', error);
            toast.error('更新公告失败'); // Show an error message
        }
    }



    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs">
                    <h1 className="mb-4 text-xl text-center">发布公告</h1>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-4"
                        placeholder="输入公告内容"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                        type="button"
                        onClick={handleConfirm}
                    >
                        确认发布
                    </button>
                    <p className="text-center">餐厅名: {canteenName}</p>
                </div>
            </div>
        </>
    );
}

export default Announcement;
