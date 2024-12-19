import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../../context/auth";
import { NavBarProps } from "../../types/layoutTypes";
import CreatePostButton from "../common/CreatePostButton";

const NavBar: React.FC<NavBarProps> = ({ onCreatePost }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };


  const buttonSx = {
    textTransform: "none",
    fontWeight: 400,
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
      opacity: 0.7,
      transition: "opacity 0.2s",
    },
  };

  const renderNavItems = () => {
    if (isAuthenticated && user) {
      return (
        <>
          {isMobile ? (
            <>
              <MenuItem
                onClick={() => handleNavigation(`/${user.username}/blog`)}
              >
                Stories
              </MenuItem>
              <MenuItem
                onClick={() => handleNavigation(`/${user.username}/profile`)}
              >
                Profile
              </MenuItem>
              <CreatePostButton onClick={onCreatePost} variant="menuItem" />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => handleNavigation(`/${user.username}/blog`)}
                sx={buttonSx}
              >
                Stories
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation(`/${user.username}/profile`)}
                sx={buttonSx}
              >
                Profile
              </Button>
              <CreatePostButton onClick={onCreatePost} />
              <Button
                onClick={handleLogout}
                sx={{
                  ...buttonSx,
                  color: "#333",
                  "&:hover": {
                    color: "#555",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </>
      );
    }

    return (
      <>
        {isMobile ? (
          <>
            <MenuItem onClick={() => handleNavigation("/blog")}>
              Stories
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/login")}>
              Login
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/register")}>
              Sign Up
            </MenuItem>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/blog")}
              sx={buttonSx}
            >
              Stories
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/login")}
              sx={buttonSx}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => handleNavigation("/register")}
              sx={{
                ...buttonSx,
                backgroundColor: "#333",
                "&:hover": {
                  backgroundColor: "#555",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </>
    );
  };

  return renderNavItems();
};

export default NavBar;
