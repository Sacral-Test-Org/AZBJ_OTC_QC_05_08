package com.example.service;

import com.example.dao.SearchManageRecordsDao;
import com.example.model.SearchManageRecords;
import com.example.model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchManageRecordsService {

    @Autowired
    private SearchManageRecordsDao searchManageRecordsDao;

    public List<SearchManageRecords> searchRecords(String startDate, String endDate, String applicationNumber, String partnerType, String status) {
        return searchManageRecordsDao.searchRecords(startDate, endDate, applicationNumber, partnerType, status);
    }

    public void saveRecord(SearchManageRecords record) {
        searchManageRecordsDao.saveRecord(record);
    }

    public List<Document> getDocuments(String applicationNumber) {
        return searchManageRecordsDao.getDocuments(applicationNumber);
    }

    public void uploadDocument(String applicationNumber, MultipartFile file) {
        searchManageRecordsDao.uploadDocument(applicationNumber, file);
    }

    public void updateRecord(SearchManageRecords record) {
        searchManageRecordsDao.updateRecord(record);
    }

    public void addComments(String applicationNumber, String comments) {
        searchManageRecordsDao.addComments(applicationNumber, comments);
    }

    public void rejectRecord(String applicationNumber, String rejectionReason) {
        searchManageRecordsDao.rejectRecord(applicationNumber, rejectionReason);
    }

    public void incrementCounter() {
        searchManageRecordsDao.incrementCounter();
    }

    public void updateStatus(String status) {
        searchManageRecordsDao.updateStatus(status);
    }

    public void invokeAZBJComments() {
        searchManageRecordsDao.invokeAZBJComments();
    }

    // New methods for QC/Edit button functionality

    public List<SearchManageRecords> fetchSelectedCases() {
        return searchManageRecordsDao.getSelectedCases();
    }

    public boolean checkCaseValidity(SearchManageRecords record) {
        return searchManageRecordsDao.validateCase(record);
    }

    public void processNextForm(SearchManageRecords record) {
        searchManageRecordsDao.proceedToNextForm(record);
    }

    // New method for Save button functionality

    public void saveRecords(List<SearchManageRecords> records) {
        for (SearchManageRecords record : records) {
            if (record.isMarked() && record.getCommentCount() > 0 && record.getReasonForLinking() != null) {
                String contractId = searchManageRecordsDao.retrieveContractId(record.getApplicationNumber());
                searchManageRecordsDao.issuePolicy(contractId);
                int ruleErrorCount = searchManageRecordsDao.checkRuleErrors(record.getActivityId());
                if (ruleErrorCount == 0 && searchManageRecordsDao.checkDocumentReceiptStatus(record.getApplicationNumber())) {
                    searchManageRecordsDao.updatePolicyVersionStatus(contractId);
                    searchManageRecordsDao.updateHubTracker(record.getApplicationNumber());
                    searchManageRecordsDao.updateBBUTransaction(record.getApplicationNumber(), contractId);
                    searchManageRecordsDao.trackStatusInHub(record.getApplicationNumber());
                    searchManageRecordsDao.updatePolicyVersionStatusToFRAR(contractId);
                    searchManageRecordsDao.updateHubTrackerStatusToFRAR(record.getApplicationNumber());
                    searchManageRecordsDao.trackStatusInHubForFRARInt(record.getApplicationNumber());
                    System.out.println("Policy issued successfully for application number: " + record.getApplicationNumber());
                } else {
                    System.out.println("Document receipt status or rule validation failed for application number: " + record.getApplicationNumber());
                }
            } else {
                System.out.println("Please provide comments and reason for linking for application number: " + record.getApplicationNumber());
            }
        }
    }

    // New method for Reject button functionality

    public String rejectRecords(List<String> applicationNumbers) {
        List<String> rejectedApplications = new ArrayList<>();
        int rejectedCount = 0;

        for (String applicationNumber : applicationNumbers) {
            String contractId = searchManageRecordsDao.getContractId(applicationNumber);
            if (contractId == null) {
                return "Error: Contract ID not found for application number: " + applicationNumber;
            }

            // Assuming reasonLink and specificVariable are fetched from some source
            String reasonLink = ""; // Placeholder
            int specificVariable = 0; // Placeholder

            if (reasonLink.isEmpty() || specificVariable == 0) {
                return "Please enter comments for application number: " + applicationNumber;
            }

            int eventNumber = searchManageRecordsDao.getNextEventNumber(contractId);
            searchManageRecordsDao.insertComment(eventNumber, contractId, applicationNumber, reasonLink);

            rejectedApplications.add(applicationNumber);
            rejectedCount++;
        }

        return "Number of records rejected: " + rejectedCount + ", Rejected application numbers: " + String.join(", ", rejectedApplications);
    }
}
