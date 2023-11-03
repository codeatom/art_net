package app.artnet.data.service.impl;

import app.artnet.converter.Converter;
import app.artnet.data.repository.PostRepository;
import app.artnet.data.repository.AppUserRepository;
import app.artnet.data.service.PostService;
import app.artnet.dto.forms.PostForm;
import app.artnet.dto.views.PostView;
import app.artnet.model.AppUser;
import app.artnet.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;


@Transactional
@Service
public class PostServiceImpl implements PostService {

    private final AppUserRepository appUserRepository;
    private final PostRepository postRepository;
    private final Converter converter;

    @Autowired
    public PostServiceImpl(AppUserRepository appUserRepository, PostRepository postRepository, Converter converter) {
        this.appUserRepository = appUserRepository;
        this.postRepository = postRepository;
        this.converter = converter;
    }


    @Transactional
    @Override
    public PostView save(PostForm postForm) {
        AppUser appUser = appUserRepository.findById(postForm.getUserId()).orElse(null);

        if(appUser == null){
            return null;
        }

        Post post = new Post(
                postForm.getDescription(),
                postForm.getPostImgURL()
        );

        post.setPostDate(LocalDateTime.now());
        post.setAppUser(appUser);
        postRepository.save(post);

        return converter.postToPostView(post);
    }

    @Transactional(readOnly = true)
    @Override
    public PostView findByPostId(Long id) {
        Post post = postRepository.findById(id).orElse(null);
        if(post == null){
            return null;
        }

        return converter.postToPostView(post);
    }

    @Transactional(readOnly = true)
    @Override
    public Collection<PostView> findAllByUserId(String id) {
        ArrayList<Post> allPost = postRepository.findAllByAppUserUserId(id);

        allPost.sort((e1, e2) -> e2.getPostDate().compareTo(e1.getPostDate()));
        for(Post post : allPost){
            post.getComments().sort((e1, e2) -> e2.getCommentDate().compareTo(e1.getCommentDate()));
        }

        return converter.postListToPostViewList(allPost);
    }

    @Transactional(readOnly = true)
    @Override
    public Collection<PostView> findAll() {
        ArrayList<Post> allPost = (ArrayList<Post>) postRepository.findAll();

     // allPost.sort((e1, e2) -> e2.getPostDate().compareTo(e1.getPostDate()));
        for(Post post : allPost){
            post.getComments().sort((e1, e2) -> e2.getCommentDate().compareTo(e1.getCommentDate()));
        }

        return converter.postListToPostViewList(allPost);
    }

    @Transactional
    @Override
    public PostView update(PostForm postForm) {
        Post post = postRepository.findById(postForm.getPostId()).orElse(null);
        if(post == null){
            return null;
        }

        post.setDescription(postForm.getDescription());
        post.setPostImgURL(postForm.getPostImgURL());
        postRepository.save(post);

        return converter.postToPostView(post);
    }

    @Transactional
    @Override
    public PostView updateLikes(Long postId, String localUserId) {
        Post post = postRepository.findById(postId).orElse(null);
        if(post == null){
            return null;
        }

        if(post.getLikeArray().contains(localUserId)){
            post.getLikeArray().remove(localUserId);
        }
        else{
            post.getLikeArray().add(localUserId);
        }
        postRepository.save(post);

        return converter.postToPostView(post);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        if(postRepository.existsById(id)){
            postRepository.deleteById(id);
        }
    }

    @Transactional
    @Override
    public void deleteAllByUserId(String userId) {
        ArrayList<Post> allPost = postRepository.findAllByAppUserUserId(userId);

        if(allPost.size() > 0){
            postRepository.deleteAll(allPost);
        }
    }

}
