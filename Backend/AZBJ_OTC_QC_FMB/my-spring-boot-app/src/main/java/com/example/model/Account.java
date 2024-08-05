package com.example.model;

public class Account {
    private String accountHolderName;
    private String bankName;
    private String branchName;
    private String micrCode;
    private String ifscCode;
    private String accountType;
    private String relationshipWithPremiumPayer;
    private boolean tppFlag;
    private boolean bypassBankDetails;
    private String pennyDropStatus;

    // Getters and Setters
    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName.toUpperCase();
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName.toUpperCase();
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName.toUpperCase();
    }

    public String getMicrCode() {
        return micrCode;
    }

    public void setMicrCode(String micrCode) {
        this.micrCode = micrCode.toUpperCase();
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode.toUpperCase();
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType.toUpperCase();
    }

    public String getRelationshipWithPremiumPayer() {
        return relationshipWithPremiumPayer;
    }

    public void setRelationshipWithPremiumPayer(String relationshipWithPremiumPayer) {
        this.relationshipWithPremiumPayer = relationshipWithPremiumPayer;
    }

    public boolean isTppFlag() {
        return tppFlag;
    }

    public void setTppFlag(boolean tppFlag) {
        this.tppFlag = tppFlag;
    }

    public boolean isBypassBankDetails() {
        return bypassBankDetails;
    }

    public void setBypassBankDetails(boolean bypassBankDetails) {
        this.bypassBankDetails = bypassBankDetails;
    }

    public String getPennyDropStatus() {
        return pennyDropStatus;
    }

    public void setPennyDropStatus(String pennyDropStatus) {
        this.pennyDropStatus = pennyDropStatus;
    }
}

class BankDetails {
    private String bankIfsc;
    private String bankName;
    private String bankBranch;
    private String bankMicr;

    // Getters and Setters
    public String getBankIfsc() {
        return bankIfsc;
    }

    public void setBankIfsc(String bankIfsc) {
        this.bankIfsc = bankIfsc;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(String bankBranch) {
        this.bankBranch = bankBranch;
    }

    public String getBankMicr() {
        return bankMicr;
    }

    public void setBankMicr(String bankMicr) {
        this.bankMicr = bankMicr;
    }
}