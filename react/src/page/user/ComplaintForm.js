import React, { useState } from 'react';
import ComplaintAPI from '../../service/ComplaintAPI';
import NavBar from "../../components/NavBar";

const ComplaintForm = () => {
    const [canteenId, setCanteenId] = useState('');
    const [detail, setDetail] = useState('');

    const handleAddComplaint = async () => {
        try {
            // 调用 API 提交新的投诉
            await ComplaintAPI.addComplaint(canteenId, detail);
            alert('投诉提交成功！');
            // 清空表单数据
            setCanteenId('');
            setDetail('');
        } catch (error) {
            console.error('Error adding complaint:', error);
            alert('投诉提交失败，请稍后再试。');
        }
    };

    return (
        <>
            <NavBar/>
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">投诉表单</h1>
                <label className="block mb-4">
                    <span className="text-gray-700">餐厅ID:</span>
                    <input
                        type="text"
                        value={canteenId}
                        onChange={(e) => setCanteenId(e.target.value)}
                        className="form-input mt-1 block w-full"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">投诉详情:</span>
                    <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        className="form-textarea mt-1 block w-full"
                    />
                </label>
                <button
                    onClick={handleAddComplaint}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    提交投诉
                </button>
            </div>
        </div>
        </>
    );
};

export default ComplaintForm;
