import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { FooterDialogProps } from "../../types/footerTypes";
import { StyledDialogContent } from "./styles";

export const TermsDialog: React.FC<FooterDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      disableScrollLock
    >
      <DialogTitle>Terms of Service</DialogTitle>
      <StyledDialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Last updated: March 2024
        </Typography>
        <Typography>
          By accessing and using this website, you accept and agree to be bound
          by the terms and provision of this agreement.
        </Typography>
        <Typography variant="h6" gutterBottom>
          User Responsibilities
        </Typography>
        <Typography>
          - You must be at least 13 years old to use this service - You are
          responsible for maintaining the security of your account - You agree
          not to post harmful or inappropriate content - You retain ownership of
          your content
        </Typography>
        {/* Add more terms content as needed */}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
