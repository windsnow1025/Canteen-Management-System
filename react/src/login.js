import React, { useState } from 'react';
import NavBar from './components/navBar';
import Input from './Input';
import LoginSubmitButton from './LoginSubmitButton';

const LoginPage = () => {

    return (
        <div>
            <NavBar route={"/login"}/>

            <div className={"min-h-full"}>

                <div className="min-h-screen flex items-center justify-center">
                    <div
                        className="w-[400px] rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">

                        {
                            error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                     role="alert">
                                    <span className="block sm:inline"> {error}</span>
                                </div>
                            )
                        }

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">登录</h1>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <form action={doLogin}>
                                    <div>用户名</div>
                                    <Input id="username" name={"username"} placeholder="用户名" isRequired
                                           type="text"/>
                                    <div className={"mt-2.5"}>密码</div>
                                    <Input id="password" name={"password"} placeholder="******" isRequired
                                           type="password"/>
                                    <LoginSubmitButton/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;