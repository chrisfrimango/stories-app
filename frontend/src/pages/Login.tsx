import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../validation/schema";
import { authService } from "../services/authService";
import { useAuth } from "../context/auth";

const LoginContainer = styled.div`
  /* min-height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.75rem;
`;

const Login: React.FC = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await authService.login(data);

      if (
        !response?.token ||
        !response?.user ||
        !response?.user?.id ||
        !response?.user?.email ||
        !response?.user?.username
      ) {
        setError("root", {
          type: "validation",
          message: "Authentication failed - no token received",
        });
        return;
      }
      login(response.token, {
        id: response.user?.id,
        email: response.user?.email,
        username: response.user?.username,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";

      setError("root", {
        type: "submit",
        message: errorMessage,
      });

      console.error("Login error:", {
        timestamp: new Date().toISOString(),
        email: data.email,
        error: errorMessage,
      });
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              {...register("email")}
              type="email"
              data-testid="email-input"
            />
            {errors.email && (
              <ErrorMessage data-testid="email-error">
                {errors.email.message}
              </ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              {...register("password")}
              type="password"
              data-testid="password-input"
            />
            {errors.password && (
              <ErrorMessage data-testid="password-error">
                {errors.password.message}
              </ErrorMessage>
            )}
          </FormGroup>
          {errors.root && (
            <ErrorMessage data-testid="root-error">
              {errors.root.message}
            </ErrorMessage>
          )}
          <SubmitButton type="submit" data-testid="login-button">
            Sign In
          </SubmitButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
