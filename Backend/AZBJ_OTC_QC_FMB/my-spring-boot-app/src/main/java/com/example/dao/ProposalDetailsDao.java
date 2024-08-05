package com.example.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProposalDetailsDao {

    @Autowired
    private DataSource dataSource;

    public String getApplicationNumber() throws SQLException {
        String applicationNumber = null;
        String query = "SELECT APPLN_NO FROM DTLS_BLK WHERE <conditions>;";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            if (resultSet.next()) {
                applicationNumber = resultSet.getString("APPLN_NO");
            }
        } catch (SQLException e) {
            throw new SQLException("Error fetching application number", e);
        }

        return applicationNumber;
    }

    public List<ImageDetail> getImageDetails(String applicationNumber) throws SQLException {
        List<ImageDetail> imageDetails = new ArrayList<>();
        String query = "SELECT * FROM ImageDetails WHERE applicationNumber = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setString(1, applicationNumber);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    ImageDetail imageDetail = new ImageDetail();
                    imageDetail.setId(resultSet.getInt("id"));
                    imageDetail.setApplicationNumber(resultSet.getString("applicationNumber"));
                    imageDetail.setImagePath(resultSet.getString("imagePath"));
                    imageDetails.add(imageDetail);
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Error fetching image details", e);
        }

        return imageDetails;
    }
}

class ImageDetail {
    private int id;
    private String applicationNumber;
    private String imagePath;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getApplicationNumber() {
        return applicationNumber;
    }

    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
