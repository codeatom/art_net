package app.artnet.dto.forms;

import lombok.*;
import org.springframework.stereotype.Component;


@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Component
public class AppUserForm {

    private String userId;

    private String userName;

    private String firstName;

    private String lastName;

    @NonNull
    private String userEmail;

    private String userImage;

    private boolean active;

    private String joinDate;
}
