package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class KycDocumentsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String getContractId(String proposalNumber) {
        String sql = "SELECT azbj_pk0_acc.get_contract_id(?) FROM dual";
        return jdbcTemplate.queryForObject(sql, new Object[]{proposalNumber}, String.class);
    }

    public Map<String, Object> getUserDetails(String contractId) {
        String sql = "SELECT TAX_ID, DATE_OF_BIRTH, SEX, FIRST_NAME, MIDDLE_NAME, SURNAME " +
                     "FROM cp_partners a, wip_interested_parties b " +
                     "WHERE CONTRACT_ID = ? " +
                     "AND a.PART_ID = b.PARTNER_ID " +
                     "AND b.IP_NO = 2";

        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, (rs, rowNum) -> {
            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("TAX_ID", rs.getString("TAX_ID"));
            userDetails.put("DATE_OF_BIRTH", rs.getDate("DATE_OF_BIRTH"));
            userDetails.put("SEX", rs.getString("SEX"));
            userDetails.put("FIRST_NAME", rs.getString("FIRST_NAME"));
            userDetails.put("MIDDLE_NAME", rs.getString("MIDDLE_NAME"));
            userDetails.put("SURNAME", rs.getString("SURNAME"));
            return userDetails;
        });
    }
}
