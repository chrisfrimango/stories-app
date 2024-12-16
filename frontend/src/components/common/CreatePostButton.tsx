import React from "react";
import { Button, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CreatePostButtonProps {
  onClick: () => void;
  variant?: "button" | "menuItem";
  sx?: object;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({
  onClick,
  variant = "button",
  sx = {},
}) => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const buttonStyles = {
    textTransform: "none",
    fontWeight: 400,
    fontSize: "1rem",
    backgroundColor: "#333",
    "&:hover": {
      backgroundColor: "#555",
    },
    ...sx,
  };

  if (variant === "menuItem") {
    return (
      <MenuItem onClick={onClick}>
        <AddIcon sx={{ mr: 1 }} />
        Create Post
      </MenuItem>
    );
  }

  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<AddIcon />}
      sx={buttonStyles}
      data-testid="create-post-button"
    >
      Create Post
    </Button>
  );
};

export default CreatePostButton;
