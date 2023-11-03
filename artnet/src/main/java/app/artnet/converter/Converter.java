package app.artnet.converter;

import app.artnet.dto.views.CommentView;
import app.artnet.dto.views.PostView;
import app.artnet.dto.views.AppUserView;
import app.artnet.model.AppUser;
import app.artnet.model.Comment;
import app.artnet.model.Post;

import java.util.List;

public interface Converter {
    AppUserView appUserToAppUserView(AppUser appUser);
    List<AppUserView> appUserListToAppUserViewList(List<AppUser> appUserList);
    PostView postToPostView(Post post);
    List<PostView> postListToPostViewList(List<Post> postList);
    CommentView commentToCommentView(Comment comment);
    List<CommentView> commentListToCommentViewList(List<Comment> commentList);
}
