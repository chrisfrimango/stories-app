import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";
import { NavBarProps, ButtonProps } from "../../types/layoutTypes";

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link).attrs({ as: Link })`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;


const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.secondary;
      case "danger":
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const NavBar: React.FC<NavBarProps> = ({ onCreatePost }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Nav>
      {isAuthenticated && user ? (
        <>
          <NavLink to={`/${user.username}/blog`}>Stories</NavLink>
          <NavLink to={`/${user.username}/profile`}>Profile</NavLink>
          <Button onClick={onCreatePost}>Create Post</Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <NavLink to="/blog">Stories</NavLink>
          <NavLink to="/login">Login</NavLink>
          <Button onClick={() => navigate("/register")}>Sign Up</Button>
        </>
      )}
    </Nav>
  );
};

export default NavBar;
