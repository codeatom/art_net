package app.artnet.dto.forms;

import app.artnet.model.AppUser;
import app.artnet.model.Comment;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Component
public class PostForm {

    private Long postId;

    private String description;

    private String postImgURL;

    private String userId;

    private LocalDateTime postDate;

    private List<String> likeArray = new ArrayList<>();

    private AppUser appUser;

    private final List<Comment> comments = new ArrayList<>();


    public PostForm() {
    }

    public PostForm(Long postId, String description, String postImgURL, String userId) {
        this.postId = postId;
        this.description = description;
        this.postImgURL = postImgURL;
        this.userId = userId;
    }
}
