package com.example.service;

import com.example.dao.ControlDao;
import com.example.model.Control;
import com.example.model.DateOfBirth;
import com.example.model.ValidationResult;
import com.example.model.PanCardDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlService {

    @Autowired
    private ControlDao controlDao;

    public Control fetchPanCardDetails(String panCardNumber) {
        // Call the getPanCardDetails method from ControlDao to fetch the associated personal details.
        return controlDao.getPanCardDetails(panCardNumber);
    }

    public ValidationResult validatePanCard(String panCardNumber, String userName, String dateOfBirth) {
        // Validate PAN card format
        boolean isFormatValid = controlDao.validatePanCardFormat(panCardNumber);
        if (!isFormatValid) {
            return new ValidationResult(false, "Invalid PAN card format.");
        }

        // Fetch father's name
        String fathersName = controlDao.fetchFathersName(userName);

        // Validate PAN card details
        ValidationResult validationResult = controlDao.validatePanCardDetails(panCardNumber, userName, dateOfBirth, fathersName);
        if (!validationResult.isValid()) {
            return validationResult;
        }

        // Fetch PAN card details
        PanCardDetails panCardDetails = controlDao.fetchPanCardDetails(panCardNumber);

        // Log validation process
        controlDao.logValidationProcess(userName, panCardNumber, userName, dateOfBirth, fathersName);

        return new ValidationResult(true, "PAN card details are valid.");
    }
}