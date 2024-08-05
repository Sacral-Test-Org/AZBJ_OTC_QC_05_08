package com.example.dao;

import com.example.model.SearchManageRecords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class SearchManageRecordsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<SearchManageRecords> searchRecords(String startDate, String endDate, String applicationNumber, String partnerType, String status) {
        String sql = "SELECT * FROM records WHERE start_date >= ? AND end_date <= ? AND application_number = ? AND partner_type = ? AND status = ?";
        return jdbcTemplate.query(sql, new Object[]{startDate, endDate, applicationNumber, partnerType, status}, (rs, rowNum) -> {
            SearchManageRecords record = new SearchManageRecords();
            record.setId(rs.getLong("id"));
            record.setStartDate(rs.getString("start_date"));
            record.setEndDate(rs.getString("end_date"));
            record.setApplicationNumber(rs.getString("application_number"));
            record.setPartnerType(rs.getString("partner_type"));
            record.setStatus(rs.getString("status"));
            return record;
        });
    }

    public void saveRecord(SearchManageRecords record) {
        String sql = "INSERT INTO records (start_date, end_date, application_number, partner_type, status) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, record.getStartDate(), record.getEndDate(), record.getApplicationNumber(), record.getPartnerType(), record.getStatus());
    }

    public void saveRecords(List<SearchManageRecords> records) {
        for (SearchManageRecords record : records) {
            saveRecord(record);
        }
    }

    public String retrieveContractId(String applicationNumber) {
        String sql = "SELECT cont_id FROM azbj_batch_items WHERE application_no = ? AND transaction_type = 'FRP' AND ROWNUM = 1";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, String.class);
    }

    public int checkRuleErrors(String activityId) {
        String sql = "SELECT COUNT(*) FROM bbu_trans_dtls WHERE trans_id = ? AND action_id = 2 AND rule_config_id IS NOT NULL AND version_no = (SELECT MAX(version_no) FROM bbu_trans_dtls WHERE trans_id = ?)";
        return jdbcTemplate.queryForObject(sql, new Object[]{activityId, activityId}, Integer.class);
    }

    public void updatePolicyVersionStatus(String contractId) {
        String sql = "UPDATE wip_policy_versions SET change_description = 'PENDING_FOR_AUTO_BBU', contract_status = 'I' WHERE contract_id = ?";
        jdbcTemplate.update(sql, contractId);
    }

    public void updateHubTracker(String applicationNumber) {
        String sql = "UPDATE azbj_phub_tracker SET proposal_modif_user = USER, proposal_status = 'PENDING_FOR_AUTO_BBU', proposal_modif_date = SYSDATE, locking_flag = 'N' WHERE application_no = ?";
        jdbcTemplate.update(sql, applicationNumber);
    }

    public void updateBBUTransaction(String applicationNumber, String contractId) {
        String sql = "UPDATE bbu_trans SET proposal_no = NVL(v_policy_no, p_data.policy_ref), contract_id = ?, user_id = USER WHERE appl_no = ? AND version_no = (SELECT MAX(version_no) FROM bbu_trans WHERE appl_no = ?)";
        jdbcTemplate.update(sql, contractId, applicationNumber, applicationNumber);
    }

    public void trackStatusInHub(String applicationNumber) {
        String sql = "BEGIN azbj_pk0_hub_metapara.azbj_hub_status_tracker(NULL, ?, NULL, 'PENDING_FOR_AUTO_BBU', USER, SYSDATE, SYSDATE); EXCEPTION WHEN OTHERS THEN NULL; END;";
        jdbcTemplate.update(sql, applicationNumber);
    }

    public List<Document> getDocuments(String applicationNumber) {
        String sql = "SELECT * FROM documents WHERE application_number = ?";
        return jdbcTemplate.query(sql, new Object[]{applicationNumber}, (rs, rowNum) -> {
            Document document = new Document();
            document.setId(rs.getLong("id"));
            document.setApplicationNumber(rs.getString("application_number"));
            document.setFileName(rs.getString("file_name"));
            document.setFileType(rs.getString("file_type"));
            document.setFileData(rs.getBytes("file_data"));
            return document;
        });
    }

    public void uploadDocument(String applicationNumber, MultipartFile file) {
        String sql = "INSERT INTO documents (application_number, file_name, file_type, file_data) VALUES (?, ?, ?, ?)";
        try {
            jdbcTemplate.update(sql, applicationNumber, file.getOriginalFilename(), file.getContentType(), file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateRecord(SearchManageRecords record) {
        String sql = "UPDATE records SET start_date = ?, end_date = ?, partner_type = ?, status = ? WHERE application_number = ?";
        jdbcTemplate.update(sql, record.getStartDate(), record.getEndDate(), record.getPartnerType(), record.getStatus(), record.getApplicationNumber());
    }

    public void addComments(String applicationNumber, String comments) {
        String sql = "UPDATE records SET comments = ? WHERE application_number = ?";
        jdbcTemplate.update(sql, comments, applicationNumber);
    }

    public void rejectRecord(String applicationNumber, String rejectionReason) {
        String sql = "UPDATE records SET status = 'Rejected', rejection_reason = ? WHERE application_number = ?";
        jdbcTemplate.update(sql, rejectionReason, applicationNumber);
    }

    public void incrementCounter() {
        String sql = "UPDATE counter_table SET counter_value = counter_value + 1 WHERE counter_name = 'ok_button_counter'";
        jdbcTemplate.update(sql);
    }

    public void updateStatus(String status) {
        String sql = "UPDATE status_table SET status_value = ? WHERE status_name = 'current_status'";
        jdbcTemplate.update(sql, status);
    }

    public void invokeAZBJComments(String applicationNumber, String reasonLink) {
        String contractIdSql = "SELECT CONT_ID FROM azbj_batch_items WHERE APPLICATION_NO = ? AND TRANSACTION_TYPE='FRP'";
        String contractId = jdbcTemplate.queryForObject(contractIdSql, new Object[]{applicationNumber}, String.class);

        String eventNoSql = "SELECT NVL(MAX(event_no) + 1, 1) FROM azbj_uw_comments WHERE contract_id = ?";
        int eventNo = jdbcTemplate.queryForObject(eventNoSql, new Object[]{contractId}, Integer.class);

        String insertCommentSql = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag) " +
                "VALUES (?, ?, ?, 'AZBJ_WEB_OTC', 'some_status', USER, SYSDATE, ?, 'N')";
        jdbcTemplate.update(insertCommentSql, eventNo, contractId, applicationNumber, reasonLink);
    }

    public List<SearchManageRecords> getSelectedCases() {
        String sql = "SELECT * FROM records WHERE selected = 1";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            SearchManageRecords record = new SearchManageRecords();
            record.setId(rs.getLong("id"));
            record.setStartDate(rs.getString("start_date"));
            record.setEndDate(rs.getString("end_date"));
            record.setApplicationNumber(rs.getString("application_number"));
            record.setPartnerType(rs.getString("partner_type"));
            record.setStatus(rs.getString("status"));
            return record;
        });
    }

    public boolean validateCase(SearchManageRecords record) {
        String sql = "SELECT COUNT(*) FROM azbj_phub_tracker WHERE application_no = ? AND proposal_status = 'specific_status' AND perm_receipt_no IS NULL";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{record.getApplicationNumber()}, Integer.class);
        return count != null && count == 1;
    }

    public void proceedToNextForm(SearchManageRecords record) {
        String sql = "INSERT INTO azbj_landing_form_data (user_id, appln_no, start_time, flag) VALUES (USER, ?, SYSDATE, 'DEQC')";
        jdbcTemplate.update(sql, record.getApplicationNumber());
    }

    // New methods for Reject button functionality

    public String getContractId(String applicationNumber) {
        String sql = "SELECT CONT_ID FROM azbj_batch_items WHERE APPLICATION_NO = ? AND TRANSACTION_TYPE = 'FRP'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, String.class);
    }

    public int getNextEventNumber(String contractId) {
        String sql = "SELECT NVL(MAX(event_no) + 1, 1) FROM azbj_uw_comments WHERE contract_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, Integer.class);
    }

    public void insertComment(int eventNo, String contractId, String proposalNo, String reasonLink) {
        String sql = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag) " +
                "VALUES (?, ?, ?, 'AZBJ_WEB_OTC', 'some_status', USER, SYSDATE, ?, 'N')";
        jdbcTemplate.update(sql, eventNo, contractId, proposalNo, reasonLink);
    }
}
