package com.example.service;

import com.example.dao.AccountDao;
import com.example.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountDao accountDao;

    public Account fetchBankDetails(String ifscCode) {
        // Call the accountDao to fetch bank details based on the IFSC code and return the data.
        return accountDao.getBankDetailsByIFSC(ifscCode);
    }

    public void saveAccountDetails(Account accountDetails) {
        // Call the accountDao to save the account details.
        accountDao.saveAccountDetails(accountDetails);
    }
}