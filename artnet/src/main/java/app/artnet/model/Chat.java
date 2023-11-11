package app.artnet.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class Chat {
    private String userName;
    private String userImage;
    private String commentDate;
    private String commentText;
}