package app.artnet.data.repository;

import app.artnet.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    ArrayList<Comment> findAllByPostPostId(Long postId);
    ArrayList<Comment> findAllByAppUserUserId(String userId);
}
