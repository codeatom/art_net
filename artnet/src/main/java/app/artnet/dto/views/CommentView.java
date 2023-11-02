package app.artnet.dto.views;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentView {
    private Long commentId;
    private Long postId;
    private AppUserView user;
    private String commentText;
    private String commentDate;
}
