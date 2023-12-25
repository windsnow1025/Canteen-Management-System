import React, {useEffect, useState} from 'react';
import EvaluationApi from "../api/EvaluationApi";
import NavBar from "../components/NavBar";
import base64StringToDataURL from "../utils/Base64StringToDataURL";
import {Collapse} from "antd";
import UserApi from "../api/UserApi";

const {Panel} = Collapse;

const EvaluationManagement = () => {
    const [evaluationInfos, setEvaluationInfos] = useState([]);
    const [evaluationId, setEvaluationId] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // 获取菜品评价信息
        const fetchEvaluationInfos = async () => {
            try {
                const response = await EvaluationApi.getAllEvaluationInfos();
                // 解析 Base64 图片字符串为 Data URL
                const evaluationsWithImages = await Promise.all(response.map(async (evaluation) => {
                    const imageUrl = await base64StringToDataURL(evaluation.picture);

                    return {
                        ...evaluation, picture: imageUrl,
                    };
                }));
                setEvaluationInfos(evaluationsWithImages);
            } catch (error) {
                console.error('Error fetching evaluation infos:', error);
            }
        };
        const fetchUserInfo = async () => {
            try {
                const userInfo = await UserApi.getUserInfo();
                setUserInfo(userInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };


        fetchEvaluationInfos();
        fetchUserInfo();
    }, []);

    const handleDeleteEvaluation = async (evaluationId) => {
        try {
            await EvaluationApi.deleteEvaluationById(evaluationId);
            window.location.reload()
        } catch (error) {
            console.error('Error adding evaluation:', error);
        }
    };


    return (<>
            <NavBar/>
            <div>
                {evaluationInfos && (<div>
                        <Collapse accordion>
                            <Panel header="评价列表" key="1"
                                   className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                                {/* 评价列表 */}
                                <ul>
                                    {evaluationInfos.map((evaluation) => (<li key={evaluation.id}>
                                            <p>评价ID: {evaluation.id}</p>
                                            <p>菜品ID: {evaluation.dishId}</p>
                                            <p>用户ID: {evaluation.userId}</p>
                                            <p>评价内容: {evaluation.content}</p>
                                            <p>评分: {evaluation.rating}</p>
                                            {evaluation.picture && (<img src={evaluation.picture} alt={"用户未上传图片"}
                                                                         className="w-40 h-40"/>)}

                                            {(userInfo.userType === 'canteen_admin' || userInfo.userType === 'master_admin') && (
                                                <button
                                                    className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleDeleteEvaluation(evaluation.id)}
                                                >
                                                    删除
                                                </button>)}
                                            {/* 其他评价信息... */}
                                        </li>))}
                                </ul>
                            </Panel>

                            <Panel header="删除评价" key="2"
                                   className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                                {/* 删除评价 */}
                                <p>评价ID:</p>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                    type="text"
                                    value={evaluationId}
                                    onChange={(e) => setEvaluationId(e.target.value)}
                                />
                                <button
                                    className="bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDeleteEvaluation(evaluationId)}
                                >
                                    删除
                                </button>
                            </Panel>
                        </Collapse>
                    </div>)}
            </div>
        </>);
};

export default EvaluationManagement;