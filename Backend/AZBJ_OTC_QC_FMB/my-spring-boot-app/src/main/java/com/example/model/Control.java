package com.example.model;

import java.util.Date;

public class Control {
    private String panCardNumber;
    private String firstName;
    private String middleName;
    private String surname;
    private Date dob;
    private String previousPolicyDetails;
    private ValidationResult validationResult;

    // Getters and Setters
    public String getPanCardNumber() {
        return panCardNumber;
    }

    public void setPanCardNumber(String panCardNumber) {
        this.panCardNumber = panCardNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPreviousPolicyDetails() {
        return previousPolicyDetails;
    }

    public void setPreviousPolicyDetails(String previousPolicyDetails) {
        this.previousPolicyDetails = previousPolicyDetails;
    }

    public ValidationResult getValidationResult() {
        return validationResult;
    }

    public void setValidationResult(ValidationResult validationResult) {
        this.validationResult = validationResult;
    }
}
