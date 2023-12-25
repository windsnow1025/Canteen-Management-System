import React, { useState } from 'react';
import ComplaintApi from '../api/ComplaintApi';

const ComplaintForm = () => {
    const [canteenId, setCanteenId] = useState('');
    const [detail, setDetail] = useState('');

    const handleAddComplaint = async () => {
        try {
            // 调用 API 提交新的投诉
            await ComplaintApi.addComplaint(canteenId, detail);
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
        <div>
            <h1>投诉表单</h1>
            <label>
                餐厅ID:
                <input
                    type="text"
                    value={canteenId}
                    onChange={(e) => setCanteenId(e.target.value)}
                />
            </label>
            <br />
            <label>
                投诉详情:
                <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleAddComplaint}>提交投诉</button>
        </div>
    );
};

export default ComplaintForm;
