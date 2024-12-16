import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostList from "../components/post/PostList";
import { useAuth } from "../context/authContext";

const Blog: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
      <Box sx={{ pb: 5 }}>
        <Typography
          variant="h5"
          align="left"
          color="text.secondary"
          data-testid="welcome-message"
        >
          {isAuthenticated ? (
            <>
              Welcome{" "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {user?.username}
              </Box>
              ! Stay updated with our latest stories
            </>
          ) : (
            "Stay in the loop with the latest stories"
          )}
        </Typography>
      </Box>
      <PostList />
    </Container>
  );
};

export default Blog;
