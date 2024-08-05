package com.example.util;

import com.example.dao.CommentsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentUtil {

    @Autowired
    private CommentsDao commentsDao;

    public int generateNextEventNumber(String contractId) {
        return commentsDao.getMaxEventNumber(contractId);
    }

    public boolean isCommentFieldEmpty(String comment) {
        return comment == null || comment.trim().isEmpty();
    }
}
