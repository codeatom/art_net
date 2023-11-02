package app.artnet.dto.views;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostView {
    private Long postId;
    private String description;
    private String postImgURL;
    private String postDate;
    private List<String> likeArray;
    private AppUserView user;
    private List<CommentView> comments;
}
