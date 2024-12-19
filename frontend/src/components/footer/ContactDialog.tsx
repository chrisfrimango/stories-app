import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { FooterDialogProps } from "../../types/footerTypes";
import { StyledDialogContent } from "./styles";
import { contactSchema, ContactFormData } from "../../validation/schema";
import { useAlert } from "../../context/alert";

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "business", label: "Business Inquiry" },
  { value: "feedback", label: "Feedback" },
];

export const ContactDialog: React.FC<FooterDialogProps> = ({
  open,
  onClose,
}) => {
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implement API call to send contact form
      console.log("Form submitted:", data);
      showAlert("Message sent successfully!", "success");
      reset();
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      showAlert("Failed to send message. Please try again.", "error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
    >
      <DialogTitle>Contact Us</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Have questions or feedback? We'd love to hear from you.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Inquiry Type"
                {...register("inquiryType")}
                error={!!errors.inquiryType}
                helperText={errors.inquiryType?.message}
              >
                {inquiryTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Other Ways to Reach Us
              </Typography>
              <Typography>Email: support@storiesapp.com</Typography>
              <Typography>
                Address: Stories App Inc., 123 Story Street, San Francisco, CA
                94105
              </Typography>
            </Grid>
          </Grid>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Send Message
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
