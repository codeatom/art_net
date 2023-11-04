package app.artnet.controller;

import app.artnet.data.service.PostService;
import app.artnet.dto.forms.PostForm;
import app.artnet.dto.views.PostView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/post")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    public ResponseEntity<ArrayList<PostView>> getPostList(){
        ArrayList<PostView> allPostList = (ArrayList<PostView>) postService.findAll();
        if(allPostList != null){
            allPostList.sort((e1, e2) -> e2.getPostDate().compareTo(e1.getPostDate()));
        }

        return ResponseEntity.ok(allPostList);
    }

    @GetMapping("/get-all")
    public ResponseEntity<ArrayList<PostView>> getAllPost(){
        return getPostList();
    }

    @PostMapping("/save")
    public ResponseEntity<ArrayList<PostView>> savePost(@RequestBody PostForm postForm){
        PostView postView = postService.save(postForm);
        return getPostList();
    }

    @GetMapping("/get-by-postId/{postId}")
    public ResponseEntity<PostView> getPostByPostId(@PathVariable Long postId){
        PostView postView = postService.findByPostId(postId);
        return ResponseEntity.ok(postView);
    }

    @GetMapping("/get-all-by-user-id/{userId}")
    public ResponseEntity<ArrayList<PostView>> getAllByUserId(@PathVariable("userId") String userId){
        ArrayList<PostView> result = (ArrayList<PostView>) postService.findAllByUserId(userId);

        if(result != null){
            result.sort((e1, e2) -> e2.getPostDate().compareTo(e1.getPostDate()));
        }

        return ResponseEntity.ok(result);
    }

    @PutMapping("/update")
    public ResponseEntity<PostView> updatePost(@RequestBody PostForm postForm){
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.update(postForm));
    }

    @PutMapping("/likes/{postId}/{localUserId}")
    public ResponseEntity<PostView> updatePostLikes(@PathVariable("postId") Long postId, @PathVariable("localUserId") String localUserId){
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.updateLikes(postId, localUserId));
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<ArrayList<PostView>> deletePost(@PathVariable("postId") Long postID){
        postService.deleteById(postID);
        return getPostList();
    }

    @DeleteMapping("/delete-all-by-id/{userId}")
    public ResponseEntity<Boolean> deleteAllByUserId(@PathVariable("userId") String userId){
        postService.deleteAllByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}
