import React, {useState} from 'react';
import NavBar from "../components/NavBar";
import UserApi from "../api/UserApi";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async () => {
        try {
            const message = await UserApi.updatePassword(password);
            // 在这里处理修改成功后的逻辑
            setMessage(message);
        } catch (error) {
            // 在这里处理失败后的逻辑，比如显示错误信息等操作
            setMessage("修改失败");
        }
    };

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs">
                    <h1 className="mb-4 text-xl text-center">修改密码</h1>
                    <div className="flex flex-row items-center mb-6 whitespace-nowrap" >
                        <label className="mr-2 ">新密码</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                               type="password" placeholder="密码" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                            type="button" onClick={handleSignIn}>
                        确认
                    </button>
                    <p>{message}</p>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;