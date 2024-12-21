import React from "react";
import { Grid, Box, Skeleton } from "@mui/material";

interface PostSkeletonProps {
  count?: number;
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ count = 6 }) => {
  return (
    <Box
      sx={{ flexGrow: 1, margin: "0 auto", maxWidth: 1200 }}
      data-testid="loading"
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {[...Array(count)].map((_, index) => {
          const isFeatured = index === 0;
          const isSecondary = index === 1 || index === 2;
          const height = isFeatured ? 400 : isSecondary ? 300 : 250;

          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={isSecondary ? 6 : isFeatured ? 12 : 6}
              md={isSecondary ? 4 : isFeatured ? 8 : 4}
            >
              <Box sx={{ width: "100%", marginBottom: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={height}
                  sx={{ borderRadius: 1 }}
                />
                <Box sx={{ pt: 2 }}>
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={40}
                    sx={{ mb: 1 }}
                  />

                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="60%" />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="20%" />
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PostSkeleton;
