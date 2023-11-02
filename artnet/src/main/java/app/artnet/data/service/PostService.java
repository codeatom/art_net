package app.artnet.data.service;

import app.artnet.dto.forms.PostForm;
import app.artnet.dto.views.PostView;
import org.springframework.stereotype.Service;
import java.util.Collection;

@Service
public interface PostService {
    PostView save (PostForm postForm);

    PostView findByPostId(Long id);

    Collection<PostView> findAllByUserId(String id);

    Collection<PostView> findAll();

    PostView update(PostForm postForm);

    PostView updateLikes(Long postId, String localUserId);

    void deleteById(Long id);

    void deleteAllByUserId(String userId);
}
