package com.example.service;

import com.example.dao.KycDocumentsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import java.util.Map;

@Service
public class KycDocumentsService {

    @Autowired
    private KycDocumentsDao kycDocumentsDao;

    public String downloadKycDocuments(String applicationNumber) {
        try {
            // Retrieve the proposal number using the application number
            String proposalNumber = getProposalNumber(applicationNumber);

            // Fetch the contract ID using the proposal number
            String contractId = kycDocumentsDao.getContractId(proposalNumber);

            // Fetch user details using the contract ID
            Map<String, Object> userDetails = kycDocumentsDao.getUserDetails(contractId);

            // Construct a JSON string with the retrieved details
            JSONObject json = new JSONObject();
            json.put("PAN", userDetails.get("TAX_ID"));
            json.put("DateOfBirth", userDetails.get("DATE_OF_BIRTH"));
            json.put("Sex", userDetails.get("SEX"));
            json.put("FirstName", userDetails.get("FIRST_NAME"));
            json.put("MiddleName", userDetails.get("MIDDLE_NAME"));
            json.put("Surname", userDetails.get("SURNAME"));

            // Send an HTTP POST request to a predefined URL with the JSON string
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://example.com/api/kyc";
            String response = restTemplate.postForObject(url, json.toString(), String.class);

            // Display the response message
            return response;
        } catch (Exception e) {
            // Handle any exceptions and display appropriate error messages
            return "Error: " + e.getMessage();
        }
    }

    private String getProposalNumber(String applicationNumber) {
        // Logic to retrieve the proposal number using the application number
        // This is a placeholder implementation
        return "PROPOSAL123";
    }
}