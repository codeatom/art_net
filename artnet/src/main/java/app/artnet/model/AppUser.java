package app.artnet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "APPUSER")
public class AppUser {

    @Id
    @Setter(AccessLevel.NONE)
    private String userId;

    private String userName;

    private String firstName;

    private String lastName;

    private String userEmail;

    private String userImage;

    private boolean active;

    private LocalDateTime joinDate;

    public AppUser() {
    }

    public AppUser(String userId, String userName, String firstName, String lastName, String userEmail, String userImage) {
        this.userId = userId;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
        this.userImage = userImage;
    }
}
