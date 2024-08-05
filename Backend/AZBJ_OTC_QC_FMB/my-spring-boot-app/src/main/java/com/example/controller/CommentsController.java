package com.example.controller;

import com.example.service.CommentsService;
import com.example.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @GetMapping("/comments/latest")
    public ResponseEntity<String> fetchLatestComment(@RequestParam String contractId) {
        String latestComment = commentsService.getLatestComment(contractId);
        return ResponseEntity.ok(latestComment);
    }

    @PostMapping("/comments/add")
    public ResponseEntity<String> addComment(@RequestBody Map<String, String> request) {
        String contractId = request.get("contractId");
        String policyNo = request.get("policyNo");
        String comment = request.get("comment");
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            commentsService.addComment(contractId, policyNo, comment, username);
            return ResponseEntity.ok("Comment added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding comment: " + e.getMessage());
        }
    }

    @GetMapping("/comments/refresh")
    public ResponseEntity<List<Comment>> getComments(@RequestParam String userId, @RequestParam String contractId) {
        List<Comment> comments = commentsService.fetchComments(userId, contractId);
        return ResponseEntity.ok(comments);
    }
}
