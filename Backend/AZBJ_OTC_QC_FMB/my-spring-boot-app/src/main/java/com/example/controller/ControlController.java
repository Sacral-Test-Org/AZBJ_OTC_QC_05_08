package com.example.controller;

import com.example.service.ControlService;
import com.example.model.Control;
import com.example.model.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/control")
public class ControlController {

    @Autowired
    private ControlService controlService;

    @GetMapping("/panCardDetails/{panCardNumber}")
    public ResponseEntity<Control> getPanCardDetails(@PathVariable String panCardNumber) {
        Control control = controlService.fetchPanCardDetails(panCardNumber);
        return ResponseEntity.ok(control);
    }

    @GetMapping("/validatePanCard")
    public ResponseEntity<ValidationResult> validatePanCardDetails(
            @RequestParam String panCardNumber,
            @RequestParam String userName,
            @RequestParam String dateOfBirth) {
        ValidationResult validationResult = controlService.validatePanCard(panCardNumber, userName, dateOfBirth);
        return ResponseEntity.ok(validationResult);
    }
}