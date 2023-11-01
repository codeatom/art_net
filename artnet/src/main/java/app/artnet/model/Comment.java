package app.artnet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode(exclude = {"appUser"})
@ToString(exclude = {"appUser"})
@Entity
@Table(name = "COMMENT")
public class Comment {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long commentId;

    private String commentText;

    private LocalDateTime commentDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "post_id")  //@JoinColumn(name = "post_id", nullable = true)
    private Post post;

    public Comment() {
    }

    public Comment(String commentText) {
        this.commentText = commentText;
    }

}
