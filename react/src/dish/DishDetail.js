import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DishApi from '../api/DishApi';
import EvaluationApi from "../api/EvaluationApi";
import NavBar from "../components/NavBar";
import base64StringToDataURL from "../utils/Base64StringToDataURL";
import {Collapse} from "antd";
import {cropToSquareAndCompress} from "../utils/imageUtils";

const {Panel} = Collapse;

const DishDetail = () => {
    const { dishId } = useParams();
    const [dishInfo, setDishInfo] = useState(null);
    const [evaluationInfos, setEvaluationInfos] = useState([]);
    const [newEvaluation, setNewEvaluation] = useState({
        content: '',
        rating: 0,
        picture: null,
    });

    useEffect(() => {
        // 获取菜品信息
        const fetchDishInfo = async () => {
            try {
                const dish = await DishApi.getDishInfoById(dishId);
                // 解析 Base64 图片字符串为 Data URL
                const imageUrl = await base64StringToDataURL(dish.picture);

                setDishInfo({
                    ...dish,
                    picture: imageUrl,
                });
                //setDishInfo(response);
            } catch (error) {
                console.error('Error fetching dish info:', error);
            }
        };

        // 获取菜品评价信息
        const fetchEvaluationInfos = async () => {
            try {
                const response = await EvaluationApi.getEvaluationInfosByDishId(dishId);
                // 解析 Base64 图片字符串为 Data URL
                const evaluationsWithImages = await Promise.all(response.map(async (evaluation) => {
                    const imageUrl = await base64StringToDataURL(evaluation.picture);

                    return {
                        ...evaluation,
                        picture: imageUrl,
                    };
                }));
                setEvaluationInfos(evaluationsWithImages);
            } catch (error) {
                console.error('Error fetching evaluation infos:', error);
            }
        };

        fetchDishInfo();
        fetchEvaluationInfos();
    }, [dishId]);

    const handleAddEvaluation = async () => {
        try {
            const { content, rating, picture } = newEvaluation;
            await EvaluationApi.addEvaluation(dishId, content, rating, picture);
            // 评价添加成功后，重新获取评价信息
            alert("评价成功");
            // 清空新评价的数据
            setNewEvaluation({ content: '', rating: 0, picture: null });
            window.location.reload()
        } catch (error) {
            console.error('Error adding evaluation:', error);
        }
    };

    return (
        <>
            <NavBar/>
        <div>
            {dishInfo && (
                <div>
                    <Collapse accordion>
                        <Panel header="菜品" key="1" className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">

                        <h1>{dishInfo.dishName}</h1>
                    <p>价格: {dishInfo.price}</p>
                    <p>折扣率: {dishInfo.discount_rate}</p>
                    <p>菜系: {dishInfo.cuisine}</p>
                    <img src={dishInfo.picture} alt={"未上传菜品图片"} className="w-20 h-20" />
                    {/* 其他菜品信息... */}
                        </Panel>


                        <Panel header="评价列表" key="2" className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                    {/* 评价列表 */}
                    <h2>评价列表</h2>
                    <ul>
                        {evaluationInfos.map((evaluation) => (
                            <li key={evaluation.id}>
                                <p>用户ID: {evaluation.userId}</p>
                                <p>评价内容: {evaluation.content}</p>
                                <p>评分: {evaluation.rating}</p>
                                {evaluation.picture && (
                                    <img src={evaluation.picture} alt={"用户未上传图片"} className="w-40 h-40" />
                                )}

                                {/* 其他评价信息... */}
                            </li>
                        ))}
                    </ul>
                        </Panel>

                        <Panel header="添加评价" key="3" className="bg-white hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">
                    {/* 添加评价表单 */}
                    <h2>添加评价</h2>
                    <input
                        type="text"
                        placeholder="评价内容"
                        value={newEvaluation.content}
                        onChange={(e) => setNewEvaluation({ ...newEvaluation, content: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="评分（1-5）"
                        value={newEvaluation.rating}
                        onChange={(e) => setNewEvaluation({ ...newEvaluation, rating: parseInt(e.target.value, 10) })}
                    />
                    {/* 图片上传 */}
                    <p>图片:</p>
                            <input
                                type="file"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    const compressedBase64 = await cropToSquareAndCompress(file, 60);
                                    setNewEvaluation({ ...newEvaluation, picture: compressedBase64 });
                                }}
                            />
                    {/* 图片上传等其他表单元素... */}
                    <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
                            onClick={handleAddEvaluation}>添加评价</button>
                        </Panel>
                    </Collapse>
                </div>
            )}
        </div>
        </>
    );
};

export default DishDetail;
