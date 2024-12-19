import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  CardActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { usePost, useDeletePost } from "../hooks/usePost";
import { Loading } from "../ui/Loading";
import { Error } from "../ui/Error";
import { useAuth } from "../context/auth";
import { useModal } from "../context/modal";

const PostDetail: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: post, error, isLoading } = usePost(id!);
  const { openEditPostModal } = useModal();
  const { handleDelete, isDeleting } = useDeletePost({
    postId: id!,
    redirectTo: "/blog",
  });

  if (isLoading) return <Loading message="Loading post..." />;
  if (error) return <Error message="Failed to load post" />;
  if (!post) return <Error message="Post not found" />;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
      }}
      data-testid="post-detail-card"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Button
          variant="contained"
          size={isMobile ? "medium" : "small"}
          onClick={() => navigate("/blog")}
          fullWidth={isMobile}
        >
          Back to Blog
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          flex: 1,
        }}
      >
        <Box component="header" sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
            component="h1"
            gutterBottom
            data-testid="post-title"
            sx={{
              fontSize: {
                xs: "1.75rem",
                sm: "2.25rem",
                md: "3rem",
              },
              wordBreak: "break-word",
            }}
          >
            {post.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              color: "text.secondary",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" data-testid="post-author">
              By {post.username}
            </Typography>
            <Typography variant="subtitle1">
              {new Date(post.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" data-testid="post-category">
              {post.category_name}
            </Typography>
          </Box>
          <Divider />
        </Box>

        <Box component="article">
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              lineHeight: 1.7,
              "& p": { mb: 3 },
              wordBreak: "break-word",
            }}
            data-testid="post-content"
          >
            {post.content}
          </Typography>
        </Box>
        <CardActions
          sx={{
            justifyContent: { xs: "center", sm: "flex-end" },
            mt: { xs: 2, sm: 3 },
            gap: 1,
          }}
        >
          {isAuthenticated && user?.username === post.username && (
            <>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "small"}
                onClick={() => openEditPostModal(post)}
                data-testid="edit-button"
                fullWidth={isMobile}
              >
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                size={isMobile ? "medium" : "small"}
                onClick={handleDelete}
                disabled={isDeleting}
                data-testid="delete-button"
                fullWidth={isMobile}
              >
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Paper>
    </Container>
  );
};

export default PostDetail;
