package app.artnet.dto.forms;

import app.artnet.model.AppUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;


@Getter
@Setter
@Component
public class CommentForm {

    private Long commentId;

    private Long postId;

    private String userId;

    private AppUser appUser;

    private String commentText;

    private LocalDateTime commentDate;


    public CommentForm() {
    }

    public CommentForm(Long postId, String userId, String commentText) {
        this.postId = postId;
        this.userId = userId;
        this.commentText = commentText;
    }
}
