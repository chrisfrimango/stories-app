import React from "react";
import styled from "styled-components";
import { ErrorProps } from "../types/uiTypes";

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong",
}) => {
  return (
    <ErrorContainer data-testid="error-message">
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );
};
