package app.artnet.converter;

import app.artnet.dto.views.CommentView;
import app.artnet.dto.views.PostView;
import app.artnet.dto.views.AppUserView;
import app.artnet.model.AppUser;
import app.artnet.model.Comment;
import app.artnet.model.Post;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataConverter implements Converter{
    @Override
    public AppUserView appUserToAppUserView(AppUser appUser) {
        String joinDate = formatDate(appUser.getJoinDate(), "yyyy-MM-dd HH:mm");

        return new AppUserView(
                appUser.getUserId(),
                appUser.getUserName(),
                appUser.getFirstName(),
                appUser.getLastName(),
                appUser.getUserEmail(),
                appUser.getUserImage(),
                appUser.isActive(),
                joinDate);
    }

    @Override
    public List<AppUserView> appUserListToAppUserViewList(List<AppUser> appUserList) {
        List<AppUserView> appUserViewList = new ArrayList<>();
        for(AppUser appUser : appUserList){
            appUserViewList.add(appUserToAppUserView(appUser));
        }

        return appUserViewList;
    }

    @Override
    public CommentView commentToCommentView(Comment comment) {
        String commentDate = formatDate(comment.getCommentDate(), "yyyy/MM/dd HH:mm");
        AppUserView appUserView = appUserToAppUserView(comment.getAppUser());

        return new CommentView(
                comment.getCommentId(),
                comment.getPost().getPostId(),
                appUserView,
                comment.getCommentText(),
                commentDate);
    }

    @Override
    public List<CommentView> commentListToCommentViewList(List<Comment> commentList) {
        List<CommentView> commentViewList = new ArrayList<>();
        for(Comment comment : commentList){
            commentViewList.add(commentToCommentView(comment));
        }

        return commentViewList;
    }

    @Override
    public PostView postToPostView(Post post) {
        String postDate = formatDate(post.getPostDate(), "yyyy/MM/dd HH:mm");

        AppUserView appUserView = appUserToAppUserView(post.getAppUser());
        List<CommentView> commentViewList = new ArrayList<>();

        for(Comment comment : post.getComments()){
            commentViewList.add(commentToCommentView(comment));
        }

        return new PostView(
                post.getPostId(),
                post.getDescription(),
                post.getPostImgURL(),
                postDate,
                post.getLikeArray(),
                appUserView,
                commentViewList);
    }

    @Override
    public List<PostView> postListToPostViewList(List<Post> postList) {
        List<PostView> postViewList = new ArrayList<>();
        for(Post post : postList){
            postViewList.add(postToPostView(post));
        }

        return postViewList;
    }

    private String formatDate(LocalDateTime localDateTime, String pattern){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return localDateTime.format(formatter);
    }
}
