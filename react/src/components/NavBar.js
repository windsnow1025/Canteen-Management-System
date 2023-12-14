import React, {Component} from 'react';
import avataUrl1 from '../images/user_avatar.jpg';
import messageIcon from '../images/message.png';
import messageIconAlert from '../images/messageAlert.png';
class NavBar extends Component {
    messageAlertFlag = false;
    iconUrl = this.messageAlertFlag ? messageIconAlert : messageIcon;

    render() {
        return (
            <nav className="bg-gray-100 shadow flex justify-between items-center">
                <div className="w-1/6">

                </div>
                <div className="px-4 py-2 block w-1/3 flex items-center">
                    <a href="/login" className="px-4 py-2 block">
                        <img src={avataUrl1} alt="User" className="w-9 h-9 rounded-full border-2 border-white" />
                    </a>
                    <div className="px-4 py-2 block font-bold">
                        上理食堂社区
                    </div>
                </div>
                <div className="px-4 py-2 block flex w-2/3 justify-center space-x-5">
                    <a href="/" className="px-4 py-2 block font-bold">首页</a>
                    <a href="/community" className="px-4 py-2 block font-bold">社区</a>
                    <a href="/dishsh" className="px-4 py-2 block font-bold">菜品</a>
                    <a href="/canteen" className="px-4 py-2 block font-bold">食堂信息</a>
                </div>
                <div className="w-1/6">
                    <a href="/messages" className="px-4 py-2 block">
                        <img src={this.iconUrl} alt="User" className="w-6 h-6" />
                    </a>
                </div>

            </nav>
        );
    }
}

export default NavBar;