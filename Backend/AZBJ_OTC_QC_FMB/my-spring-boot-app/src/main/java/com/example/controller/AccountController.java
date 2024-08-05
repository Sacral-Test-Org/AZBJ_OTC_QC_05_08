package com.example.controller;

import com.example.model.Account;
import com.example.model.AccountDetails;
import com.example.model.BankDetails;
import com.example.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/lookupIFSCCode")
    public BankDetails lookupIFSCCode(@RequestParam String ifscCode) {
        return accountService.lookupIFSCCode(ifscCode);
    }

    @PostMapping("/saveAccountDetails")
    public void saveAccountDetails(@RequestBody AccountDetails accountDetails) {
        accountService.saveAccountDetails(accountDetails);
    }

    @GetMapping("/fetchBankDetails")
    public ResponseEntity<Account> getBankDetailsByIFSC(@RequestParam String ifscCode) {
        Account account = accountService.fetchBankDetails(ifscCode);
        return ResponseEntity.ok(account);
    }
}
