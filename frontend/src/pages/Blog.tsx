import React from "react";
import styled from "styled-components";
import PostList from "../components/post/PostList";
import { useAuth } from "../context/authContext";

const BlogContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Blog: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <BlogContainer>
      <Heading>
        {isAuthenticated ? `welcome ${user?.username}` : "Enjoy reading!"}
      </Heading>
      <PostList />
    </BlogContainer>
  );
};

export default Blog;
