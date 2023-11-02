package app.artnet.data.service;

import app.artnet.dto.forms.CommentForm;
import app.artnet.dto.views.CommentView;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public interface CommentService {
    CommentView save (CommentForm commentForm);

    CommentView findById(Long id);

    ArrayList<CommentView> findAllByUserId(String userId);

    ArrayList<CommentView> findAllByPostId(Long postId);

    CommentView update(CommentForm commentForm);

    void deleteById(Long id);

    void deleteAllByUserId(String userId);
}
