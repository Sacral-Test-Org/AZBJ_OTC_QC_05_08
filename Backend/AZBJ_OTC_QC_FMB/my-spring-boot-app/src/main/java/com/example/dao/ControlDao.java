package com.example.dao;

import com.example.model.Control;
import com.example.model.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ControlDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Control getPanCardDetails(String panCardNumber) {
        String sql = "SELECT first_name, middle_name, surname, DATE_OF_BIRTH " +
                     "FROM cp_partners " +
                     "WHERE part_id = CASE WHEN :CONTROL.ip_ph = 'IP' THEN pk_vars.ip_part_id " +
                     "ELSE pk_vars.ph_part_id END";

        List<Control> controls = jdbcTemplate.query(sql, new Object[]{panCardNumber}, new RowMapper<Control>() {
            @Override
            public Control mapRow(ResultSet rs, int rowNum) throws SQLException {
                Control control = new Control();
                control.setFirstName(rs.getString("first_name"));
                control.setMiddleName(rs.getString("middle_name"));
                control.setSurname(rs.getString("surname"));
                control.setDob(rs.getDate("DATE_OF_BIRTH"));
                return control;
            }
        });

        return controls.isEmpty() ? null : controls.get(0);
    }

    public DateOfBirth fetchDateOfBirth(String applicationNumber) {
        String sql = "SELECT ip_dob, ph_dob FROM azbj_proposal_appln_det WHERE appln_no = ? AND de_flag = 'D2'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, (rs, rowNum) -> {
            DateOfBirth dob = new DateOfBirth();
            dob.setIpDob(rs.getDate("ip_dob"));
            dob.setPhDob(rs.getDate("ph_dob"));
            return dob;
        });
    }

    public boolean validatePanCardFormat(String panCardNumber) {
        String sql = "SELECT 'Y' FROM DUAL WHERE REGEXP_LIKE (UPPER(?), '^[A-Z]{3}[C,P,H,F,A,T,B,L,J,G][A-Z][0-9]{4}[A-Z]')";
        try {
            String result = jdbcTemplate.queryForObject(sql, new Object[]{panCardNumber}, String.class);
            return "Y".equals(result);
        } catch (Exception e) {
            return false;
        }
    }

    public String fetchFathersName(String partnerId) {
        String sql = "SELECT father_name FROM azbj_partner_extn WHERE part_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{partnerId}, String.class);
    }

    public ValidationResult validatePanCardDetails(String panCardNumber, String userName, String dateOfBirth, String fathersName) {
        String sql = "CALL customer.azbj_pan_det_list(?, ?, ?, ?, ?)";
        ValidationResult validationResult = new ValidationResult();
        jdbcTemplate.update(sql, panCardNumber, userName, dateOfBirth, fathersName, validationResult);
        return validationResult;
    }

    public PanCardDetails fetchPanCardDetails(String panSeqNo) {
        String sql = "SELECT * FROM AZBJ_PAN_DTLS WHERE pan_seq_no = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{panSeqNo}, (rs, rowNum) -> {
            PanCardDetails details = new PanCardDetails();
            details.setPanNo(rs.getString("PAN_NUMBER"));
            details.setPanStatus(rs.getString("PAN_STATUS").equals("E") ? "VALID" : "INVALID");
            details.setNameMatch(rs.getString("PAN_NAME"));
            details.setDobMatch(rs.getString("PAN_DOB"));
            details.setSeedingFlag(rs.getString("AADHAR_SEEDING"));
            return details;
        });
    }

    public void logValidationProcess(String applicationNumber, String panCardNumber, String userName, String dateOfBirth, String fathersName) {
        String sql = "CALL azbj_new_bbu_utilities.bbu_ins_log(?, ?, ?)";
        String logMessage = String.format("OPS-9977_BBU:PAN: %s NAME: %s DOB: %s FATHER_NAME: %s", panCardNumber, userName, dateOfBirth, fathersName);
        jdbcTemplate.update(sql, applicationNumber, applicationNumber, logMessage);
    }
}
