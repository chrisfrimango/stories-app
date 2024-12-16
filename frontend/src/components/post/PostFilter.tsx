import React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FilterType, PostFilterProps } from "../../types/postTypes";

const PostFilter: React.FC<PostFilterProps> = ({ value, onChange }) => {
  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: FilterType | null
  ) => {
    if (newFilter !== null) {
      onChange(newFilter);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleFilterChange}
        aria-label="post filter"
        size="small"
      >
        <ToggleButton
          value="all-posts"
          data-testid="filter-all-posts"
          aria-label="all posts"
        >
          All Posts
        </ToggleButton>
        <ToggleButton
          value="my-posts"
          data-testid="filter-my-posts"
          aria-label="my posts"
        >
          My Posts
        </ToggleButton>
        <ToggleButton
          value="other-posts"
          data-testid="filter-other-posts"
          aria-label="other posts"
        >
          Others' Posts
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default PostFilter;
