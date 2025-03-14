import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
const EditRecipeCard = ({title, image, id}) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ width: 400, borderRadius: 3, boxShadow: 5, overflow: "hidden" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={image} // Replace with actual image path
          alt="Perfect Fried Egg"
          sx={{borderRadius: '20px'}}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.7)", // Black with 50% opacity
          }}
        />
          <CardContent
            sx={{
              position: "absolute",
              width:'20rem',
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 1, // Ensure it's above the overlay
            }}
          >
           <Typography 
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 600,
              mt: "1.2rem",
              textAlign: "center",
              minHeight: "70px", // Keeps consistent spacing
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "normal", 
              wordBreak: "break-word",
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" }, // ✅ Adjusts based on screen size
            }}
          >
            {title}
          </Typography>



          </CardContent>
      </Box>

      {/* Edit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: '1rem' }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            width: '95%',
            bgcolor: "black",
            color: "white",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: '50px',
            py: 1.5,
            "&:hover": { bgcolor: "#243A4A" },
          }}
          onClick={() => navigate(`/edit/recipe/${id}`)}
        >
          Edit Recipe
        </Button>
      </Box>
    </Card>
  );
};

export default EditRecipeCard;
