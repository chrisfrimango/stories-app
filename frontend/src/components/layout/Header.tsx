import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderProps } from "../../types/layoutTypes";
const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">
          {/* <img src={logo} alt="logo" /> */}
          <span>Stories</span>
        </Link>
      </Logo>
      {children}
    </HeaderContainer>
  );
};

export default Header;
