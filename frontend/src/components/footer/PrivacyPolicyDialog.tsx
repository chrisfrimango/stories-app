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

export const PrivacyPolicyDialog: React.FC<FooterDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      disableScrollLock
    >
      <DialogTitle>Privacy Policy</DialogTitle>
      <StyledDialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Last updated: March 2024
        </Typography>
        <Typography>
          We respect your privacy and are committed to protecting your personal
          data. This privacy policy will inform you about how we handle your
          personal information when you visit our website and tell you about
          your privacy rights.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        <Typography>
          We collect information that you provide directly to us, including: -
          Account information (name, email, password) - Profile information -
          Content you post - Communications with us
        </Typography>
        {/* Add more privacy policy content as needed */}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
