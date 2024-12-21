import React from "react";
import { Box, Paper, Skeleton, Divider } from "@mui/material";

const ProfileSkeleton: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Skeleton variant="text" width="120px" height={32} sx={{ mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />

          <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />

          <Skeleton variant="text" width="50%" height={24} sx={{ mb: 2 }} />
          <Skeleton
            variant="rectangular"
            width={120}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Skeleton variant="text" width="120px" height={32} sx={{ mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Skeleton
            variant="rectangular"
            width={160}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileSkeleton;
