import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CardActionArea, Link } from "@mui/material";
import { useAuth } from "../../context/auth";
import { PostCardProps } from "../../types/postsTypes";
import { theme } from "../../styles/theme";
import { useDeletePost } from "../../hooks/usePost";
import { useModal } from "../../context/modal";

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
  marginTop: theme.spacing(2),
}));

const ActionLinks = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const PostCard: React.FC<PostCardProps> = ({
  post,
  isFeatured,
  heightOverride,
}) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { openEditPostModal } = useModal();
  const { handleDelete, isDeleting } = useDeletePost({
    postId: post.id.toString(),
  });

  const handleClick = () => {
    if (isAuthenticated && user?.username) {
      if (user.username === post.username) {
        navigate(`/${user.username}/post/${post.id}`);
      } else {
        navigate(`/${post.username}/post/${post.id}`);
      }
    } else {
      navigate(`/${post.username}/post/${post.id}`);
    }
  };

  return (
    <StyledCard data-testid="post-card">
      <StyledCardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height={heightOverride || 200}
          image={post.image_url || "https://placehold.co/400"}
          alt={post.title}
          sx={{
            height: heightOverride || 200,
            objectFit: "cover",
          }}
          data-testid="post-image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant={isFeatured ? "h4" : "h5"}
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: isFeatured ? "2rem" : "1.5rem",
            }}
            data-testid="post-title"
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
            data-testid="post-content"
          >
            {post.content.length > 150
              ? `${post.content.substring(0, 150)}...`
              : post.content}
          </Typography>
          <MetaContainer>
            <Typography variant="body2" data-testid="post-author">
              By {post.username}
            </Typography>
            <Typography variant="body2" data-testid="post-date">
              {new Date(post.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" data-testid="post-category">
              {post.category_name}
            </Typography>
          </MetaContainer>
          {isAuthenticated && Number(user?.id) === post.user_id && (
            <ActionLinks data-testid="post-action-links">
              <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditPostModal(post);
                }}
                sx={{
                  textDecoration: "none",
                  paddingBottom: "2px",
                  "&:hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
                data-testid="edit-button"
              >
                Edit
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                sx={{
                  textDecoration: "none",
                  color: "error.main",
                  paddingBottom: "2px",
                  "&:hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                  "&.Mui-disabled": {
                    color: "text.disabled",
                  },
                }}
                data-testid="post-delete-link"
              >
                Delete
              </Link>
            </ActionLinks>
          )}
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default PostCard;
