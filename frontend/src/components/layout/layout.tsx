import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import NavBar from "../nav/NavBar";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Main = styled.main`
  flex: 1;
  margin-top: 100px; // Justera detta värde baserat på din headers höjd
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 100px); // Justera detta värde också
  overflow-y: auto;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;
const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header>
          <NavBar onCreatePost={() => openCreatePostModal()} />
        </Header>
      </HeaderWrapper>
      <Main>
        <Outlet />
      </Main>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );
};

export default Layout;