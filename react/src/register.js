import React, {useState} from 'react';
import NavBar from "./components/NavBar";
import UserApi from "./api/UserApi";



const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async () => {
        try {
            const returnMessage = await UserApi.signUp(username, password);
            setMessage(returnMessage); // 可以根据返回的消息做相应处理
        } catch (error) {
            setMessage("注册失败");
        }
    };

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xs">
                    <h1 className="mb-4 text-xl text-center">注册</h1>
                    <div className="flex flex-row items-center mb-4">
                        <label className="mr-2">Account</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            type="text"
                            placeholder="账号"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-center mb-6">
                        <label className="mr-2">Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            type="password"
                            placeholder="密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                        type="button"
                        onClick={handleSignUp}
                    >
                        确认
                    </button>
                    <p>{message}</p>
                </div>
            </div>
        </>
    );
};

export default Register;