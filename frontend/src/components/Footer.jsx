import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: "#243A4A", color: "#fff", py: 4, }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Culinar.io
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Share, Discover, Enjoy
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <Link href="#" underline="none" color="inherit">Home</Link>
              <Link href="#" underline="none" color="inherit">Recipes</Link>
              <Link href="#" underline="none" color="inherit">About</Link>
              <Link href="#" underline="none" color="inherit">Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
              <Link href="#" underline="none" color="inherit">Facebook</Link>
              <Link href="#" underline="none" color="inherit">Instagram</Link>
              <Link href="#" underline="none" color="inherit">Twitter</Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Culinar.io. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
