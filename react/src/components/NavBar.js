import React, { Component } from 'react';
import avatarUrl from '../asset/images/user_avatar.jpg';
import messageIcon from '../asset/images/message.png';
import messageIconAlert from '../asset/images/messageAlert.png';
import UserAPI from "../service/UserAPI";
import ComplaintAPI from "../service/ComplaintAPI";

class NavBar extends Component {
    state = {
        userInfo: null,
        messageAlertFlag: false,
        nullComplaintsCount: 0,
    };

    async componentDidMount() {
        const data = await UserAPI.getUserInfo();
        this.setState({ userInfo: data });

        if (data && data.userType === 'canteen_admin') {
            const complaints = await ComplaintAPI.getComplaintInfosByCanteenId(data.canteenId);
            const nullComplaintsCount = complaints.filter(complaint => complaint.complaintResult === null).length;
            this.setState({ nullComplaintsCount: nullComplaintsCount, messageAlertFlag: nullComplaintsCount !== 0 });
        }
    }

    render() {
        const token = localStorage.getItem('token');
        const iconUrl = this.state.messageAlertFlag ? messageIconAlert : messageIcon;

        return (
            <nav className="bg-gray-100 shadow flex justify-between items-center">
                <div className="w-1/6"></div>
                <div className="px-4 py-2 block w-1/3 flex items-center">
                    <a href="/user-info" className="px-4 py-2 block">
                        <img src={avatarUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-white"/>
                    </a>
                    <div className="px-4 py-2 block font-bold">
                        上理食堂社区
                    </div>
                </div>
                <div className="px-4 py-2 block flex w-2/3 justify-center space-x-5">
                    <a href="/" className="px-4 py-2 block font-bold">首页</a>
                    <a href="/community" className="px-4 py-2 block font-bold">社区</a>
                    <a href="/dish" className="px-4 py-2 block font-bold">菜品</a>
                    <a href="/vote" className="px-4 py-2 block font-bold">投票</a>
                    <a href="/canteen" className="px-4 py-2 block font-bold">食堂信息</a>
                </div>
                <div className="w-1/6 flex text-center items-center">
                    {token ? (
                        <>
                            <a href="/user-info">我的</a>
                            {this.state.userInfo && this.state.userInfo.userType === 'canteen_admin' && (
                                <>
                                    <a className="px-4 py-2 block">|</a>
                                    <a href="/complaint-handling">
                                        <img src={iconUrl} alt="User" className="w-6 h-6"/>
                                    </a>
                                    {this.state.messageAlertFlag && <span className="text-red-500">{this.state.nullComplaintsCount}</span>}
                                </>
                            )}
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