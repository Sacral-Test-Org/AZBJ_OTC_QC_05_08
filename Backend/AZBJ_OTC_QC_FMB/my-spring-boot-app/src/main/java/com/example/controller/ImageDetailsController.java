package com.example.controller;

import com.example.service.ImageDetailsService;
import com.example.model.ImageDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/image-details")
public class ImageDetailsController {

    @Autowired
    private ImageDetailsService imageDetailsService;

    @GetMapping("/get")
    public ResponseEntity<ImageDetails> getImageDetails() {
        ImageDetails imageDetails = imageDetailsService.getImageDetails();
        return ResponseEntity.ok(imageDetails);
    }

    @PostMapping("/log-transfer")
    public ResponseEntity<Void> logTransferDetails(@RequestBody LogRequest logRequest) {
        imageDetailsService.logTransferDetails(logRequest.getContractId(), logRequest.getApplnNo(), logRequest.getLogMessage());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/log-error")
    public ResponseEntity<Void> logErrorDetails(@RequestBody LogRequest logRequest) {
        imageDetailsService.logErrorDetails(logRequest.getContractId(), logRequest.getApplnNo(), logRequest.getLogMessage());
        return ResponseEntity.ok().build();
    }

    public static class LogRequest {
        private String contractId;
        private String applnNo;
        private String logMessage;

        public String getContractId() {
            return contractId;
        }

        public void setContractId(String contractId) {
            this.contractId = contractId;
        }

        public String getApplnNo() {
            return applnNo;
        }

        public void setApplnNo(String applnNo) {
            this.applnNo = applnNo;
        }

        public String getLogMessage() {
            return logMessage;
        }

        public void setLogMessage(String logMessage) {
            this.logMessage = logMessage;
        }
    }
}