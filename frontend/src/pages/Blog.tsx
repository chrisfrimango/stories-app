import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostList from "../components/post/PostList";
import PostFilter from "../components/post/PostFilter";
import { useAuth } from "../context/auth";
import { FilterType } from "../types/postTypes";

const Blog: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [filter, setFilter] = useState<FilterType>("all");

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

        {isAuthenticated && <PostFilter value={filter} onChange={setFilter} />}
      </Box>
      <PostList filter={filter} />
    </Container>
  );
};

export default Blog;
