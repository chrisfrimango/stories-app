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
} from "@mui/material";
import { usePost, useDeletePost } from "../hooks/usePost";
import { Loading } from "../ui/Loading";
import { Error } from "../ui/Error";
import { useAuth } from "../context/authContext";
import { useModal } from "../context/modalContext";

const PostDetail: React.FC = () => {
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
        py: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/blog")}
        >
          Back to Blog
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Box component="header" sx={{ mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {post.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "text.secondary",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1">By {post.username}</Typography>
            <Typography variant="subtitle1">
              {new Date(post.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">{post.category_name}</Typography>
          </Box>
          <Divider />
        </Box>

        <Box component="article">
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              "& p": { mb: 3 },
            }}
          >
            {post.content}
          </Typography>
        </Box>
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
                disabled={isDeleting}
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
