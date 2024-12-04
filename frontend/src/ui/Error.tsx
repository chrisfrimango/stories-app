import React from "react";
import styled from "styled-components";
import { ErrorProps } from "../types/uiTypes";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

export const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong",
}) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );
};
