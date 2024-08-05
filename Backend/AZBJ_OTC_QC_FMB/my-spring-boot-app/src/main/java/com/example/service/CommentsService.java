package com.example.service;

import com.example.dao.CommentsDao;
import com.example.model.Comment;
import com.example.util.CommentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentsService {

    @Autowired
    private CommentsDao commentsDao;

    @Autowired
    private CommentUtil commentUtil;

    @Transactional
    public void addComment(String contractId, String policyNo, String comment, String username) {
        if (commentUtil.isCommentFieldEmpty(comment)) {
            return; // If the comment field is empty, do nothing.
        }
        try {
            int eventNo = commentUtil.generateNextEventNumber(contractId);
            commentsDao.insertComment(eventNo, contractId, policyNo, username, comment);
            // Transaction will be committed automatically if no exception occurs.
        } catch (Exception e) {
            // Handle any errors that occur during the process.
            throw new RuntimeException("Error while adding comment: " + e.getMessage(), e);
        }
    }

    public String getLatestComment(String contractId) {
        // Call the CommentsDao to fetch the latest comment for the given contract ID.
        String latestComment = commentsDao.fetchLatestCommentFromDB(contractId);
        // Return the fetched comment.
        return latestComment;
    }

    public List<Comment> fetchComments(String userId, String contractId) {
        if (userId.startsWith("P00") || !commentUtil.isProfileConditionMet(userId)) {
            return commentsDao.getAllComments(contractId);
        } else {
            return commentsDao.getCommentsWithFlagN(contractId);
        }
    }
}
