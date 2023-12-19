package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.CanteenDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.VoteDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Vote;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;

public class VoteLogic {
    private VoteDAO voteDAO;

    public VoteLogic() {
        voteDAO = new VoteDAO();
    }

    public List<Vote> getVote(String token){
        if (JwtUtil.parseJWT(token) != null){
            return voteDAO.getAllVote();
        } else {
            return null;
        }
    }
    public List<Vote> getVoteByCanteenId(String token, int canteenId){
        if (JwtUtil.parseJWT(token) != null){
            return voteDAO.getVoteByCanteenId(canteenId);
        } else {
            return null;
        }
    }

    public Vote getVoteById(String token, int id){
        if (JwtUtil.parseJWT(token) != null){
            return voteDAO.getVoteById(id);
        } else {
            return null;
        }
    }

    public boolean addVote(String token, Vote vote){
        String username = JwtUtil.parseJWT(token);
        CanteenDAO canteenDAO = new CanteenDAO();
        if (voteDAO.hasCreatePermission(username, vote.getCanteenId()) && canteenDAO.hasCanteen(vote.getCanteenId())){
            return voteDAO.addVote(vote);
        } else {
            return false;
        }
    }

    public boolean updateVoteResult(String token, int id, String voteResult){
        String username = JwtUtil.parseJWT(token);
        if (voteDAO.hasUpdatePermission(username, id)){
            return voteDAO.updateVoteResultById(id, voteResult);
        } else {
            return false;
        }
    }

    public boolean delete(String token, int id){
        String username = JwtUtil.parseJWT(token);
        if (voteDAO.hasUpdatePermission(username, id)){
            return voteDAO.delete(id);
        } else {
            return false;
        }
    }

}
