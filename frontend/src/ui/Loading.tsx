import React from "react";
import styled from "styled-components";
import { LoadingProps } from "../types/uiTypes";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Spinner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.background};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-right: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <span>{message}</span>
    </LoadingContainer>
  );
};
