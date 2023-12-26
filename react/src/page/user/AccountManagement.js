import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserApi from "../../service/UserApi";
import NavBar from "../../components/NavBar";
import { Collapse } from 'antd';

const { Panel } = Collapse;

const AccountManagement = () => {
    const { userId } = useParams();
    const [users, setUsers] = useState([]);
    const [newUserId, setNewUserId] = useState('');
    const [newUserType, setNewUserType] = useState('');
    const [newCanteenId, setNewCanteenId] = useState('');
    const [deleteUserId, setDeleteUserId] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserApi.getAllUserInfos();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUpdateUserType = async () => {
        try {
            await UserApi.updateUserType(newUserId, newUserType, newCanteenId);
            fetchUsers();
            alert("更新成功");
        } catch (error) {
            console.error('Error updating user type:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await UserApi.deleteUserById(deleteUserId);
            fetchUsers();
            alert("删除成功");
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs items-center">
                    <div>
                        <h1 className="mb-4 text-xl text-center">账号管理</h1>

                        <Collapse accordion>
                            {/* 已有用户列表 */}
                            <Panel header="已有用户列表" key="1">
                                <div className="overflow-y-auto max-h-60">
                                <ul>
                                    {users.map((user) => (
                                        <li key={user.id} className="flex justify-between items-center">
                                            <span>
                                                <div className="bg-white hover:bg-blue-dark text-black font-bold py-2 px-4 rounded">
                                                    {/* 显示用户ID、用户名和用户类型 */}
                                                    <p>ID: {user.id}</p>
                                                    <p>Name: {user.username}</p>
                                                    <p>Type: {user.userType}</p>
                                                </div>
                                            </span>
                                            <button
                                                className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded whitespace-nowrap"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                删除
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            </Panel>
                            {/* 更新用户类型 */}
                            <Panel header="更新用户类型" key="2">
                                {/* 用户ID */}
                                <p>用户ID:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newUserId}
                                    onChange={(e) => setNewUserId(e.target.value)}
                                />

                                {/* 用户类型 */}
                                <p>用户类型:</p>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    value={newUserType}
                                    onChange={(e) => setNewUserType(e.target.value)}
                                >
                                    <option value="canteen_admin">餐厅管理员</option>
                                    <option value="consumer">消费者</option>
                                </select>

                                {/* 餐厅ID */}
                                <p>餐厅ID:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={newCanteenId}
                                    onChange={(e) => setNewCanteenId(e.target.value)}
                                />

                                {/* 更新用户类型按钮 */}
                                <button
                                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handleUpdateUserType}
                                >
                                    更新用户类型
                                </button>
                            </Panel>

                            {/* 删除用户 */}
                            <Panel header="删除用户" key="3">
                                {/* 用户ID */}
                                <p>用户ID:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={deleteUserId}
                                    onChange={(e) => setDeleteUserId(e.target.value)}
                                />

                                {/* 删除用户按钮 */}
                                <button
                                    className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                    onClick={handleDeleteUser}
                                >
                                    删除用户
                                </button>
                            </Panel>
                        </Collapse>

                        {/* 返回按钮 */}
                        <Link to={`/user-info`}>
                            <button
                                className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                                type="button"
                            >
                                返回
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountManagement;
