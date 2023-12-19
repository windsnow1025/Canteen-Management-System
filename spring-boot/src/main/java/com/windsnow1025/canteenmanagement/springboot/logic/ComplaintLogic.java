package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.ComplaintDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Complaint;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;

public class ComplaintLogic {
    private final ComplaintDAO complaintDAO;
    public ComplaintLogic(){
        complaintDAO = new ComplaintDAO();
    }

    public List<Complaint> getComplaint(String token){
        if (JwtUtil.parseJWT(token) != null){
            return complaintDAO.getAllComplaint();
        } else {
            return null;
        }
    }

    public Complaint getComplaintById(String token, int id){
        if (JwtUtil.parseJWT(token) != null){
            return complaintDAO.getComplaintById(id);
        } else {
            return null;
        }
    }

    public List<Complaint> getComplaintByCanteenId(String token, int canteenId){
        if (JwtUtil.parseJWT(token) != null){
            return complaintDAO.getComplaintByCanteenId(canteenId);
        } else {
            return null;
        }
    }

    public boolean addComplaint(String token, Complaint complaint){
        if (JwtUtil.parseJWT(token) != null){
            return complaintDAO.addComplaint(complaint);
        } else {
            return false;
        }
    }

    public boolean updateComplaintResult(String token, int id, String complaintResult){
        String username = JwtUtil.parseJWT(token);
        if (complaintDAO.hasResponsePermission(username, id)){
            return complaintDAO.updateComplaintResultById(complaintResult, id);
        } else {
            return false;
        }
    }

    public boolean delete(String token, int id){
        String username = JwtUtil.parseJWT(token);
        if (complaintDAO.hasResponsePermission(username, id)){
            return complaintDAO.delete(id);
        } else {
            return false;
        }
    }
}
