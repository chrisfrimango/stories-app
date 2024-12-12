import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { usePosts } from "../../hooks/usePost";
import PostCard from "./PostCard";
import { Loading } from "../../ui/Loading";
import { Error } from "../../ui/Error";

const PostList: React.FC = () => {
  const { data: posts, error, isLoading } = usePosts();

  if (isLoading) return <Loading message="Loading posts..." />;
  if (error) return <Error message="Failed to load posts" />;

  return (
    <Box sx={{ flexGrow: 1, margin: "0 auto", maxWidth: 1200 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {posts?.map((post, index) => {
          const isFeatured = index === 0;
          const isSecondary = index === 1 || index === 2;

          return (
            <Grid
              item
              key={post.id}
              xs={12}
              sm={isSecondary ? 6 : isFeatured ? 12 : 6}
              md={isSecondary ? 4 : isFeatured ? 8 : 4}
            >
              <PostCard
                post={post}
                isFeatured={isFeatured}
                heightOverride={isFeatured ? 400 : isSecondary ? 300 : 250}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PostList;
