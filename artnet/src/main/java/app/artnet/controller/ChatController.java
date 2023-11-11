package app.artnet.controller;

import app.artnet.model.Chat;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {
    @MessageMapping("/chat/{postId}")
    @SendTo("/comment/{postId}")
    public Chat makeComment(@DestinationVariable String postId, @Payload Chat chat) throws Exception{
        return chat;
    }

}