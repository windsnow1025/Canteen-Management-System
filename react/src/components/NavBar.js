import React, {Component} from 'react';
import avataUrl1 from '../images/user_avatar.jpg';
import messageIcon from '../images/message.png';
import messageIconAlert from '../images/messageAlert.png';
import UserInfo from "../UserInfo";
class NavBar extends Component {
    messageAlertFlag = false;
    iconUrl = this.messageAlertFlag ? messageIconAlert : messageIcon;

    render() {
        const token = localStorage.getItem('token');
        return (
            <nav className="bg-gray-100 shadow flex justify-between items-center">
                <div className="w-1/6">

                </div>
                <div className="px-4 py-2 block w-1/3 flex items-center">
                    <a href="/user-info" className="px-4 py-2 block">
                        <img src={avataUrl1} alt="User" className="w-9 h-9 rounded-full border-2 border-white" />
                    </a>
                    <div className="px-4 py-2 block font-bold">
                        上理食堂社区
                    </div>
                </div>
                <div className="px-4 py-2 block flex w-2/3 justify-center space-x-5">
                    <a href="/" className="px-4 py-2 block font-bold">首页</a>
                    <a href="/community" className="px-4 py-2 block font-bold">社区</a>
                    <a href="/dish" className="px-4 py-2 block font-bold">菜品</a>
                    <a href="/canteen" className="px-4 py-2 block font-bold">食堂信息</a>
                </div>
                <div className="w-1/6 flex text-center items-center">
                    {token ? (
                        <>
                            <a href="/user-info">我的</a>
                            <a className="px-4 py-2 block">|</a>
                            <a href="/messages">
                                <img src={this.iconUrl} alt="User" className="w-6 h-6" />
                            </a>
                        </>
                    ) : (
                        <>
                            <a href="/login">登录</a>
                            <a className="px-4 py-2 block">|</a>
                            <a href="/register">注册</a>
                        </>
                    )}
                </div>

            </nav>
        );
    }
}

export default NavBar;