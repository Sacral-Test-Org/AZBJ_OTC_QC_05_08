package com.example.model;

import java.util.Date;

public class Comment {
    private Integer eventNo;
    private String contractId;
    private String policyNo;
    private String userId;
    private Date commentDate;
    private String comments;
    private String flag;

    // Constructor
    public Comment(Integer eventNo, String contractId, String policyNo, String userId, Date commentDate, String comments, String flag) {
        this.eventNo = eventNo;
        this.contractId = contractId;
        this.policyNo = policyNo;
        this.userId = userId;
        this.commentDate = commentDate;
        this.comments = comments;
        this.flag = flag;
    }

    // Getters and Setters
    public Integer getEventNo() {
        return eventNo;
    }

    public void setEventNo(Integer eventNo) {
        this.eventNo = eventNo;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public String getPolicyNo() {
        return policyNo;
    }

    public void setPolicyNo(String policyNo) {
        this.policyNo = policyNo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }
}