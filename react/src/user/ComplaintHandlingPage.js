import React, { useEffect, useState } from 'react';
import ComplaintApi from '../api/ComplaintApi';
import NavBar from "../components/NavBar";

const ComplaintHandlingPage = () => {
    const [complaintInfos, setComplaintInfos] = useState([]);

    useEffect(() => {
        // 获取所有投诉信息
        const fetchComplaintInfos = async () => {
            try {
                const response = await ComplaintApi.getAllComplaintInfos();
                setComplaintInfos(response);
            } catch (error) {
                console.error('Error fetching complaint infos:', error);
            }
        };

        fetchComplaintInfos();
    }, []);

    const handleUpdateComplaintResult = async (complaintId, result) => {
        try {
            // 更新投诉结果
            await ComplaintApi.updateComplaintResult(complaintId, result);
            alert('投诉结果更新成功！');
            // 重新获取投诉信息列表
            const response = await ComplaintApi.getAllComplaintInfos();
            setComplaintInfos(response);
        } catch (error) {
            console.error('Error updating complaint result:', error);
            alert('投诉结果更新失败，请稍后再试。');
        }
    };

    const handleDeleteComplaint = async (complaintId) => {
        try {
            // 删除投诉信息
            await ComplaintApi.deleteComplaintById(complaintId);
            alert('投诉信息删除成功！');
            // 重新获取投诉信息列表
            const response = await ComplaintApi.getAllComplaintInfos();
            setComplaintInfos(response);
        } catch (error) {
            console.error('Error deleting complaint:', error);
            alert('投诉信息删除失败，请稍后再试。');
        }
    };

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">投诉信息处理</h1>
            <div className="overflow-y-auto max-h-80">
            <ul>
                {complaintInfos.map((complaint) => (
                    <li key={complaint.id} className="mb-4">
                        <p>投诉ID: {complaint.id}</p>
                        <p>餐厅ID: {complaint.canteenId}</p>
                        <p>投诉详情: {complaint.detail}</p>
                        <p>投诉结果: {complaint.complaintResult || '未处理'}</p>
                        {/* 更新投诉结果按钮 */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleUpdateComplaintResult(complaint.id, '已处理')}
                        >
                            处理
                        </button>
                        {/* 删除投诉信息按钮 */}
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteComplaint(complaint.id)}
                        >
                            删除
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
            </div>
        </>
    );
};

export default ComplaintHandlingPage;
