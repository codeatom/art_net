package app.artnet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode(exclude = {"appUser", "comments"})
@ToString(exclude = {"appUser", "comments"})
@Entity
@Table(name = "POST")
public class Post {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long postId;

    private String description;

    private String postImgURL;

    private LocalDateTime postDate;

    @Setter(AccessLevel.NONE)
    private final List<String> likeArray = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private final List<Comment> comments = Collections.synchronizedList(new ArrayList<>());

    public Post() {
    }

    public Post(String description, String postImgURL, AppUser appUser) {
        this.description = description;
        this.postImgURL = postImgURL;
        this.appUser = appUser;
    }

    public void addComment(Comment comment) {
        if (comment == null) throw new IllegalArgumentException("commentText is null");
        comments.add(comment);
        comment.setPost(this);
    }

    public void removeComment(Comment comment) {
        if (comment == null) throw new IllegalArgumentException("commentText is null");
        comments.remove(comment);
        comment.setPost(null);
    }

}
