package com.example.service;

import com.example.dao.ApplicationDao;
import com.example.model.Application;
import com.example.model.ActionDetails;
import com.example.model.ApplicationDetails;
import com.example.model.ValidationResult;
import com.example.model.UpdateStatusResult;
import com.example.model.LogResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationDao applicationDao;

    public ApplicationDetails fetchApplicationDetails(int applicationNumber) {
        return applicationDao.getApplicationDetails(applicationNumber);
    }

    public ValidationResult validateDocuments(ApplicationDetails applicationDetails) {
        return applicationDao.checkDocumentPresence(applicationDetails);
    }

    public UpdateStatusResult updateApplicationStatus(ApplicationDetails applicationDetails) {
        return applicationDao.updateStatus(applicationDetails);
    }

    public LogResult logAction(ActionDetails actionDetails) {
        return applicationDao.insertLog(actionDetails);
    }

    public void submitApplication(int applicationNumber) {
        ApplicationDetails applicationDetails = fetchApplicationDetails(applicationNumber);

        if (applicationDetails.getReceivedFlag().equals("N")) {
            // Prompt user to download KYC documents
            throw new RuntimeException("Please download KYC documents before proceeding.");
        }

        ValidationResult validationResult = validateDocuments(applicationDetails);

        if (!validationResult.isValid()) {
            // Log the missing documents
            logAction(new ActionDetails(applicationDetails.getContractId(), "Missing documents", validationResult.getMissingDocuments()));
            throw new RuntimeException("Validation failed: " + validationResult.getErrorMessage());
        }

        // Update application status
        UpdateStatusResult updateStatusResult = updateApplicationStatus(applicationDetails);

        if (!updateStatusResult.isSuccess()) {
            throw new RuntimeException("Failed to update application status.");
        }

        // Log the successful submission
        logAction(new ActionDetails(applicationDetails.getContractId(), "Application submitted successfully", null));
    }
}