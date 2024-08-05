package com.example.dao;

import com.example.model.Application;
import com.example.model.ValidationResult;
import com.example.model.ActionDetails;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public class ApplicationDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Application getApplicationDetails(String applicationNumber) {
        String sql = "SELECT * FROM azbj_proposal_appln_det WHERE appln_no = TO_NUMBER(?) AND de_flag = 'D2'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, (rs, rowNum) -> {
            Application application = new Application();
            application.setApplicationNumber(rs.getString("appln_no"));
            application.setDeFlag(rs.getString("de_flag"));
            // Set other fields as necessary
            return application;
        });
    }

    public ValidationResult checkDocumentPresence(Application applicationDetails) {
        String sql = "SELECT COUNT(1) FROM azbj_cq_doc_upload_dtls a, inf_dnm_poplists b WHERE a.doc_type = b.internal_value AND poplist_code = 'EVIDENCE_TYPE' AND a.application_no = ? AND a.doc_type = ?";
        int ageProofCount = jdbcTemplate.queryForObject(sql, new Object[]{applicationDetails.getApplicationNumber(), "AGE_PROOF"}, Integer.class);
        int identityProofCount = jdbcTemplate.queryForObject(sql, new Object[]{applicationDetails.getApplicationNumber(), "IDENTITY_PROOF"}, Integer.class);
        int incomeProofCount = jdbcTemplate.queryForObject(sql, new Object[]{applicationDetails.getApplicationNumber(), "INCOME_PROOF"}, Integer.class);
        int permanentAddressProofCount = jdbcTemplate.queryForObject(sql, new Object[]{applicationDetails.getApplicationNumber(), "PERMANENT_ADDRESS_PROOF"}, Integer.class);
        int currentAddressProofCount = jdbcTemplate.queryForObject(sql, new Object[]{applicationDetails.getApplicationNumber(), "CURRENT_ADDRESS_PROOF"}, Integer.class);

        ValidationResult validationResult = new ValidationResult();
        validationResult.setAgeProofPresent(ageProofCount > 0);
        validationResult.setIdentityProofPresent(identityProofCount > 0);
        validationResult.setIncomeProofPresent(incomeProofCount > 0);
        validationResult.setPermanentAddressProofPresent(permanentAddressProofCount > 0);
        validationResult.setCurrentAddressProofPresent(currentAddressProofCount > 0);

        return validationResult;
    }

    public int updateStatus(Application applicationDetails, String newStatus) {
        String sql = "UPDATE azbj_phub_tracker SET proposal_modif_user = USER, proposal_status = ?, proposal_modif_date = SYSDATE WHERE application_no = ?";
        return jdbcTemplate.update(sql, newStatus, applicationDetails.getApplicationNumber());
    }

    public int insertLog(ActionDetails actionDetails) {
        String sql = "INSERT INTO azbj_pol_activity_log (activity_seq, effective_date, activity_date, username, contract_id, pol_activity_no, policy_ref, event_code, event_desc, comments, doc_link, request_date) VALUES (azbj_policy_log_seq.NEXTVAL, pme_api.opus_date, pme_api.opus_date, USER, ?, ?, ?, NULL, ?, ?, NULL, pme_api.opus_date)";
        return jdbcTemplate.update(sql, actionDetails.getContractId(), actionDetails.getPolActivityNo(), actionDetails.getProposalNo(), actionDetails.getComments());
    }
}