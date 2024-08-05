package com.example.controller;

import com.example.service.ProposalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;

@RestController
public class ProposalDetailsController {

    @Autowired
    private ProposalDetailsService proposalDetailsService;

    @GetMapping("/generateUrl")
    public String generateUrl(@RequestParam String applicationNumber, @RequestParam Map<String, String> otherParams) {
        try {
            return proposalDetailsService.generateUrl(applicationNumber, otherParams);
        } catch (Exception e) {
            return "Error generating URL: " + e.getMessage();
        }
    }

    @GetMapping("/transferFiles")
    public ResponseEntity<List<File>> transferFiles(@RequestParam String applicationNumber) {
        try {
            List<File> transferredFiles = proposalDetailsService.transferFiles(applicationNumber);
            return ResponseEntity.ok(transferredFiles);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
