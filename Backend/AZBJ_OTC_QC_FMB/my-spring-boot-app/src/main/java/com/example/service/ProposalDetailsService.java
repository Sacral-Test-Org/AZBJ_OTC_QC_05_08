package com.example.service;

import com.example.dao.ProposalDetailsDao;
import com.example.model.ImageDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProposalDetailsService {

    @Autowired
    private ProposalDetailsDao proposalDetailsDao;

    public String generateUrl(String applicationNumber, Object otherParams) {
        try {
            // Fetch the application number using getApplicationNumber method from ProposalDetailsDao
            String applnNo = proposalDetailsDao.getApplicationNumber();

            // Use the application number and other parameters to generate the URL
            String url = "https://example.com/proposal?applnNo=" + applnNo + "&params=" + otherParams.toString();

            // Return the generated URL
            return url;
        } catch (Exception e) {
            // Handle any exceptions and return null
            e.printStackTrace();
            return null;
        }
    }

    public List<File> transferFiles(String applicationNumber) {
        try {
            // Fetch image details for the given application number
            List<ImageDetail> imageDetails = proposalDetailsDao.getImageDetails(applicationNumber);

            // Create a folder named after the application number in the C:\temp\ directory
            String folderPath = "C:\\temp\\" + applicationNumber;
            Files.createDirectories(Paths.get(folderPath));

            // Iterate through the image details and transfer files from the server to the local folder
            for (ImageDetail imageDetail : imageDetails) {
                if (imageDetail.getImagePath() != null) {
                    URL imageUrl = new URL(imageDetail.getImagePath());
                    String fileName = Paths.get(imageUrl.getPath()).getFileName().toString();
                    File localFile = new File(folderPath + File.separator + fileName);

                    try (InputStream in = imageUrl.openStream(); FileOutputStream out = new FileOutputStream(localFile)) {
                        byte[] buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = in.read(buffer)) != -1) {
                            out.write(buffer, 0, bytesRead);
                        }
                    }

                    // Open the file using the default viewer
                    if (fileName.endsWith(".pdf")) {
                        Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + localFile.getAbsolutePath());
                    } else {
                        Desktop.getDesktop().open(localFile);
                    }
                }
            }

            // Return the list of files transferred
            return Files.list(Paths.get(folderPath)).map(Path::toFile).collect(Collectors.toList());
        } catch (Exception e) {
            // Handle any exceptions gracefully
            e.printStackTrace();
            return null;
        }
    }
}
