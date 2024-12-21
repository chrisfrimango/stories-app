import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { usePosts } from "../../hooks/usePost";
import PostCard from "./PostCard";
import { Error } from "../../ui/Error";
import PostSkeleton from "../../ui/PostSkeleton";
import { useAuth } from "../../context/auth";
import { PostListProps } from "../../types/postTypes";

const PostList: React.FC<PostListProps> = ({ filter = "all" }) => {
  const { data: posts, error, isLoading } = usePosts();
  const { user } = useAuth();

  const skeletonCount = posts?.length || 6;

  if (isLoading) return <PostSkeleton count={skeletonCount} />;
  if (error) return <Error message="Failed to load posts" />;
  if (!posts || posts.length === 0) return <Error message="No posts found" />;

  const filteredPosts = posts.filter((post) => {
    switch (filter) {
      case "my-posts":
        return post.user_id === Number(user?.id);
      case "other-posts":
        return post.user_id !== Number(user?.id);
      default:
        return true;
    }
  });

  if (filteredPosts.length === 0) {
    return (
      <Error
        message={`No ${
          filter === "my-posts" ? "personal" : "other users'"
        } posts found`}
      />
    );
  }

  return (
    <Box sx={{ flexGrow: 1, margin: "0 auto", maxWidth: 1200 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filteredPosts.map((post, index) => {
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
