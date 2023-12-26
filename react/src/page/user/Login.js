import React, {useState} from 'react';
import NavBar from "../../components/NavBar";
import UserApi from "../../service/UserApi";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async () => {
        try {
            const token = await UserApi.signIn(username, password);
            // 在这里处理登录成功后的逻辑，比如保存token到本地存储或进行页面跳转等操作
            //setMessage(token);
            localStorage.setItem('token', token);
            window.location.href = "/";
        } catch (error) {
            // 在这里处理登录失败后的逻辑，比如显示错误信息等操作
            setMessage("登录失败");
        }
    };

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs">
                    <h1 className="mb-4 text-xl text-center">登录</h1>
                    <div className="flex flex-row items-center mb-4 whitespace-nowrap">
                        <label className="mr-2">用户名</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                               type="text" placeholder="用户名" value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-row items-center mb-6 whitespace-nowrap">
                        <label className="mr-6">密码</label>
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

export default Login;