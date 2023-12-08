import React, {Component} from 'react';
import avataUrl from '../images/user_avatar.jpg';
class NavBar extends Component {
    render() {
        return (
            <nav className="bg-gray-200 shadow flex justify-between items-center">
                <div className="w-1/6">
                </div>
                <div className="px-4 py-2 block w-1/3 flex items-center">
                    <a href="/user" className="px-4 py-2 block">
                        <img src={avataUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-white" />
                    </a>
                    <div className="px-4 py-2 block">
                        上理食堂社区
                    </div>
                </div>
                <div className="px-4 py-2 block flex w-2/3 justify-center space-x-5">
                    <a href="/" className="px-4 py-2 block">首页</a>
                    <a href="/community" className="px-4 py-2 block">社区</a>
                    <a href="/canteen" className="px-4 py-2 block">食堂信息</a>
                </div>
                <div className="w-1/6">
                </div>
            </nav>
        );
    }
}

export default NavBar;