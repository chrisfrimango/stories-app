import React, { useState } from "react";
import styled from "styled-components";
import { PrivacyPolicyDialog } from "../footer/PrivacyPolicyDialog";
import { TermsDialog } from "../footer/TermsDialog";
import { ContactDialog } from "../footer/ContactDialog";

const FooterContainer = styled.footer`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<
    "privacy" | "terms" | "contact" | null
  >(null);

  const handleClose = () => {
    setOpenDialog(null);
  };

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <Copyright>© 2024 Stories App. All rights reserved.</Copyright>
          <Links>
            <FooterLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog("privacy");
              }}
            >
              Privacy Policy
            </FooterLink>
            <FooterLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog("terms");
              }}
            >
              Terms of Service
            </FooterLink>
            <FooterLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog("contact");
              }}
            >
              Contact Us
            </FooterLink>
          </Links>
        </FooterContent>
      </FooterContainer>

      <PrivacyPolicyDialog
        open={openDialog === "privacy"}
        onClose={handleClose}
      />
      <TermsDialog
        open={openDialog === "terms"}
        onClose={handleClose}
      />
      <ContactDialog
        open={openDialog === "contact"}
        onClose={handleClose}
      />
    </>
  );
};

export default Footer;
