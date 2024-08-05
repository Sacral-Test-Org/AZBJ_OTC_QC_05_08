package com.example.dao;

import com.example.model.ImageDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ImageDetailsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String GET_IMAGE_DETAILS_QUERY = "SELECT image_path, proposal_no, image_name FROM image_det WHERE <conditions>;";
    private static final String LOG_TRANSFER_DETAILS_QUERY = "INSERT INTO log_table (contract_id, appln_no, log_message) VALUES (?, ?, ?);";
    private static final String LOG_ERROR_DETAILS_QUERY = "INSERT INTO log_table (contract_id, appln_no, log_message) VALUES (?, ?, ?);";

    public ImageDetails getImageDetails() {
        List<ImageDetails> imageDetailsList = jdbcTemplate.query(GET_IMAGE_DETAILS_QUERY, new RowMapper<ImageDetails>() {
            @Override
            public ImageDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
                ImageDetails imageDetails = new ImageDetails();
                imageDetails.setImagePath(rs.getString("image_path"));
                imageDetails.setProposalNo(rs.getString("proposal_no"));
                imageDetails.setImageName(rs.getString("image_name"));
                return imageDetails;
            }
        });
        return imageDetailsList.isEmpty() ? null : imageDetailsList.get(0);
    }

    public void logTransferDetails(String contractId, String applnNo, String logMessage) {
        jdbcTemplate.update(LOG_TRANSFER_DETAILS_QUERY, contractId, applnNo, logMessage);
    }

    public void logErrorDetails(String contractId, String applnNo, String logMessage) {
        jdbcTemplate.update(LOG_ERROR_DETAILS_QUERY, contractId, applnNo, logMessage);
    }
}
