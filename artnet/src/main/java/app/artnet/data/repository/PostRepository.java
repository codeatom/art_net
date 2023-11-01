package app.artnet.data.repository;

import app.artnet.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    ArrayList<Post> findAllByAppUserUserId(String postId);
}
