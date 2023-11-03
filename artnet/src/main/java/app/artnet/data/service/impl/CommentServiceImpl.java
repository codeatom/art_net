package app.artnet.data.service.impl;

import app.artnet.converter.Converter;
import app.artnet.data.repository.CommentRepository;
import app.artnet.data.repository.PostRepository;
import app.artnet.data.repository.AppUserRepository;
import app.artnet.data.service.CommentService;
import app.artnet.dto.forms.CommentForm;
import app.artnet.dto.views.CommentView;
import app.artnet.model.Comment;
import app.artnet.model.Post;
import app.artnet.model.AppUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Transactional
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final AppUserRepository appUserRepository;

    private final Converter converter;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository,
                              PostRepository postRepository,
                              AppUserRepository appUserRepository,
                              Converter converter) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.appUserRepository = appUserRepository;
        this.converter = converter;
    }


    @Transactional
    @Override
    public CommentView save(CommentForm commentForm) {
        AppUser appUser = appUserRepository.findById(commentForm.getUserId()).orElse(null);
        Post post = postRepository.findById(commentForm.getPostId()).orElse(null);

        if(appUser == null || post == null){
            return null;
        }

        Comment comment = new Comment(commentForm.getCommentText());
        comment.setCommentDate(LocalDateTime.now());
        comment.setAppUser(appUser);

        post.addComment(comment);
        postRepository.save(post);

        return converter.commentToCommentView(comment);
    }

    @Transactional(readOnly = true)
    @Override
    public CommentView findById(Long id) {
        Comment comment = commentRepository.findById(id).orElse(null);
        return converter.commentToCommentView(comment);
    }

    @Transactional(readOnly = true)
    @Override
    public ArrayList<CommentView> findAllByUserId(String userId) {
        List<Comment> commentList = commentRepository.findAllByAppUserUserId(userId);
        return (ArrayList<CommentView>) converter.commentListToCommentViewList(commentList);
    }

    @Transactional(readOnly = true)
    @Override
    public ArrayList<CommentView> findAllByPostId(Long postId) {
        List<Comment> commentList = commentRepository.findAllByPostPostId(postId);
        return (ArrayList<CommentView>) converter.commentListToCommentViewList(commentList);
    }

    @Transactional
    @Override
    public CommentView update(CommentForm commentForm) {
        Comment comment = commentRepository.findById(commentForm.getCommentId()).orElse(null);

        if(comment == null){
            return null;
        }
        comment.setCommentText(commentForm.getCommentText());
        commentRepository.save(comment);

        return converter.commentToCommentView(comment);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        if (commentRepository.existsById(id)){
            commentRepository.deleteById(id);
        }
    }


    @Transactional
    @Override
    public void deleteAllByUserId(String userId) {
        List<Comment> commentList = commentRepository.findAllByAppUserUserId(userId);

        if (commentList.size() > 0){
            commentRepository.deleteAll(commentList);
        }
    }

}
