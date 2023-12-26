import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import VoteApi from "../api/VoteApi";

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
            await VoteApi.updateVoteResult(id, result);
            const updatedVotes = votes.map(vote => vote.id === id ? { ...vote, voteResult: result } : vote);
            setVotes(updatedVotes);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const handleShowResult = async (id) => {
        try {
            const result = await VoteApi.getVoteInfoById(id);
            console.log(result);
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
                        {voteResults[vote.id] && <p className="mt-2">结果：{voteResults[vote.id]}</p>}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Vote;