import styled from "styled-components";
import { DialogContent } from "@mui/material";

export const StyledDialogContent = styled(DialogContent)`
  min-width: 300px;
  max-width: 600px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;
