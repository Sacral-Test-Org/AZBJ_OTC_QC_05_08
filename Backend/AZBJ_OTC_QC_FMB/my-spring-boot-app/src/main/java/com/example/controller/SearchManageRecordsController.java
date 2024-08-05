package com.example.controller;

import com.example.service.SearchManageRecordsService;
import com.example.model.SearchManageRecords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/records")
public class SearchManageRecordsController {

    @Autowired
    private SearchManageRecordsService searchManageRecordsService;

    @PostMapping("/incrementCounter")
    public ResponseEntity<Void> incrementCounter() {
        searchManageRecordsService.incrementCounter();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<Void> updateStatus(@RequestParam String status) {
        searchManageRecordsService.updateStatus(status);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/invokeAZBJComments")
    public ResponseEntity<Void> invokeAZBJComments() {
        searchManageRecordsService.invokeAZBJComments();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<SearchManageRecords> searchRecords(@RequestParam String startDate, @RequestParam String endDate, @RequestParam String applicationNumber, @RequestParam String partnerType, @RequestParam String status) {
        return searchManageRecordsService.searchRecords(startDate, endDate, applicationNumber, partnerType, status);
    }

    @PostMapping("/clear")
    public void clearFields() {
        // Logic to clear fields
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveRecords(@RequestBody List<SearchManageRecords> records) {
        searchManageRecordsService.saveRecords(records);
        return ResponseEntity.ok("Records saved successfully");
    }

    @GetMapping("/viewDocs")
    public List<Document> viewDocs(@RequestParam String applicationNumber) {
        return searchManageRecordsService.getDocuments(applicationNumber);
    }

    @PostMapping("/uploadDocs")
    public void uploadDocs(@RequestParam String applicationNumber, @RequestParam MultipartFile file) {
        searchManageRecordsService.uploadDocument(applicationNumber, file);
    }

    @PostMapping("/edit")
    public void editRecord(@RequestBody SearchManageRecords record) {
        searchManageRecordsService.updateRecord(record);
    }

    @PostMapping("/addComments")
    public void addComments(@RequestParam String applicationNumber, @RequestParam String comments) {
        searchManageRecordsService.addComments(applicationNumber, comments);
    }

    @PostMapping("/reject")
    public void rejectRecord(@RequestParam String applicationNumber, @RequestParam String rejectionReason) {
        searchManageRecordsService.rejectRecord(applicationNumber, rejectionReason);
    }

    @PostMapping("/confirmAction")
    public void confirmAction(@RequestParam String action) {
        // Logic to confirm action
    }

    @GetMapping("/selectedCases")
    public ResponseEntity<List<SearchManageRecords>> getSelectedCases() {
        List<SearchManageRecords> selectedCases = searchManageRecordsService.fetchSelectedCases();
        return ResponseEntity.ok(selectedCases);
    }

    @PostMapping("/validateCase")
    public ResponseEntity<Boolean> validateCase(@RequestBody SearchManageRecords record) {
        boolean isValid = searchManageRecordsService.checkCaseValidity(record);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/proceedToNextForm")
    public ResponseEntity<Void> proceedToNextForm(@RequestBody SearchManageRecords record) {
        searchManageRecordsService.processNextForm(record);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/rejectRecords")
    public ResponseEntity<String> rejectRecords(@RequestBody List<String> applicationNumbers) {
        String response = searchManageRecordsService.rejectRecords(applicationNumbers);
        return ResponseEntity.ok(response);
    }
}