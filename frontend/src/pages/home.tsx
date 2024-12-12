import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import AdaptiveIcon from "@mui/icons-material/AutoFixHigh";
import DurableIcon from "@mui/icons-material/Security";
import UXIcon from "@mui/icons-material/ThumbUp";
import InnovativeIcon from "@mui/icons-material/Lightbulb";
import ReliableIcon from "@mui/icons-material/Support";
import PrecisionIcon from "@mui/icons-material/PrecisionManufacturing";

const features = [
  {
    title: "Adaptable performance",
    description: "Our platform effortlessly adjusts to your needs, boosting efficiency and simplifying your writing tasks.",
    icon: <AdaptiveIcon fontSize="large" />
  },
  {
    title: "Built to last",
    description: "Experience unmatched reliability that goes above and beyond with lasting value.",
    icon: <DurableIcon fontSize="large" />
  },
  {
    title: "Great user experience",
    description: "Integrate our platform into your routine with an intuitive and easy-to-use interface.",
    icon: <UXIcon fontSize="large" />
  },
  {
    title: "Innovative functionality",
    description: "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
    icon: <InnovativeIcon fontSize="large" />
  },
  {
    title: "Reliable support",
    description: "Count on our responsive community support, offering assistance that goes beyond expectations.",
    icon: <ReliableIcon fontSize="large" />
  },
  {
    title: "Precision in every detail",
    description: "Enjoy a meticulously crafted platform where small touches make a significant impact on your writing experience.",
    icon: <PrecisionIcon fontSize="large" />
  }
];

const Home: React.FC = () => {
  // const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 15,
          pb: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
          >
            Stories about everything
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Simple, powerful, and built for you. Share your stories with the world.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              component={Link}
              to="/blog"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none'
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          color="text.primary"
          align="center"
          gutterBottom
          fontWeight="medium"
        >
          Highlights
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  "&:hover": {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
                elevation={2}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3" fontWeight="medium">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
