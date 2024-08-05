package com.example.dao;

import com.example.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class AccountDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String IFSC_LOOKUP_QUERY = "SELECT BANK_NAME, BANK_BRANCH, BANK_MICR FROM azbj_bank_ifsc_detail WHERE BANK_IFSC = ?";

    public Account getBankDetailsByIFSC(String ifscCode) {
        return jdbcTemplate.queryForObject(IFSC_LOOKUP_QUERY, new Object[]{ifscCode}, new RowMapper<Account>() {
            @Override
            public Account mapRow(ResultSet rs, int rowNum) throws SQLException {
                Account account = new Account();
                account.setBankName(rs.getString("BANK_NAME"));
                account.setBranch(rs.getString("BANK_BRANCH"));
                account.setMicrCode(rs.getString("BANK_MICR"));
                return account;
            }
        });
    }
}
