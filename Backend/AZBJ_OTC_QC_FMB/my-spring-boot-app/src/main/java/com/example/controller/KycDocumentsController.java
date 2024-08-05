package com.example.controller;

import com.example.service.KycDocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KycDocumentsController {

    @Autowired
    private KycDocumentsService kycDocumentsService;

    @PostMapping("/downloadKycDocuments")
    public ResponseEntity<String> downloadKycDocuments(@RequestParam String applicationNumber) {
        try {
            String jsonResponse = kycDocumentsService.downloadKycDocuments(applicationNumber);
            return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
