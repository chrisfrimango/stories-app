import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const HomeContainer = styled.main`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const CTAButton = styled(Link)`
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title>Blog about everything</Title>
        <Subtitle>
          A blog about everything. Simple, powerful, and built for you.
        </Subtitle>
        <CTAButton to="/blog">Get Started, go to blog</CTAButton>
      </Hero>
    </HomeContainer>
  );
};

export default Home;
