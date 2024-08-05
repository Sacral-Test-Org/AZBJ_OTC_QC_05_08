package com.example.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import com.example.model.Comment;

@Repository
public class CommentsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String fetchLatestCommentFromDB(String contractId) {
        String sql = "SELECT comments FROM azbj_uw_comments a WHERE contract_id = ? AND event_no = (SELECT MAX(event_no) FROM azbj_uw_comments b WHERE a.contract_id = b.contract_id)";
        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, String.class);
    }

    public int getMaxEventNumber(String contractId) {
        String sql = "SELECT NVL(MAX(event_no), 0) + 1 FROM azbj_uw_comments WHERE contract_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, Integer.class);
    }

    public void insertComment(int eventNo, String contractId, String policyNo, String username, String comment) {
        String sql = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, user_id, comment_date, comments, flag) VALUES (?, ?, ?, ?, SYSDATE, ?, 'Y')";
        jdbcTemplate.update(sql, eventNo, contractId, policyNo, username, comment);
    }

    public List<Comment> getAllComments(String contractId) {
        String sql = "SELECT * FROM AZBJ_UW_COMMENTS WHERE contract_id = ?";
        return jdbcTemplate.query(sql, new Object[]{contractId}, new CommentRowMapper());
    }

    public List<Comment> getCommentsWithFlagN(String contractId) {
        String sql = "SELECT * FROM AZBJ_UW_COMMENTS WHERE contract_id = ? AND flag = 'N'";
        return jdbcTemplate.query(sql, new Object[]{contractId}, new CommentRowMapper());
    }

    private static final class CommentRowMapper implements RowMapper<Comment> {
        @Override
        public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Comment comment = new Comment();
            comment.setEventNo(rs.getInt("event_no"));
            comment.setContractId(rs.getString("contract_id"));
            comment.setPolicyNo(rs.getString("policy_no"));
            comment.setUserId(rs.getString("user_id"));
            comment.setCommentDate(rs.getDate("comment_date"));
            comment.setComments(rs.getString("comments"));
            comment.setFlag(rs.getString("flag"));
            return comment;
        }
    }
}
