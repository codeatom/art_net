package app.artnet.dto.views;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUserView {
    private String userId;
    private String userName;
    private String firstName;
    private String lastName;
    private String userEmail;
    private String userImage;
    private boolean active;
    private String joinDate;
}
