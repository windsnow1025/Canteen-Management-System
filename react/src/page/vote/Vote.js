import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar";
import VoteApi from "../../service/VoteAPI";

const Vote = () => {
    const [votes, setVotes] = useState([]);
    const [voteResults, setVoteResults] = useState({});

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await VoteApi.getAllVoteInfos();
                setVotes(response);
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };
        fetchVotes();
    }, []);

    const handleVote = async (id, result) => {
        try {
            const currentVote = await VoteApi.getVoteInfoById(id);
            const updatedResult = currentVote.voteResult + result.toString();
            await VoteApi.updateVoteResult(id, updatedResult);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const handleShowResult = async (id) => {
        try {
            const result = await VoteApi.getVoteInfoById(id);
            setVoteResults(prevState => ({
                ...prevState,
                [id]: result.voteResult
            }));
        } catch (error) {
            console.error('Error fetching vote result:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4 text-center">投票</h1>
                {votes.map((vote, index) => (
                    <div key={index} className="border p-4 mb-4 rounded bg-white">
                        <h3 className="font-bold mb-2">{vote.title}</h3>
                        <button onClick={() => handleVote(vote.id, 1)} className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded mr-2">是</button>
                        <button onClick={() => handleVote(vote.id, 0)} className="bg-red-500 hover:bg-red-dark text-white font-bold py-2 px-4 rounded">否</button>
                        <button onClick={() => handleShowResult(vote.id)} className="bg-green-500 hover:bg-green-dark text-white font-bold py-2 px-4 rounded ml-2">显示结果</button>
                        {voteResults[vote.id] ? (
                            <p className="mt-2">
                                结果：是：{voteResults[vote.id].split('').filter(char => char === '1').length}票
                                否：{voteResults[vote.id].split('').filter(char => char === '0').length}票
                            </p>
                        ) : (
                            <p className="mt-2">还没有人投票</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Vote;