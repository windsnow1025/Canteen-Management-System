import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import VoteApi from "../api/VoteApi";

const VoteManagement = () => {
    const [votes, setVotes] = useState([]);
    const [newVote, setNewVote] = useState({ canteenId: '', title: '' });

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

    const handleDelete = async (id) => {
        try {
            await VoteApi.deleteVoteById(id);
            const response = await VoteApi.getAllVoteInfos();
            setVotes(response);
        } catch (error) {
            console.error('Error deleting vote:', error);
        }
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        try {
            await VoteApi.addVote(newVote.canteenId, newVote.title);
            const response = await VoteApi.getAllVoteInfos();
            setVotes(response);
            setNewVote({ canteenId: '', title: '' });
        } catch (error) {
            console.error('Error adding vote:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4 text-center">投票管理</h1>
                <div className="mt-8 overflow-y-auto max-h-60">
                    {votes.map((vote, index) => (
                        <div key={index} className="border p-4 mb-4 rounded bg-white">
                            <h3 className="font-bold mb-2">{vote.title}</h3>
                            <p>Canteen ID: {vote.canteenId}</p>
                            <button onClick={() => handleDelete(vote.id)} className="bg-red-500 hover:bg-red-dark text-white font-bold py-2 px-4 rounded mt-2">删除</button>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleAdd} className="mt-4">
                    <input type="number" value={newVote.canteenId} onChange={e => setNewVote({ ...newVote, canteenId: e.target.value })} placeholder="Canteen ID" className="border p-2 mb-2 rounded w-full" required />
                    <input type="text" value={newVote.title} onChange={e => setNewVote({ ...newVote, title: e.target.value })} placeholder="Title" className="border p-2 mb-2 rounded w-full" required />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full">发布新的投票</button>
                </form>
            </div>
        </>
    );
};

export default VoteManagement;