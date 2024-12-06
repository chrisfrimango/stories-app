import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { usePosts } from "../../hooks/usePost";
import { Loading } from "../../ui/Loading";
import { Error } from "../../ui/Error";

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 20px;
`;

const PostList: React.FC = () => {
  const { data: posts, error, isLoading } = usePosts();

  if (isLoading) return <Loading message="Loading posts..." />;
  if (error) return <Error message="Failed to load posts" />;

  return (
    <PostGrid>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </PostGrid>
  );
};

export default PostList;
