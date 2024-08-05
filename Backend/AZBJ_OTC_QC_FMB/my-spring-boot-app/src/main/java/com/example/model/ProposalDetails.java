package com.example.model;

public class ProposalDetails {
    private String applicationNumber;
    private String imagePath;
    private Object otherParams;

    public ProposalDetails() {}

    public ProposalDetails(String applicationNumber, String imagePath, Object otherParams) {
        this.applicationNumber = applicationNumber;
        this.imagePath = imagePath;
        this.otherParams = otherParams;
    }

    public String getApplicationNumber() {
        return applicationNumber;
    }

    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Object getOtherParams() {
        return otherParams;
    }

    public void setOtherParams(Object otherParams) {
        this.otherParams = otherParams;
    }
}