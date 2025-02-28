import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
const HeroSection = () => {
  return (
        <Container
            maxWidth={false} 
            disableGutters
            sx={{
                height: "85vh", 
                backgroundImage: "url('./images/home-herosec-img.jpg')", 
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
            }}
        >
        
            <Box
                sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)", 
                }}
            />
            <motion.div initial={{y: 30, opacity: 0.5}} animate={{ y: 0, opacity: 1, transition:{duration: 0.8}}}>
                <Box sx={{ position: "relative", zIndex: 1, maxWidth: "600px", px: 3 }}>
                    <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
                        Welcome to Culinar.io
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Discover and share the best recipes from around the world.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: "#E1A840", color: "black",
                            "&:hover": { bgcolor: "black", color: "#E1A840" },
                        }}
                        component={Link}
                        to="/create-recipe"
                    >
                        Get Started
                    </Button>
                </Box>
            </motion.div>
        </Container>
    
  );
};

export default HeroSection;
