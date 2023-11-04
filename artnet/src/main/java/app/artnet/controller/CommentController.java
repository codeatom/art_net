package app.artnet.controller;

import app.artnet.data.service.CommentService;
import app.artnet.dto.forms.CommentForm;
import app.artnet.dto.views.CommentView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }


    @PostMapping("/save")
    public ResponseEntity<CommentView> saveComment(@RequestBody CommentForm commentForm){
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.save(commentForm));
    }

    @GetMapping("/get-by-id/{commentId}")
    public ResponseEntity<CommentView> getCommentById(@PathVariable("commentId") Long commentId){
        return ResponseEntity.ok(commentService.findById(commentId));
    }

    @GetMapping("/get-all-by-user-id/{userId}")
    public ResponseEntity<ArrayList<CommentView>> getCommentsByUserId(@PathVariable("userId") String userId){
        ArrayList<CommentView> result = commentService.findAllByUserId(userId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/get-all-by-post-id/{postId}")
    public ResponseEntity<ArrayList<CommentView>> getCommentsByPostId(@PathVariable("postID") Long postId){
        ArrayList<CommentView> result = commentService.findAllByPostId(postId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable("commentId") Long commentId){
        commentService.deleteById(commentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-all-by-id/{userId}")
    public ResponseEntity<Boolean> deleteAllByUserId(@PathVariable("userId") String userId){
        commentService.deleteAllByUserId(userId);
        return ResponseEntity.noContent().build();
    }

 }
