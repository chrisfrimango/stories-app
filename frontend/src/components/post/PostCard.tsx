import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Button, CardActionArea } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { PostCardProps } from "../../types/postsTypes";
import { theme } from "../../styles/theme";
import { useDeletePost } from "../../hooks/usePost";
import { useAlert } from "../../context/alertContext";
import { useModal } from "../../context/modalContext";
const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  backgroundColor: theme.colors.cardBackground,
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    backgroundColor: theme.colors.hover,
  },
});

const StyledCardActionArea = styled(CardActionArea)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  textDecoration: "none",
});

const MetaContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginTop: "auto",
}));

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { showAlert } = useAlert();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const deletePost = useDeletePost(post.id.toString());
  const { openEditPostModal } = useModal();

  const handleClick = () => {
    if (isAuthenticated && user?.username) {
      // Om inloggad användare är författaren, använd deras username i URL
      if (user.username === post.username) {
        navigate(`/${user.username}/post/${post.id}`);
      } else {
        // Om inloggad användare inte är författaren, använd författarens username
        navigate(`/${post.username}/post/${post.id}`);
      }
    } else {
      // Om inte inloggad, använd författarens username
      navigate(`/${post.username}/post/${post.id}`);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(undefined, {
        onSuccess: () => {
          showAlert("Post deleted successfully", "success");
        },
        onError: () => {
          showAlert("Error deleting post", "error");
        },
      });
    }
  };

  return (
    <StyledCard>
      <StyledCardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {post.content.length > 150
              ? `${post.content.substring(0, 150)}...`
              : post.content}
          </Typography>
          <MetaContainer>
            <Typography variant="body2">By {post.username}</Typography>
            <Typography variant="body2">
              {new Date(post.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">{post.category_name}</Typography>
          </MetaContainer>
        </CardContent>
      </StyledCardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {isAuthenticated && user?.username === post.username && (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => openEditPostModal(post)}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </StyledCard>
  );
};

export default PostCard;
