package com.example.service;

import com.example.dao.ImageDetailsDao;
import com.example.model.ImageDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageDetailsService {

    @Autowired
    private ImageDetailsDao imageDetailsDao;

    public ImageDetails getImageDetails() {
        return imageDetailsDao.getImageDetails();
    }

    public void logTransferDetails(String contract_id, String appln_no, String log_message) {
        imageDetailsDao.logTransferDetails(contract_id, appln_no, log_message);
    }

    public void logErrorDetails(String contract_id, String appln_no, String log_message) {
        imageDetailsDao.logErrorDetails(contract_id, appln_no, log_message);
    }
}
