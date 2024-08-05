package com.example.controller;

import com.example.service.ApplicationService;
import com.example.model.ApplicationDetails;
import com.example.model.ValidationResult;
import com.example.model.UpdateStatusResult;
import com.example.model.ActionDetails;
import com.example.model.LogResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/submit")
    public String submitApplication(@RequestBody ApplicationDetails applicationDetails) {
        // Fetch application details
        ApplicationDetails details = applicationService.fetchApplicationDetails(applicationDetails.getApplicationNumber());

        // Validate documents
        ValidationResult validationResult = applicationService.validateDocuments(details);
        if (!validationResult.isValid()) {
            return validationResult.getErrorMessage();
        }

        // Update application status
        UpdateStatusResult updateStatusResult = applicationService.updateApplicationStatus(details);
        if (!updateStatusResult.isSuccess()) {
            return "Failed to update application status.";
        }

        // Log action
        ActionDetails actionDetails = new ActionDetails();
        actionDetails.setApplicationNumber(details.getApplicationNumber());
        actionDetails.setAction("Submit");
        LogResult logResult = applicationService.logAction(actionDetails);
        if (!logResult.isSuccess()) {
            return "Failed to log action.";
        }

        return "Application submitted successfully.";
    }
}
